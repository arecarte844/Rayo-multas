// Reference to the records in Firebase
const recordsRef = database.ref('records');

// DOM Elements
const dataForm = document.getElementById('dataForm');
const nameInput = document.getElementById('nameInput');
const descInput = document.getElementById('descInput');
const recordsList = document.getElementById('recordsList');

// Handle form submission
dataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const description = descInput.value.trim();

    if (!name || !description) {
        alert('Please fill in all fields');
        return;
    }

    // Add new record to Firebase
    const newRecord = {
        name: name,
        description: description,
        timestamp: new Date().toISOString()
    };

    recordsRef.push(newRecord)
        .then(() => {
            nameInput.value = '';
            descInput.value = '';
            nameInput.focus();
        })
        .catch(error => {
            console.error('Error adding record:', error);
            alert('Error adding record. Check console for details.');
        });
});

// Listen for changes in the database
recordsRef.on('value', (snapshot) => {
    recordsList.innerHTML = '';

    if (snapshot.exists()) {
        const records = snapshot.val();

        // Convert to array and sort by timestamp (newest first)
        const recordsArray = Object.entries(records)
            .map(([key, value]) => ({ id: key, ...value }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        recordsArray.forEach(record => {
            const recordElement = createRecordElement(record);
            recordsList.appendChild(recordElement);
        });
    } else {
        recordsList.innerHTML = '<div class="empty-message">No records yet. Add one to get started!</div>';
    }
});

// Create a record DOM element
function createRecordElement(record) {
    const div = document.createElement('div');
    div.className = 'record-item';

    const date = new Date(record.timestamp).toLocaleString();

    div.innerHTML = `
        <div class="record-content">
            <h3>${escapeHtml(record.name)}</h3>
            <p>${escapeHtml(record.description)}</p>
            <small>${date}</small>
        </div>
        <div class="record-actions">
            <button class="delete-btn" onclick="deleteRecord('${record.id}')">Delete</button>
        </div>
    `;

    return div;
}

// Delete a record from Firebase
function deleteRecord(recordId) {
    if (confirm('Are you sure you want to delete this record?')) {
        recordsRef.child(recordId).remove()
            .catch(error => {
                console.error('Error deleting record:', error);
                alert('Error deleting record. Check console for details.');
            });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
