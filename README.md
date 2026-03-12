# 🎓 SmartLearn-PlaceHub

A comprehensive full-stack learning and placement platform featuring interactive quizzes, coding challenges, algorithm visualizations, and placement drive management.

## 🎯 Project Overview

SmartLearn-PlaceHub is a professional platform designed to help students:
- **📝 Practice Coding** - Solve 10 curated coding challenges with instant feedback
- **🎯 Master Quizzes** - Timed assessments with progress tracking and detailed analytics
- **🎨 Visualize Algorithms** - Watch 6 sorting/searching algorithms in action with real-time statistics
- **💼 Manage Placements** - Browse and apply to job placement drives with advanced filtering
- **📊 Track Analytics** - Monitor learning progress, performance metrics, and readiness scores
- **🔐 Secure Access** - Role-based authentication for Students, Admins, and Recruiters

## 💻 Tech Stack

| Component | Technology |
|-----------|-------------|
| **Frontend** | React 19.2.4, React Router v7, Axios, CSS3 (Grid/Flexbox) |
| **Backend** | Node.js, Express.js 5.2.1, Mongoose ODM |
| **Database** | MongoDB (Local or Atlas) |
| **Authentication** | JWT + bcryptjs |
| **Styling** | Custom CSS3 with Responsive Design |

## ✨ Key Features

✅ **Quiz Engine** - Timed quizzes with progress navigator and instant feedback  
✅ **Coding Practice** - 10 curated challenges (Easy, Medium, Hard) with code validation  
✅ **Algorithm Visualizer** - 6 algorithms with real-time animation and statistics  
✅ **Analytics Dashboard** - Learning progress tracking with recommendations  
✅ **Placement Management** - Advanced search/filter and application tracking  
✅ **User Authentication** - Role-based access (Student, Admin, Recruiter)  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Real-time Feedback** - Instant validation and performance metrics  

## 📂 Project Structure

```
SmartLearn-PlaceHub/
│
├── 📄 README.md                           # This file
├── 🚀 QUICK_START_GUIDE.md               # Step-by-step user guide
├── 📚 QUICK_REFERENCE.md                 # API and routes reference
│
├── backend/                              # Node.js/Express Server
│   ├── models/                          # MongoDB schemas
│   │   ├── User.js                     # User authentication model
│   │   ├── Quiz.js                     # Quiz questions model
│   │   ├── CodingQuestion.js           # Coding challenges (enhanced)
│   │   ├── Performance.js              # Performance tracking
│   │   └── Placement.js                # Placement drives
│   ├── controllers/                     # Business logic
│   │   ├── authController.js           # Login/Register
│   │   ├── quizController.js           # Quiz management
│   │   ├── codingController.js         # Coding challenges
│   │   ├── performanceController.js    # Performance tracking
│   │   └── placementController.js      # Placement operations
│   ├── routes/                          # API endpoints
│   │   ├── authRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── codingRoutes.js
│   │   ├── performanceRoutes.js
│   │   └── placementRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js           # JWT verification
│   ├── .env                            # Environment variables (create this)
│   ├── server.js                       # Express server entry
│   ├── seed.js                         # Database initialization
│   └── package.json                    # Dependencies
│
└── frontend/                            # React Application
    ├── public/
    │   └── index.html                  # Main HTML file
    ├── src/
    │   ├── components/                # Reusable components
    │   │   ├── Navbar.js             # Navigation
    │   │   ├── Sidebar.js            # Side navigation
    │   │   ├── DashboardLayout.js    # Main layout
    │   │   ├── QuizEngineTab.js      # Quiz interface
    │   │   ├── CodingPracticeTab.js  # Coding interface
    │   │   ├── AlgorithmVisualizationTab.js  # Algo visualizer
    │   │   └── ui/                   # UI components
    │   ├── pages/                    # Full page components
    │   │   ├── Login.js              # Login page
    │   │   ├── Register.js           # Registration
    │   │   ├── StudentDashboard.js   # Student home
    │   │   ├── Quiz.js               # Quiz with timer
    │   │   ├── CodingPractice.js     # Coding IDE
    │   │   ├── Analytics.js          # Performance dashboard
    │   │   ├── AdminDashboard.js     # Admin panel
    │   │   └── StudentPlacements.js  # Job listings
    │   ├── services/
    │   │   ├── api.js                # API configuration
    │   │   ├── placementApi.js       # Placement API
    │   │   └── ProtectedRoute.js     # Route protection
    │   ├── .env                       # Environment variables (create this)
    │   ├── App.js                     # Main App component
    │   ├── App.css                    # Global styles
    │   ├── index.js                   # React entry point
    │   ├── index.css                  # Global styles
    │   └── pages/
    │       ├── Quiz.css              # Quiz styling
    │       ├── CodingPractice.css    # IDE styling
    │       ├── Analytics.css         # Dashboard styling
    │       └── Placements.css        # Placements styling
    ├── .env                          # Environment variables (create this)
    ├── package.json                  # Dependencies
    └── README.md                     # Frontend-specific guide
```

