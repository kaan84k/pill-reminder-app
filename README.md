# 💊 Pill Reminder App

A simple and elegant web app to help users manage their medications. Users can add medications, get reminders, and track their intake history — all in one place.

---

## 🔧 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Frontend Library:** [React 18](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Date Utility:** [date-fns](https://date-fns.org/)
- **Storage:** `localStorage` (MVP) or can be hooked to a backend
- **Language:** JavaScript with TypeScript support

---

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

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/pill-reminder-app.git
cd pill-reminder-app
