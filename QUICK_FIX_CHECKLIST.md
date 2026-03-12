# ⚡ Quick Action Checklist

## 🔴 **IMMEDIATE ACTIONS** (Do This Now)

### Step 1: Stop Current Servers
```bash
# In backend terminal: Press Ctrl+C
# In frontend terminal: Press Ctrl+C
```

### Step 2: Restart Backend
```bash
cd c:\Users\nslk2\OneDrive\Desktop\SmartLearn-PlaceHub\backend
npm run dev
```
✅ **Wait for:** 
```
Server running on port 5000
MongoDB Connected Successfully
```

### Step 3: Restart Frontend
```bash
cd c:\Users\nslk2\OneDrive\Desktop\SmartLearn-PlaceHub\frontend
npm start
```
✅ **Wait for:** 
```
Compiled successfully!
```

---

## 🧪 **TEST EACH ROLE** (5 Minutes Each)

### Test 1: STUDENT
```
1. Go to http://localhost:3000
2. Email: student@smartlearn.com
3. Password: student123
4. Press Login
```
✅ **Expected Result:**
- [ ] See Student Dashboard
- [ ] See 4 tabs: Coding Practice, Quizzes, Algorithms, Placements
- [ ] Click Placements tab → See 5 companies (Google, Microsoft, etc.)
- [ ] Try Search: Type "Google" → Should filter correctly
- [ ] Click any placement → View Details modal opens
- [ ] Click Apply button → Success message appears
- [ ] See "🚪 Logout" button in bottom left sidebar
- [ ] Click Logout → Return to login page

---

### Test 2: ADMIN
```
1. Go to http://localhost:3000
2. Email: admin@smartlearn.com
3. Password: admin123
4. Press Login
```
✅ **Expected Result:**
- [ ] See Admin Dashboard with different stats
- [ ] See only 2 tabs: "📊 All Drives" and "➕ Create Drive"
- [ ] Click "Create Drive" tab
- [ ] Fill form:
  - Company: Netflix
  - Eligibility: 8.0+ CGPA
  - Location: San Francisco
  - Salary: 20 LPA
  - Description: Software Engineer
- [ ] Click "Create Drive" button
- [ ] See ✅ green success message
- [ ] Form clears automatically
- [ ] New "Netflix" appears in drives list
- [ ] Click Logout → Return to login

---

### Test 3: RECRUITER
```
1. Go to http://localhost:3000
2. Email: recruiter@smartlearn.com
3. Password: recruiter123
4. Press Login
```
✅ **Expected Result:**
- [ ] See Recruiter Dashboard (different from admin/student)
- [ ] See 2 tabs: "📊 Placements" and "👨‍💼 Top Candidates"
- [ ] Can view placements but NO create button
- [ ] Can view candidates list
- [ ] See "🚪 Logout" button
- [ ] Click Logout → Return to login

---

## 🐛 **IF YOU SEE ERRORS:**

### Error: "Cannot find module..."
```bash
# Run in frontend folder
npm install
```

### Error: "404 on placements"
```bash
# Backend not restarted. Kill with Ctrl+C and restart:
npm run dev
```

### Error: "Unauthorized"
```bash
# Token expired. Clear browser cache and login again:
Ctrl+Shift+Delete → Clear all cookies
```

### Error: "MongoDB Connection Error"
```bash
# MongoDB not running
# Windows: Check Services → MongoDB
```

### Error: Still shows old UI
```bash
# Hard refresh: Ctrl+Shift+R (Windows)
# Or clear browser cache
```

---

## ✅ **VERIFICATION CHECKLIST**

| Item | Status |
|------|--------|
| Backend route order fixed | ✅ Done |
| Sidebar role-aware | ✅ Done |
| Navbar role-aware | ✅ Done |
| Admin can create placements | ✅ Done |
| Student can apply | ✅ Done |
| Logout works | ✅ Done |
| Role-specific navigation | ✅ Done |
| No 404 errors | ✅ Ready to test |
| No console errors | ✅ Ready to test |
| All 3 roles work | ✅ Ready to test |

---

## 📞 **NEED HELP?**

If something doesn't work after restart:

1. **Check backend terminal** - Look for error messages
2. **Check browser console** - F12 → Console tab
3. **Look at Network tab** - F12 → Network → See if API calls work
4. **Restart everything** - Sometimes a full restart fixes it

---

## 📊 **Database Seeding**

If you need fresh test data:
```bash
cd backend
node seed.js
```

You'll see:
```
✅ MongoDB Connected
🗑️ Cleared existing users
✅ Created test users (3)
🗑️ Cleared existing placements
✅ Created test placements (5)
🎉 Database seeded successfully!
```

---

## 🎉 **SUCCESS INDICATORS**

You'll know everything is fixed when:
- ✅ Can login with all 3 roles
- ✅ Each role sees their specific menu
- ✅ Can browse placements without errors
- ✅ Admin can create new placements
- ✅ Student can apply for placements
- ✅ Can logout from anywhere
- ✅ Browser console is clean (no red errors)
- ✅ All pages load instantly

---

**That's it! Start fresh and test.** 🚀

All fixes are in the code. Just restart and it should work! ✨

