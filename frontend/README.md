# 🎓 SmartLearn-PlaceHub Frontend

A comprehensive React-based learning platform featuring interactive quizzes, coding challenges, algorithm visualizations, and placement drive management.

## 📋 Project Overview

SmartLearn-PlaceHub is a full-stack educational platform designed to help students:
- **Learn Through Quizzes** - Interactive assessments with timers and progress tracking
- **Practice Coding** - Solve real coding challenges with instant feedback
- **Visualize Algorithms** - Watch sorting and searching algorithms in action
- **Explore Placements** - Browse and apply to placement drives
- **Track Progress** - Monitor learning analytics and performance metrics

## ✨ Key Features

✅ **Quiz Engine** - Timed quizzes with progress navigator and instant feedback  
✅ **Coding Practice** - 10 curated coding challenges (Easy, Medium, Hard)  
✅ **Algorithm Visualizer** - 6 algorithms with real-time statistics (Bubble, Insertion, Selection, Quick, Merge Sort, Binary Search)  
✅ **Analytics Dashboard** - Learning progress tracking with recommendations  
✅ **Placement Management** - Advanced search and filtering for job drives  
✅ **User Authentication** - Role-based access (Student, Admin, Recruiter)  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **Git** (for cloning and version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

3. **MongoDB** (for backend database)
   - Download from: https://www.mongodb.com/try/download/community
   - Make sure MongoDB service is running

---

## 📥 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the entire project
git clone https://github.com/YourUsername/SmartLearn-PlaceHub.git

# Navigate to project directory
cd SmartLearn-PlaceHub
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to frontend folder
cd frontend

# Install all required packages
npm install
```

**What this does:**
- Downloads all React packages
- Installs UI components and dependencies
- Sets up build tools and development environment
- Takes ~2-3 minutes depending on internet speed

### Step 3: Install Backend Dependencies

```bash
# Navigate back to root, then go to backend
cd ../backend

# Install backend packages
npm install
```

**What this does:**
- Installs Express server framework
- Sets up MongoDB connection
- Installs authentication libraries
- Sets up API routes and middleware

### Step 4: Setup Environment Variables

#### Backend Configuration

Create a `.env` file in the `backend` folder:

```bash
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartlearn
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

#### Frontend Configuration

Create a `.env` file in the `frontend` folder:

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Option 1: Run Both Servers Simultaneously (Recommended)

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm start
```

Expected output:
```
✅ Server running on port 5000
✅ MongoDB Connected Successfully
```

**Terminal 2 - Start Frontend Server:**

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view smartlearn in the browser.
Local:            http://localhost:3000
```

### Option 2: Run Servers Separately (If you prefer)

**Start Backend:**
```bash
# From project root
cd backend
node server.js
```

**Start Frontend:**
```bash
# From project root, in a new terminal
cd frontend
npm start
```

---

## 🌐 Accessing the Application

Once both servers are running:

1. **Open your browser**
2. **Navigate to:** http://localhost:3000
3. **You should see the SmartLearn login page**

---

## 🔐 Test Credentials

Use these accounts to test different features:

### Student Account
```
Email:    student@smartlearn.com
Password: student123
Access:   Quiz, Coding Practice, Analytics, Placements
```

### Admin Account
```
Email:    admin@smartlearn.com
Password: admin123
Access:   Dashboard, User Management, Analytics
```

### Recruiter Account
```
Email:    recruiter@smartlearn.com
Password: recruiter123
Access:   Recruiter Dashboard, Placement Management
```

---

## 📚 Using the Application

### 1️⃣ Quiz Feature

1. Login as **Student**
2. Click **"Quiz"** in navigation
3. **Select a quiz** from the list
4. **Answer questions** within the time limit
5. Track your **progress** with the sidebar navigator
6. View **results** and score

### 2️⃣ Coding Practice

1. Go to **"Coding Practice"** page
2. **Browse 10 challenges** (Easy, Medium, Hard)
3. **Select** a challenge to view details
4. **Write your solution** in the code editor
5. **Submit** to validate your code
6. View **instant feedback** with test cases

**Sample Challenges:**
- Two Sum (Easy)
- Reverse Integer (Medium)
- First Missing Positive (Hard)
- And 7 more...

### 3️⃣ Algorithm Visualization

1. Navigate to **"Algorithm Visualization"** tab
2. **Choose an algorithm:**
   - Bubble Sort
   - Insertion Sort
   - Selection Sort
   - Quick Sort
   - Merge Sort
   - Binary Search
3. **Adjust settings:**
   - Array Size: 5-100 elements
   - Speed: 1-100 (slower to faster)
4. **Click "Visualize"** to start animation
5. **Watch bars move** with color indicators:
   - Gray = Not yet processed
   - Blue/Red/Purple = Currently comparing
   - Green = Completed
6. **Monitor statistics:**
   - Number of comparisons
   - Number of swaps
   - Execution time

### 4️⃣ Analytics Dashboard

1. Click **"Analytics"** page
2. View your **learning stats:**
   - Total quizzes completed
   - Coding challenges solved
   - Overall readiness score
3. Track **progress by topic:**
   - Data Structures
   - Algorithms
   - System Design
   - Web Development
4. Get **personalized recommendations**
5. Set and track **learning goals**

### 5️⃣ Placements

1. Go to **"Placements"** page
2. **Search** by company name
3. **Filter** by location or status
4. **View details** of each placement drive
5. **Apply** to positions you're interested in
6. Track **application status**

---

## 🗂️ Project Structure

```
SmartLearn-PlaceHub/
│
├── frontend/                          # React frontend application
│   ├── public/                        # Static files
│   │   └── index.html                # Main HTML file
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Navbar.js            # Navigation bar
│   │   │   ├── Sidebar.js           # Side navigation
│   │   │   ├── DashboardLayout.js   # Main layout wrapper
│   │   │   ├── QuizEngineTab.js     # Quiz component
│   │   │   ├── CodingPracticeTab.js  # Coding challenges
│   │   │   └── AlgorithmVisualizationTab.js  # Algorithm visualizer
│   │   ├── pages/                    # Page components
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Registration page
│   │   │   ├── StudentDashboard.js  # Student home
│   │   │   ├── Quiz.js              # Full quiz page with timer
│   │   │   ├── CodingPractice.js    # Full coding practice page
│   │   │   ├── Analytics.js         # Learning dashboard
│   │   │   └── StudentPlacements.js # Placement listing
│   │   ├── services/
│   │   │   ├── api.js               # API service configuration
│   │   │   └── ProtectedRoute.js    # Route protection
│   │   ├── App.js                   # Main App component
│   │   └── index.js                 # React entry point
│   └── package.json                 # Frontend dependencies
│
├── backend/                           # Express backend server
│   ├── controllers/                  # Business logic
│   │   ├── authController.js        # Authentication
│   │   ├── quizController.js        # Quiz operations
│   │   ├── codingController.js      # Coding challenges
│   │   ├── performanceController.js # Performance tracking
│   │   └── placementController.js   # Placement management
│   ├── models/                       # MongoDB schemas
│   │   ├── User.js                  # User schema
│   │   ├── Quiz.js                  # Quiz schema
│   │   ├── CodingQuestion.js        # Coding challenge schema
│   │   ├── Performance.js           # Performance schema
│   │   └── Placement.js             # Placement schema
│   ├── routes/                       # API endpoints
│   │   ├── authRoutes.js            # /api/auth/
│   │   ├── quizRoutes.js            # /api/quiz/
│   │   ├── codingRoutes.js          # /api/coding/
│   │   ├── performanceRoutes.js     # /api/performance/
│   │   └── placementRoutes.js       # /api/placement/
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT authentication
│   ├── server.js                    # Main server file
│   ├── seed.js                      # Database seed script
│   └── package.json                 # Backend dependencies
│
└── README.md                         # This file
```

---

## 🔄 Database Setup

### Seed Test Data

To populate the database with test data:

```bash
cd backend
node seed.js
```

This will create:
- ✅ 3 test user accounts
- ✅ 5 placement drives
- ✅ 10 coding challenges
- ✅ Sample quiz questions

---

## 📝 Available Scripts

### Frontend Commands

```bash
# Start development server
npm start
# Opens http://localhost:3000

# Build for production
npm run build
# Creates optimized build in 'build' folder

# Run tests
npm test
# Launches test runner

# Eject configuration (one-way operation)
npm run eject
```

### Backend Commands

```bash
# Start server
npm start
# or
node server.js

# Run with nodemon (auto-restart on changes)
npm run dev
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module" error

**Solution:**
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### Issue: MongoDB connection error

**Solution:**
1. Ensure MongoDB is installed
2. Start MongoDB service:
   - **Windows:** `mongod` in PowerShell
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`
3. Verify `.env` file has correct MONGODB_URI

### Issue: Port 3000 or 5000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**On Windows PowerShell:**
```bash
# Find and kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Issue: CORS errors

**Solution:**
- Ensure `REACT_APP_API_URL` in frontend `.env` matches backend URL
- Backend should have CORS enabled (already configured)

### Issue: Blank page after login

**Solution:**
1. Check browser console for errors (F12)
2. Verify backend is running on port 5000
3. Check network tab to ensure API calls succeed
4. Clear browser cache and reload (Ctrl+Shift+Delete)

---

## 🌟 Features in Detail

### Quiz Engine
- ⏱️ **Timed Questions** - Set time limits per question
- 📊 **Progress Tracking** - Visual progress bar
- 🗂️ **Question Navigator** - Quick jump between questions
- ✅ **Instant Validation** - See correct/incorrect immediately
- 📈 **Score Calculation** - Get detailed results with percentage

### Coding Practice
- 🎯 **10 Curated Challenges** - Easy, Medium, and Hard levels
- 💻 **Code Editor** - Write and submit solutions
- 🧪 **Test Cases** - Run against multiple test cases
- 💡 **Hints Available** - Get help when stuck
- 📊 **Solution Tracking** - Monitor solving progress

### Algorithm Visualization
- 🎨 **Interactive Charts** - Real-time bar visualization
- ⚡ **6 Algorithms** - Bubble, Insertion, Selection, Quick, Merge Sort, Binary Search
- 🔧 **Adjustable Parameters** - Control array size and speed
- 📈 **Real-time Statistics** - Track comparisons and swaps
- 🎮 **Pause/Reset** - Control animation playback

### Analytics
- 📊 **Performance Dashboard** - View all your statistics
- 🎯 **Topic Progress** - Track progress by subject
- 💬 **Recommendations** - Get personalized learning tips
- 🎓 **Goals Management** - Set and track learning objectives
- 📈 **Readiness Score** - See your overall preparedness

---

## 🚀 Deployment

### Build for Production

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Services
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Heroku, AWS, DigitalOcean
- **Database:** MongoDB Atlas (cloud)

---

## 📖 Documentation

- **Setup Guide:** [See this README]
- **Quick Start Guide:** Check `QUICK_START_GUIDE.md`
- **Feature Documentation:** See `CODING_CHALLENGES_ALGORITHM_VISUALIZATION.md`
- **API Documentation:** See backend README

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 💬 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review error messages in browser console (F12)
3. Check backend server logs for API errors
4. Create an issue on GitHub

---

## 🎉 Ready to Code!

Your application is now set up and ready to use. Start by:

1. ✅ Running both servers
2. 🔐 Logging in with test credentials
3. 🎯 Exploring the Quiz feature
4. 💻 Solving coding challenges
5. 🎨 Visualizing algorithms

**Happy Learning! 🚀**
