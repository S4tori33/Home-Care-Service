# Complete RBAC System - Workflow Testing Guide

## 🎯 System Testing Overview

This guide provides comprehensive testing scenarios for the complete multi-role RBAC system for Home Care Service platform.

---

## 📋 Pre-Testing Checklist

Before testing, verify:

- [ ] Browser console is accessible (F12)
- [ ] localStorage is enabled
- [ ] All JavaScript files are loaded (no 404 errors)
- [ ] cssand fonts are loading properly
- [ ] You have access to all demo accounts

### Reset System (if needed)

Open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

This reinitializes all demo accounts.

---

## 🧪 Test Scenarios

### SCENARIO 1: Admin - Complete System Overview
**Role:** Super Admin  
**Expected:** Full system access with all statistics

**Steps:**
1. Open `pages/userLogin.html`
2. Enter credentials:
   - Email: `superadmin@test.com`
   - Password: `123456`
3. Click "Sign In"

**Verify:**
- [ ] Redirects to authConfirmation.html
- [ ] Shows success animation with checkmark
- [ ] Displays: "Super Admin" / "Super Administrator"
- [ ] Shows demo account badge
- [ ] Lists Super Admin features (System access, User management, Analytics)
- [ ] 5-second countdown visible
- [ ] "Next" button available

**After Redirect (Dashboard):**
- [ ] URL shows superadminDashboard.html
- [ ] Title shows "Super Administrator Dashboard"
- [ ] Sidebar shows admin menu items:
  - [ ] Overview
  - [ ] User Management
  - [ ] Analytics
  - [ ] System Settings

**Features Check:**
- [ ] Statistics cards display (Total Users, Total Bookings, Total Messages)
- [ ] Role distribution chart shows breakdown
- [ ] Action buttons: "View All Users", "View All Bookings", etc.
- [ ] Avatar in sidebar shows "SA"
- [ ] Sidebar profile shows correct name/role

**Messaging Check:**
- [ ] Click "Messages" in sidebar (should be available but hidden in menu)
- [ ] OR navigate directly to `pages/messaging.html`
- [ ] Should load messaging interface
- [ ] Conversation list shows all available conversations
- [ ] Chat interface functional

**Logout:**
- [ ] Click "Logout" in navbar
- [ ] Redirects to userLogin.html
- [ ] Session cleared (try accessing dashboard - should redirect to login)

---

### SCENARIO 2: Platform Admin - User Management
**Role:** Platform Admin  
**Expected:** User management and analytics features

**Steps:**
1. Open `pages/userLogin.html`
2. Enter: `platform@test.com` / `123456`

**Verify Login Flow:**
- [ ] Confirmation page shows "Platform Administrator"
- [ ] Features include: User management, Analytics, Reports

