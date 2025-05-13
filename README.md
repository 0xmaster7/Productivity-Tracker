# 📈 Productivity Tracker

A modern React-based web application designed to help users plan, track, and complete tasks efficiently while earning rewards through gamification.

This productivity app enables users to register, log in, add tasks based on their mood and effort level, complete tasks to earn points, and collect achievement badges. It integrates a clean and interactive UI with practical gamified features to keep users motivated.

---

## 🚀 Features & Logic Breakdown

### 1. 🏠 Homepage
- Includes a responsive **navigation bar** with interactive hover effects.
- Promotes features and benefits using attractive content and layout sections.
- Uses `Link` components from `react-router-dom` for navigation to Register and Login pages.
- Includes a "Download Now" button (demo functionality via alert + simulated file link).
- Layout utilizes multiple content blocks such as:
  - **Feature Highlights**
  - **Icons + Text Info Blocks**
  - **Call to Action**

### 2. 📝 Registration Page (`register.js`)
- Uses React `useState` hooks to manage form data and field-level validation.
- Validates:
  - Name (starts with capital, full name support)
  - Email format
  - Password strength (8+ chars, 1 number, uppercase, special char)
  - Confirm password match
- Error messages are rendered dynamically under each field.
- On valid submission:
  - Sends a `POST` request to the local JSON server (`http://localhost:3000/users`) to create a new user object (with empty `tasks` array).
  - Clears form on success and displays confirmation.

### 3. 🔐 Login Page (`login.js`)

**Logic for the Login Page:**
- **Form Validation**:
  - **Email**: Ensures the email entered is in a valid format.
  - **Password**: Validates that the password matches the required criteria (minimum length, uppercase letter, number, special character).
  
- **Login Flow**:
  - When the user enters their email and password and submits the form, the system checks the entered credentials against the list of users stored in the local JSON server.
  - If the login credentials are correct:
    - The user is logged in successfully.
    - Their email and user ID are saved to `localStorage` for persistent login.
    - The user is redirected to the **Dashboard** page.
  - If the login credentials are incorrect, an error message is shown.
  
- **Error Handling**:
  - If any fields are left empty or the password does not meet the required criteria, an appropriate error message is shown.

### 4. 📊 Dashboard (`dashboard.js`)
- **Displays existing tasks** from the current logged-in user (fetched using stored email from `localStorage`).
- Each task includes:
  - Task Name
  - Mood (e.g., Energetic, Focused)
  - Effort Level (Low, Medium, High → weighted into Points: 2, 5, 10)
- **Task Management:**
  - Add new tasks with mood and effort selection
  - Filter tasks by mood
  - Mark tasks as complete → awards points
  - Delete tasks
- **Gamification:**
  - Points increase as tasks are completed
  - Badges are awarded:
    - Bronze Achiever → 50+ points
    - Silver Achiever → 100+ points
    - Gold Achiever → 200+ points
- **Reset Dashboard**: Clears all tasks, points, and badges for the current user

### 5. 💾 Data Storage

The application uses a **local JSON server** (`db.json`) to manage and persist user data, including tasks. This setup allows for easy simulation of a real database without requiring a backend server.

#### 🗂️ Structure of `db.json`

The `db.json` file contains a key called `"users"` which maps to an array of user objects. Each user object includes:
- `id`: A unique identifier for the user.
- `name`: The user's name.
- `email`: The user's email (used for login).
- `password`: The user's password (plain text for simplicity, though not secure in real apps).
- `tasks`: An array of task objects associated with that user.

Each task inside the `tasks` array contains:
- `name`: Task description.
- `mood`: User's mood when planning the task.
- `effort`: Estimated effort level (e.g., "medium").
- `id`: A unique identifier for the task.
- `completed`: Boolean indicating if the task is done.
- `points`: Points earned or assigned to the task.

#### 🔄 Session Management and Task Retrieval

- When a user logs in, their `email` and `id` are saved in **LocalStorage**.
- This persistent storage allows the app to remember the user even after a page refresh or temporary logout.
- Upon returning, the app checks LocalStorage for the user's credentials.
- It then queries the `db.json` by matching the `id` or `email` to locate the correct user object.
- Once the user is identified, their associated `tasks` array is extracted and loaded into the application UI.

This approach ensures a smooth experience by rehydrating the user's session state and restoring their task list without requiring re-authentication.

---

## 🛠️ Tech Stack

- **Frontend**: React (with functional components and hooks)
- **Backend**: JSON Server (`db.json` for user and task storage)
- **Routing**: `react-router-dom`
- **HTTP**: Axios for API interactions
- **Styling**: CSS (in `style.css`)
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## 📁 Folder Structure

```bash
productivity_tracker/
│
├── public/
│ ├── icons/ # Icon assets
│ ├── pictures/ # Homepage images
│ ├── fonts/ # Custom fonts
│
├── src/
│ ├── components/
│ │ ├── homepage.js # Landing page UI
│ │ ├── login.js # Login logic
│ │ ├── register.js # Registration form and logic
│ │ ├── dashboard.js # Task tracking, filtering, gamification
│ │ ├── scripts.js # Shared validation & interaction functions
│ │ ├── style.css # Global styling
│
├── db.json (external) # Used with JSON Server to simulate a backend
```

---

## 🧪 How to Run the Project Locally

### 1. ✅ Prerequisites
- Node.js and npm installed
- JSON Server installed globally (optional but recommended)

### 2. 💻 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/productivity_tracker.git
cd productivity_tracker

# Install dependencies
npm install

# Start the React development server
npm start
The app will be available at:
http://localhost:3000

3. 🗂️ JSON Server Setup (For Backend Simulation)
In a separate terminal:

# Navigate to the directory containing db.json
cd productivity_tracker

# Run JSON Server (install globally first if needed: npm install -g json-server)
json-server --watch db.json --port 3001
Now, the backend will be available at:
http://localhost:3001/users