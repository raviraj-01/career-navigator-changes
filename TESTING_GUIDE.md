# Quick Testing Guide - Career Navigator

## 🎯 Test Flow

### 1. **Home Page Test**
- **URL:** http://localhost:8080 or http://localhost:8080/home
- **Expected:**
  - Light theme (white/light blue background)
  - Dark text (black/slate-900)
  - Yellow/Orange buttons
  - Animated feature cards
  - Pricing preview showing ₹99 and ₹499
- **Actions:**
  - Click "Get Started" → Should redirect to `/signin`
  - Click "Learn More" → Should go to `/how-it-works`
  - Click "View All Plans" → Should go to `/pricing`

### 2. **Sign Up Test**
- **URL:** http://localhost:8080/signup
- **Test Data:**
  ```
  Name: Test User
  Email: test@example.com
  Password: Password123
  Confirm Password: Password123
  Phone: 9876543210
  Location: India
  ```
- **Expected Behavior:**
  - Form validates all fields
  - Password must match
  - Password minimum 6 characters
  - On submit → Redirect to `/dashboard`
  - Data saved to localStorage with key "resumeai_user"

### 3. **Sign In Test**
- **URL:** http://localhost:8080/signin
- **Test Data:**
  ```
  Email: test@example.com
  Password: Password123
  ```
- **Expected Behavior:**
  - Login successful → Redirect to `/dashboard`
  - Invalid credentials → Show error message
  - Can log out from profile page

### 4. **Dashboard Access Protection**
- **Without Login:**
  - Try accessing http://localhost:8080/dashboard
  - Should redirect to `/signin`
  - ProtectedRoute prevents access
  
- **After Login:**
  - All dashboard pages accessible
  - Sidebar navigation works
  - Can access `/chat`, `/resumes`, `/settings`, `/profile`

### 5. **Profile Page Test**
- **URL:** http://localhost:8080/profile (after login)
- **Expected Display:**
  - Left panel: Avatar with initials, account info
  - Right panel: Editable profile form
  - "Edit Profile" button
- **Test Edit:**
  - Click "Edit Profile"
  - Modify any field (name, phone, location, bio)
  - Click "Save Profile"
  - Refresh page → Data should persist
- **Sign Out:**
  - Click red "Sign Out" button
  - Should redirect to `/signin`
  - localStorage should be cleared

### 6. **Pricing Page Test**
- **URL:** http://localhost:8080/pricing
- **Expected:**
  - Two plan cards (Single Resume ₹99, Bundle ₹499)
  - Popular badge on bundle
  - Feature lists for each plan
- **Action:**
  - Click "Choose Plan" on any card
  - Payment modal should appear with:
    - Plan name
    - Number of resumes
    - Total amount
  - Click "Proceed to Payment"
  - Should redirect to `/download`

### 7. **Download Page Test**
- **URL:** http://localhost:8080/download
- **Expected:**
  - Success confirmation with green checkmark
  - Payment summary showing:
    - Plan selected
    - Amount paid (₹99 or ₹499)
    - Transaction ID
    - Date
- **Format Selection:**
  - Option to download as PDF or DOCX
  - Download button triggers action
- **Navigation:**
  - "Back to Dashboard" → `/dashboard`
  - "Continue to Resume Builder" → `/chat`

### 8. **Theme Verification**
- **Light Theme Checklist:**
  - ✓ Background: Light gradient (slate-50 to slate-100)
  - ✓ Text: Dark (slate-900)
  - ✓ Cards: White with shadows
  - ✓ Buttons: Yellow/Orange or slate outline
  - ✓ All pages have consistent styling
  - ✓ No dark mode content visible

### 9. **localStorage Test**
- **Open Browser DevTools:** F12
- **Check Application → Storage → Local Storage → localhost:8080**
- **Should see key: "resumeai_user"**
- **Value example:**
  ```json
  {
    "id": "1704988123456",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "location": "India",
    "bio": "Resume Builder User",
    "joinDate": "January 10, 2024"
  }
  ```

### 10. **Persistence Test**
- **After Login:**
  1. Refresh page → Still logged in (no redirect to signin)
  2. Navigate away and back → Still logged in
  3. Close browser tab → Reopen
  4. Refresh → Still has user data
- **After Logout:**
  1. localStorage key deleted
  2. Redirected to `/signin`
  3. Can't access dashboard

---

## 🔍 Common Issues & Solutions

### Issue: "useAuth" hook error
- **Cause:** App not wrapped with AuthProvider
- **Solution:** Check App.tsx has `<AuthProvider>` wrapper

### Issue: Protected routes not working
- **Cause:** ProtectedRoute not applied to routes
- **Solution:** Verify routes in App.tsx use `<ProtectedRoute>` wrapper

### Issue: Light theme not visible
- **Cause:** Outdated styles or cache
- **Solution:** Hard refresh (Ctrl+Shift+R) or clear cache

### Issue: localStorage data not saving
- **Cause:** Browser privacy mode or settings
- **Solution:** Test in normal mode, check browser console

---

## 📊 Test Results Template

```
Test Date: _______________
Tester: ___________________

AUTHENTICATION:
- [ ] Sign Up works
- [ ] Sign In works
- [ ] Protected routes work
- [ ] Logout clears data
- [ ] localStorage saves/loads

USER PROFILE:
- [ ] Profile displays correctly
- [ ] Edit profile works
- [ ] Changes persist
- [ ] Sign out from profile works

PRICING:
- [ ] Both plans visible
- [ ] Payment modal appears
- [ ] Summary correct

DOWNLOAD:
- [ ] Success page displays
- [ ] Format selection works
- [ ] Navigation buttons work

THEME:
- [ ] Light background on all pages
- [ ] Dark text visible everywhere
- [ ] No dark mode elements
- [ ] Animations smooth

RESPONSIVE:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

OVERALL STATUS: ✅ PASS / ❌ FAIL
```

---

## 🎬 Demo Script

### Quick Demo (5 minutes):
1. Start at home page
2. Click "Get Started"
3. Create account with test data
4. Show profile page with user data
5. Edit profile and refresh to show persistence
6. Go to pricing
7. Select a plan to show modal
8. Show download page
9. Sign out and verify redirect
10. Try accessing dashboard without login

---

**Version:** 1.0
**Last Updated:** Current Session
**Status:** Ready for Testing ✅
