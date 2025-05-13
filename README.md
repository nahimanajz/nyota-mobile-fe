
# 📒 NotesSync — React Native Expo Application  

A simple, fast, and modern notes management app built with **React Native (Expo)**. NotesSync allows you to create, sync, and fetch your notes seamlessly — with real-time in-app notifications when your notes are synced successfully.

---

## ✨ Features  

- **📝 Create Notes:**  
  Instantly add new notes with a clean and simple interface.

- **📡 Sync Notes:**  
  Synchronize your notes with a backend service. You'll receive a real-time notification inside the app once a note is successfully synced.

- **📥 Fetch Notes:**  
  Retrieve all your saved notes from the server to your device, ensuring you have access to your content anytime.

- **🔔 In-App Notifications:**  
  Stay informed with quick, non-intrusive in-app notifications every time a note is synced, enhancing your experience without distractions.

---

## 📦 Installation Guide  

> Make sure you have **Node.js**, **Expo CLI**, and either **Android Studio** or **Xcode (for iOS)** installed.

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/nahimanajz/nyota-mobile-fe.git
cd nyota-mobile-fe
cp .env.example .env
#fill EXPO_PUBLIC_BACKEND_API=  like this
EXPO_PUBLIC_BACKEND_API="http://<FILL YOUR IP COMPUTER ADDRESS>:<PORT>/api/notes" #ex:http://192.168.0.1:5001/api/notes

```

### 2️⃣ Install Dependencies  

```bash
npm install
# or
yarn install
```

### 3️⃣ Start the Expo Development Server  

```bash
npx expo start
```

This will open the Expo DevTools in your browser.

### 4️⃣ Run the App on Your Device/Emulator  

- Press `i` for iOS simulator  
- Press `a` for Android emulator  
- Or scan the QR code with the **Expo Go** app on your physical device.

---

## 📌 Tech Stack  

- **React Native (Expo)**
- **React Navigation**
- **Expo Notifications**
- **Socketio**

---