## Features Implemented

### Backend Features
✅ User authentication (Register/Login) with JWT  
✅ Role-based access control (Student, Admin, Recruiter)  
✅ Placement drive CRUD operations  
✅ Student application management  
✅ Admin shortlisting system  
✅ Quiz management and storage  
✅ Coding challenge storage with full specifications  
✅ Performance tracking and analytics  
✅ MongoDB data persistence  
✅ Secure password hashing with bcryptjs  

### Frontend Features
✅ Modern responsive dashboard  
✅ Interactive quiz engine with timer  
✅ Code editor for practice challenges  
✅ Interactive algorithm visualization  
✅ Analytics dashboard with progress tracking  
✅ Advanced placement search and filtering  
✅ User authentication flows  
✅ Toast notifications and modals  
✅ Mobile-responsive design  
✅ Dark theme with modern UI  

## 🚀 Quick Start (5 Minutes)

### Prerequisites

Before starting, ensure you have:

1. **Node.js v14+** - https://nodejs.org/
   ```bash
   node --version  # Should show v14 or higher
   ```

2. **MongoDB** - https://www.mongodb.com/try/download/community
   ```bash
   mongod  # Start MongoDB service in PowerShell
   ```

3. **Git** - https://git-scm.com/
   ```bash
   git --version
   ```

### Step 1: Clone Repository

```bash
git clone https://github.com/YourUsername/SmartLearn-PlaceHub.git
cd SmartLearn-PlaceHub
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartlearn
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

Seed database:
```bash
node seed.js
```

Start backend:
```bash
npm start
```

Expected output:
```
✅ Server running on port 5000
✅ MongoDB Connected Successfully
```

### Step 3: Setup Frontend

**In a new terminal:**

```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

Expected output:
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 4: Access Application

Open browser and navigate to: **http://localhost:3000**

---

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | student@smartlearn.com | student123 |
| Admin | admin@smartlearn.com | admin123 |
| Recruiter | recruiter@smartlearn.com | recruiter123 |

---

## 📖 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```
MONGO_URI=mongodb://localhost:27017/smartlearn
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

#### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Application opens at `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth/`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/register` | Register new user |
| POST | `/login` | User login |
| POST | `/logout` | User logout |
| GET | `/profile` | Get user profile |
| PUT | `/profile` | Update profile |

### Quiz Routes (`/api/quiz/`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Get all quizzes |
| GET | `/:id` | Get single quiz |
| POST | `/submit` | Submit quiz response |
| GET | `/results/:id` | Get quiz results |

### Coding Routes (`/api/coding/`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Get all challenges |
| GET | `/:id` | Get single challenge |
| POST | `/submit` | Submit solution |
| GET | `/solutions/me` | Get my solutions |

### Placement Routes (`/api/placement/`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Get all placements |
| GET | `/:id` | Get single placement |
| POST | `/apply/:id` | Apply for position |
| GET | `/applications/me` | Get my applications |
| POST | `/:id/shortlist` | Shortlist candidate (Admin) |
| PUT | `/:id/close` | Close placement (Admin) |

### Performance Routes (`/api/performance/`)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/me` | Get my performance |
| POST | `/track` | Track performance |
| GET | `/all` | Get all performance (Admin) |

