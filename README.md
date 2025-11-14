# Rayo Multas

A web application built with HTML, CSS, and JavaScript that connects to Firebase Realtime Database for data management.

## Features

- ✨ Add new records with name and description
- 🗑️ Delete records
- 📊 Real-time data synchronization with Firebase
- 🎨 Modern, responsive UI
- 🔒 Secure data handling with proper escaping

## Prerequisites

- A Firebase project with Realtime Database enabled
- A modern web browser
- Internet connection

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project" or select an existing one
3. Enable Realtime Database:
   - Go to Build → Realtime Database
   - Click "Create Database"
   - Start in test mode (for development)

### 2. Get Your Firebase Credentials

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll to "Your apps" and click the web icon `</>`
3. Copy the entire `firebaseConfig` object

### 3. Configure the Application

1. Open `config.js` in your project
2. Replace the placeholder values with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       databaseURL: "YOUR_DATABASE_URL"
   };
   ```

### 4. Run the Application

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

1. **Add a Record**: Enter a name and description in the form and click "Add Record"
2. **View Records**: Records appear in real-time below the form
3. **Delete a Record**: Click the "Delete" button on any record

## Project Structure

```
rayo_multas/
├── index.html       # Main HTML file
├── styles.css       # Styling
├── config.js        # Firebase configuration
├── app.js           # Main application logic
└── README.md        # This file
```

## Security Note

⚠️ **Important**: The current setup uses Firebase in test mode. Before deploying to production:

1. Set up proper authentication (sign-in, user management)
2. Configure security rules in Firebase:
   ```json
   {
     "rules": {
       "records": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
   }
   ```
3. Move sensitive credentials to environment variables
4. Use Firebase Hosting or another secure hosting solution

## Troubleshooting

### Records not showing up?
- Check browser console for errors (F12 → Console)
- Verify Firebase credentials in `config.js`
- Ensure Firebase Realtime Database is enabled
- Check Firebase security rules allow read/write access

### Can't add records?
- Ensure database URL is correct in `config.js`
- Check Firebase security rules
- Look at console errors for more details

## License

MIT License - feel free to use and modify as needed.
