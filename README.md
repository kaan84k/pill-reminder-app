# 💊 Pill Reminder App

A simple and elegant web app to help users manage their medications. Users can add medications, get reminders, and track their intake history — all in one place.

## 🔧 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Frontend Library:** [React 18](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Date Utility:** [date-fns](https://date-fns.org/)
- **Storage:** `localStorage` (MVP) or can be hooked to a backend
- **Language:** JavaScript with TypeScript support
- **Deployment:** Docker

## 🔄 Feature Flow

### ➕ Add Medication
- Create a medication entry with:
  - **Name**
  - **Dosage**
  - **Frequency**
  - **Reminder Time**
- Data is stored in **localStorage** (for MVP)
- Can be extended to a database for persistent multi-device sync

### ⏰ Remind
- (Optional) Schedule **Web Push Notifications**
- Show **popup reminders** when the app is open
- (Future) Support for **Email/SMS reminders** via backend integration

### ✅ Track Intake
- Log when a medication is taken
- View **medication history** at a glance

## 🚀 Getting Started

### Option 1: Local Development

#### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/pill-reminder-app.git
cd pill-reminder-app
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Run the App
```bash
npm run dev
```

### Option 2: Docker Setup

#### Prerequisites
Make sure you have Docker installed on your system. If not, follow the official installation guide: [Install Docker](https://docs.docker.com/get-docker/)

#### Build Docker Image
```bash
docker build -t pill-reminder-app .
```

#### Run Docker Container
```bash
docker run -p 3000:3000 pill-reminder-app
```

#### Access the App
Once the container is running, open your browser and go to:
```
http://localhost:3000
```

## 🗂 Project Structure
```
pill-reminder-app/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── AddMedicationModal.js
│   │   ├── MedicationCard.js
│   │   ├── MedicationHistory.js
│   │   └── MedicationList.js
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom hook for persisting state
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── Dockerfile
├── tailwind.config.js
└── README.md
```

## ✨ Future Improvements
- **🌐 Backend integration (Firebase/Supabase/Express)**
- **📱 Push notifications and PWA enhancements**
- **Authentication (optional user accounts)**
- **📊 Advanced analytics on medication patterns**

## 🧑‍💻 Contributing
Contributions are welcome! If you have ideas or bug fixes, feel free to open an issue or pull request.

## 📄 License
This project is licensed under the MIT License.