---

## 👥 User Roles & Permissions

### Student Role
- View available placements
- Apply for placements
- Practice coding challenges
- Take quizzes and view scores
- View personal analytics
- Track learning progress

### Admin Role
- Create and manage placement drives
- View all applications
- Shortlist candidates
- Close placements
- Manage system users
- View system analytics

### Recruiter Role
- View all placement drives (read-only)
- View shortlisted candidates
- Analyze student performance
- Limited dashboard access

---

## 🎮 Using the Features

### 1. Quiz Feature
```
Login → Dashboard → Click "Quiz" 
→ Select a quiz → Answer questions 
→ View results with score and feedback
```

### 2. Coding Practice
```
Login → Coding Practice → Browse challenges 
→ Select challenge → Write solution 
→ Submit → See test results
```

### 3. Algorithm Visualization
```
Dashboard → Algorithm Visualization 
→ Select algorithm → Adjust parameters 
→ Click "Visualize" → Watch animation 
→ Monitor statistics (comparisons, swaps)
```

### 4. Placements
```
Login → Placements → Search/Filter drives 
→ View details → Click "Apply" 
→ Track application status → View results
```

### 5. Analytics
```
Dashboard → Analytics → View your stats 
→ Track progress by topic → Get recommendations 
→ Set learning goals → Monitor readiness score
```

---

## 🐛 Troubleshooting

### Backend Connection Issues

**Error: Cannot connect to MongoDB**
```bash
# Ensure MongoDB is running
mongod  # On Windows PowerShell

# Check MongoDB is accessible
mongo   # Should connect to MongoDB shell
```

**Error: Port 5000 already in use**
```bash
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### Frontend Issues

**Error: Cannot find module**
```bash
cd frontend
rm -r node_modules package-lock.json
npm install
```

**Error: CORS error**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env` matches backend URL
- Backend should have CORS enabled

**Blank page after login**
1. Open browser console (F12)
2. Check for errors
3. Verify backend API calls in Network tab
4. Clear browser cache: Ctrl+Shift+Delete

**Port 3000 already in use**
```bash
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Database Issues

**Seeding failed**
```bash
# Check MongoDB is running
# Clear existing collections first
node seed.js
```

**Connection timeout**
- Verify MONGODB_URI in .env
- Check MongoDB service is running
- Example: `mongodb://localhost:27017/smartlearn`

---

## 📊 Testing the Application

### Manual Testing Checklist

- [ ] **Authentication**
  - [ ] Register new account
  - [ ] Login works
  - [ ] Token persists
  - [ ] Logout clears session

- [ ] **Quizzes**
  - [ ] Load quiz list
  - [ ] Timer counts down
  - [ ] Questions display correctly
  - [ ] Submit and view score

- [ ] **Coding**
  - [ ] Load all 10 challenges
  - [ ] Display challenge details
  - [ ] Code editor accepts input
  - [ ] Submit and get results
  - [ ] Show correct/incorrect feedback

- [ ] **Algorithms**
  - [ ] Load all 6 algorithms
  - [ ] Animation plays smoothly
  - [ ] Statistics update in real-time
  - [ ] Controls work (speed, size)
  - [ ] Reset button generates new array

- [ ] **Placements**
  - [ ] Display all placements
  - [ ] Search functionality works
  - [ ] Filter by status works
  - [ ] Apply for placement succeeds
  - [ ] View application status

- [ ] **Analytics**
  - [ ] Load performance data
  - [ ] Display stats cards
  - [ ] Show topic progress
  - [ ] Load recommendations
  - [ ] Track goals

---

## 🚀 Deployment

### Build for Production

```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/build` folder.

### Deploy Frontend
- **Netlify:** Drag & drop `build` folder or connect GitHub
- **Vercel:** Connect GitHub repo, auto-deploys on push
- **AWS S3:** Upload `build` folder contents

### Deploy Backend
- **Heroku:** Push to Heroku git remote
- **AWS EC2:** Deploy Node.js server on instance
- **DigitalOcean:** Similar to EC2, push code and start service