**Dashboard Verification:**
- [ ] URL: platformAdminDashboard.html
- [ ] Sidebar menu: Dashboard, User Management, Reports
- [ ] Statistics: Total Users, New This Month, Inactive, Banned
- [ ] User type breakdown shown
- [ ] Color scheme differs from Super Admin (should be Blue #1e40af)

**Sidebar Navigation:**
- [ ] User Profile shows "Platform Admin"
- [ ] "Messages" link available
- [ ] Logout button present

---

### SCENARIO 3: HR Admin - Provider Verification
**Role:** HR Admin  
**Expected:** Provider verification and application management

**Steps:**
1. Login as: `hr@test.com` / `123456`

**Confirmation Page:**
- [ ] Shows "HR Administrator"
- [ ] Features: Applications review, Provider verification, Approve new providers

**Dashboard:**
- [ ] URL: hrAdminDashboard.html
- [ ] Title: "HR Administrator Dashboard"
- [ ] Statistics: Pending Applications, Approved, Rejected, Under Review
- [ ] Provider type breakdown (Caregiver, Pet Care, Garden, Cleaning)
- [ ] Color: Green (#059669)

**Sidebar:**
- [ ] Shows HR-specific menu
- [ ] Messages link present
- [ ] Profile shows correct role

---

### SCENARIO 4: Operations Admin - Booking Management
**Role:** Operations Admin  
**Expected:** Booking and provider assignment management

**Steps:**
1. Login as: `operations@test.com` / `123456`

**Verification:**
- [ ] Confirmation page shows correct role
- [ ] Dashboard: operationsAdminDashboard.html
- [ ] Statistics: Total Bookings, Pending Assignment, Confirmed, Completed
- [ ] Service type breakdown
- [ ] Quick action cards: Create Booking, Assign Provider, Contact Provider
- [ ] Color: Orange (#d97706)

---

### SCENARIO 5: Service Provider - Caregiver Job Management
**Role:** Caregiver  
**Expected:** Job listing and booking acceptance

**Steps:**
1. Login as: `caregiver@test.com` / `123456`

**Confirmation Page:**
- [ ] Shows "Caregiver"
- [ ] Features: Accept bookings, View clients, Message clients, Complete jobs

**Dashboard:**
- [ ] URL: caregiverDashboard.html
- [ ] Title: "Service Provider Portal"
- [ ] Statistics: Available Jobs, Active Jobs, Completed, Earnings
- [ ] Color: Orange (#f59e0b)

**Features:**
- [ ] Job cards display with:
  - [ ] Client name
  - [ ] Service type
  - [ ] Price
  - [ ] Location
  - [ ] Duration
  - [ ] Status badge
- [ ] Action buttons: "Accept Job", "Complete Job", "Message Client"
- [ ] Rating display visible

**Job Interaction:**
- [ ] Click "Accept Job" button (should show status change)
- [ ] "Message Client" should be clickable

**Messaging:**
- [ ] Navigate to Messages
- [ ] Should show any conversations with customers

---

### SCENARIO 6: Other Service Providers
**Test Each Provider Type:**

**Pet Care Provider:**
- [ ] Login: `petcare@test.com`
- [ ] Dashboard: petCareDashboard.html
- [ ] Features: Pet care specific

**Garden Maintenance:**
- [ ] Login: `garden@test.com`
- [ ] Dashboard: gardenDashboard.html

**House Cleaning:**
- [ ] Login: `cleaning@test.com`
- [ ] Dashboard: cleaningDashboard.html

**Verification for each:**
- [ ] Correct dashboard loads
- [ ] Messages link works
- [ ] Logout works
- [ ] Color coding consistent

---

### SCENARIO 7: Customer - Service Booking
**Role:** Customer  
**Expected:** Booking services and messaging providers

**Steps:**
1. Login as: `customer@test.com` / `123456`

**Confirmation:**
- [ ] Shows "Customer"
- [ ] Features: Book services, Communicate with providers, Leave reviews

**Dashboard:**
- [ ] URL: customerDashboard.html
- [ ] Color: Cyan/Teal
- [ ] Statistics: Upcoming bookings, Completed bookings, Unread messages

**Quick Actions:**
- [ ] "Book Service" button
- [ ] "My Bookings" button
- [ ] "Messages" button
- [ ] "My Profile" button

**Messaging:**
- [ ] Click "Messages" in sidebar
- [ ] Should see messages interface
- [ ] Try to send message:
  ```javascript
  // In console:
  const cust = auth.getUserByEmail('customer@test.com');
  const care = auth.getUserByEmail('caregiver@test.com');
  auth.sendMessage(cust.id, care.id, 'Need caregiver services');
  ```
- [ ] Message should appear in conversation list

---

### SCENARIO 8: Support Agent - Support Tickets
**Role:** Support Agent  
**Expected:** Support ticket and user management

**Steps:**
1. Login as: `support@test.com` / `123456`

**Dashboard:**
- [ ] URL: supportDashboard.html
- [ ] Statistics: Open Tickets, In Progress, Resolved, New Messages
- [ ] Sidebar shows: Dashboard, Support Tickets, Messages, Users

**Features:**
- [ ] Ticket management visible
- [ ] Messages link available
- [ ] User view accessible

---

### SCENARIO 9: Moderator - Content Moderation
**Role:** Moderator  
**Expected:** Content and user moderation

**Steps:**
1. Login as: `moderator@test.com` / `123456`

**Dashboard:**
- [ ] URL: moderatorDashboard.html
- [ ] Statistics: Pending Reports, Users to Review, Resolved, Banned
- [ ] Action buttons: Review, Review, View, View

**Features:**
- [ ] Report management interface
- [ ] User review capabilities
- [ ] Messages link
- [ ] Ban management options

---

## 🔄 Cross-Role Messaging Test

### Setup Multi-User Messaging

**Step 1: Create Conversations (Browser Console)**
```javascript
// Get users
const customer = auth.getUserByEmail('customer@test.com');
const caregiver = auth.getUserByEmail('caregiver@test.com');
const support = auth.getUserByEmail('support@test.com');

// Create conversations
auth.sendMessage(customer.id, caregiver.id, 'Hi, I need your caregiver services!');
auth.sendMessage(customer.id, support.id, 'I have a question about booking');
auth.sendMessage(caregiver.id, customer.id, 'I can help you. When do you need me?');
```

**Step 2: Login as Customer**
- [ ] Go to Messages
- [ ] Should see 2 conversations (caregiver, support)
- [ ] See message history with each

**Step 3: Send Reply as Customer**
- [ ] In caregiver conversation
- [ ] Type: "Next Tuesday afternoon would be great"
- [ ] Click Send
- [ ] Message appears in chat

**Step 4: Logout and Login as Caregiver**
- [ ] Click Logout
- [ ] Login as `caregiver@test.com`
- [ ] Go to Messages
- [ ] Should see conversation with customer
- [ ] See all message history
- [ ] See the "Next Tuesday" message

**Step 5: Caregiver Responds**
- [ ] Type: "Perfect! I'll send rate details"
- [ ] Click Send
- [ ] Message appears

**Step 6: Verify Both Sides of Conversation**
- [ ] Logout from Caregiver
- [ ] Login as Customer again
- [ ] Go to Messages
- [ ] See caregiver's response
- [ ] Conversation history intact

---

## 🔐 Permission & Access Control Tests

### Test 1: Unauthorized Dashboard Access

**Step 1: Login as Customer**
- [ ] Login: `customer@test.com`
- [ ] Note the dashboard URL
- [ ] Open dashboard, then manually navigate to unauthorized dashboard

**Step 2: Try to Access Super Admin Dashboard**
- In address bar, try: `/pages/superadminDashboard.html`
- [ ] Should redirect to login or show error
- [ ] NOT display admin content

**Step 3: Try to Access HR Dashboard**
- In address bar, try: `/pages/hrAdminDashboard.html`
- [ ] Should not display HR-specific content
- [ ] Should redirect appropriately

### Test 2: Verify Role Restrictions

**Steps:**
1. Open browser console
2. For each role, check:
   ```javascript
   // As logged-in user:
   const user = auth.getCurrentUser();
   const role = auth.getUserRole();
   
   // Check role
   console.log('Role:', role.name);
   console.log('Permissions:', role.permissions);
   
   // Test permission checks
   console.log('Can create booking:', auth.hasPermission(role, 'create_booking'));
   console.log('Can delete user:', auth.hasPermission(role, 'delete_user'));
   console.log('Can approve:', auth.hasPermission(role, 'approve_jobseekers'));
   ```

---

## 📊 Data Persistence Tests

### Test 1: Session Persistence

**Steps:**
1. Login as any user
2. Go to Messages page
3. Refresh page (F5)
- [ ] Still logged in
- [ ] Conversations still visible
- [ ] Can send messages

### Test 2: Cross-Tab Persistence

**Steps:**
1. Open 2 browser windows/tabs
2. In Tab 1: Login as Customer
3. Verify logged in
4. In Tab 2: Open same site (may show different user)
5. Messages should be accessible in both

### Test 3: Data Consistency

**Browser Console Check:**
```javascript
// Check data consistency
const users = JSON.parse(localStorage.getItem('hcs_users'));
const messages = JSON.parse(localStorage.getItem('hcs_messages'));
const bookings = JSON.parse(localStorage.getItem('hcs_bookings'));
const currentUser = JSON.parse(localStorage.getItem('hcs_current_user'));

console.log('Total users:', users.length);
console.log('Total conversations:', messages.length);
console.log('Total bookings:', bookings.length);
console.log('Current user:', currentUser?.email);
```

---

## 🎨 UI/UX Verification

### Visual Consistency

- [ ] All dashboards use same navbar layout
- [ ] Sidebar styling consistent across roles
- [ ] Color coding matches role
- [ ] Font sizes readable on mobile and desktop
- [ ] Responsive layout working

### Animation & Interactions

- [ ] Login success animation smooth
- [ ] Confirmation page countdown accurate
- [ ] Message sending animation
- [ ] Hover effects working
- [ ] Buttons respond to clicks

### Navigation

- [ ] Sidebar menu items clickable
- [ ] Back/logout navigation works
- [ ] Message link accessible from all dashboards
- [ ] Logo/home link working

---

## 🐛 Troubleshooting Tests

### If Login Fails

**Test:**
```javascript
// Check if demo accounts are initialized
const users = auth.getAllUsers();
console.log('Total users:', users.length);
console.log('Users:', users.map(u => u.email));

// Check if specific user exists
const customer = auth.getUserByEmail('customer@test.com');
console.log('Customer exists:', customer ? 'YES' : 'NO');

// Try to login manually
const result = auth.loginUser('customer@test.com', '123456');
console.log('Login result:', result);
```

### If Messages Don't Show

**Test:**
```javascript
// Check current user
const user = auth.getCurrentUser();
console.log('Current user:', user?.email);

// Check if user has conversations
const convs = auth.getUserConversations(user.id);
console.log('Conversations:', convs.length);

// Check message storage
const messages = JSON.parse(localStorage.getItem('hcs_messages'));
console.log('Message data:', messages);
```

### If Dashboard Doesn't Load

**Test:**
```javascript
// Check auth
const isLoggedIn = auth.isLoggedIn();
console.log('Logged in:', isLoggedIn);

// Check role
const role = auth.getUserRole();
console.log('Role:', role?.name);

// Try to initialize dashboard
dashboard.initializeDashboard();
```

---

## ✅ Final Verification Checklist

### Complete System Test

- [ ] All 11 demo accounts can login
- [ ] Each account goes to correct dashboard
- [ ] Confirmation page works for each role
- [ ] All dashboards display correctly
- [ ] Sidebar shows appropriate menu items
- [ ] Messages link works from all dashboards
- [ ] Can send/receive messages between roles
- [ ] Logout works properly
- [ ] Session persists across page reloads
- [ ] Unauthorized access prevented
- [ ] Color coding correct per role
- [ ] Responsive design working
- [ ] No JavaScript errors in console

### Performance Checks

- [ ] Pages load quickly
- [ ] All assets (CSS, fonts) loading
- [ ] No network errors
- [ ] Animations smooth
- [ ] localStorage operations fast
- [ ] No memory leaks (monitor in DevTools)

---

## 🎯 Success Criteria

### System is Ready When:

✅ **All 9+ Test Scenarios Pass**
- Each role can login and access correct dashboard
- Each dashboard displays proper content
- Messages work across roles
- Permissions enforced correctly

✅ **Data Persistence Works**
- Conversations saved and retrieved
- Session survives page reloads
- Multiple tabs can access same data

✅ **UI/UX Meets Standards**
- Professional appearance
- Responsive on mobile/desktop
- Smooth interactions
- Consistent branding

✅ **No Critical Errors**
- Console shows no errors
- All roles function without issues
- No security warnings

---

## 📝 Test Report Template

### Test Execution Date: ___________

### Scenarios Tested:
- [ ] Admin Overview
- [ ] Platform Admin
- [ ] HR Admin
- [ ] Operations Admin
- [ ] Service Providers (4 types)
- [ ] Customer
- [ ] Support Agent
- [ ] Moderator
- [ ] Cross-Role Messaging

### Results:
- Passed: _____ /9
- Failed: _____
- Issues: _____

### Critical Issues: none
- Issue 1: ________________
- Issue 2: ________________

### Minor Issues: none
- Issue 1: ________________
- Issue 2: ________________

### Overall Status: ✅ READY / ⚠️ NEEDS FIXES / ❌ NOT READY

### Sign-off: ___________________

---

## 🚀 Ready for Production/Demo

Once all tests pass, the system is ready for:
- ✅ Presentation/Demo purposes
- ✅ User acceptance testing
- ✅ Stakeholder review
- ✅ Documentation generation
- 🔄 Backend API development planning