### Deploy Database
- **MongoDB Atlas:** Free cloud MongoDB hosting
  1. Create account at https://www.mongodb.com/cloud/atlas
  2. Create cluster
  3. Get connection string
  4. Update MONGODB_URI in backend .env

---

## 📚 Additional Resources

- **Frontend Guide:** [frontend/README.md](frontend/README.md)
- **Quick Start Guide:** [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)
- **API Reference:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Feature Documentation:** [CODING_CHALLENGES_ALGORITHM_VISUALIZATION.md](CODING_CHALLENGES_ALGORITHM_VISUALIZATION.md)
- **React Docs:** https://react.dev/
- **Express Docs:** https://expressjs.com/
- **MongoDB Docs:** https://docs.mongodb.com/

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style
- Use consistent naming conventions
- Add comments for complex logic
- Follow existing code structure
- Test changes before pushing

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Issues

### Getting Help
1. Check [Troubleshooting](#-troubleshooting) section
2. Review error messages in console (F12)
3. Check backend logs for API errors
4. Review documentation in `frontend/README.md`
5. Create an issue on GitHub

### Reporting Bugs
1. Describe the issue clearly
2. Include steps to reproduce
3. Provide error messages/logs
4. Mention your environment (OS, Node version, etc.)
5. Attach screenshots if applicable

---

## 🎉 Ready to Start?

### First Time Users
1. Follow [Quick Start](#-quick-start-5-minutes) section above
2. Login with test credentials provided
3. Explore each feature (Quiz → Coding → Algorithms → Placements)
4. Read [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) for detailed feature walkthroughs

### Developers
1. Clone repository
2. Setup both frontend and backend
3. Run database seed script
4. Start both servers
5. Open http://localhost:3000
6. Check `frontend/README.md` for detailed setup

---

**Made with ❤️ for Learning & Careers**

Happy Coding! 🚀

6. **Analytics**
   - Navigate to Analytics page
   - View performance metrics
   - See learning progress by topic

## Recent Improvements

### Backend
- Enhanced Placement model with more fields (description, location, salary, date)
- Added profile endpoints for user management
- Improved error handling and validation
- Better response formats with detailed data

### Frontend
- Refactored all dashboards with modern UI
- Added responsive card-based layouts
- Implemented tabbed navigation
- Created reusable component library (Card, Tabs, Badge, Progress)
- Added search and filter functionality
- Improved visual hierarchy with icons

## Next Steps for Further Development

1. **Quiz System**
   - Implement quiz submission logic
   - Add score calculation
   - Create quiz analytics

2. **Coding Practice**
   - Integrate code editor
   - Add problem database
   - Implement code execution

3. **Performance Tracking**
   - Add detailed analytics
   - Create performance charts
   - Track learning path

4. **Advanced Features**
   - Real-time notifications
   - Email integration
   - Interview preparation guides
   - Mock interview scheduling

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify network connectivity

### Frontend API Errors
- Ensure backend is running on port 5000
- Check browser console for error details
- Verify JWT token in localStorage

### CORS Issues
- Backend CORS is enabled for all origins
- If issues persist, check browser console

## File Structure Details

### Frontend Components
- `Navbar.js` - Top navigation bar
- `Sidebar.js` - Left sidebar navigation
- `DashboardLayout.js` - Wraps dashboard pages
- `Modal.js` - Reusable modal component
- `ui/Card.js` - Card component
- `ui/Tabs.js` - Tabbed interface
- `ui/Badge.js` - Badge/label component
- `ui/Progress.js` - Progress bar

### Tab Components
- `CodingPracticeTab.js` - Coding practice section
- `QuizEngineTab.js` - Quiz attempts
- `AlgorithmVisualizationTab.js` - Algorithm learning
- `PlacementDrivesTab.js` - Placement overview

## Performance & Security

### Security Measures
- JWT token-based authentication
- Bcryptjs password hashing
- Role-based access control
- Protected routes on frontend

### Performance
- Responsive grid layouts
- Lazy component loading
- Efficient state management
- Optimized API calls

## Browser Compatibility
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Contact & Support
For issues or questions, please check the implementation details above or create an issue in the repository.

---

**Version:** 1.0.0  
**Last Updated:** January 2026
