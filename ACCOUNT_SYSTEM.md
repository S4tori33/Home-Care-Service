# Account System Implementation - Home Care Service

## Overview
A complete role-based account system has been implemented for the HCS website with two account types: **Customer** and **Job Seeker**.

## System Components

### 1. Authentication Module (`js/auth.js`)
Core authentication system that manages:
- User registration with role selection (Customer or Job Seeker)
- User login and session management
- LocalStorage-based account persistence
- User profile updates
- Authentication state checking

**Key Methods:**
- `auth.registerUser(userData)` - Create new account
- `auth.loginUser(email, password)` - Login user
- `auth.getCurrentUser()` - Get logged-in user info
- `auth.isLoggedIn()` - Check authentication status
- `auth.getUserRole()` - Get user's role
- `auth.logout()` - Logout user

### 2. Login System (`pages/userLogin.html` + `js/userLogin.js`)
**Sign Up Form Updates:**
- Added "Account Type" dropdown field
- Options: "Customer (Book Services)" or "Job Seeker (Find Work)"
- Full validation and error handling

**Login Logic:**
- Routes users to appropriate dashboard based on role:
  - Admin → `adminDashboard.html`
  - Customer → `dashboard.html?role=customer`
  - Job Seeker → `dashboard.html?role=jobseeker`

### 3. Dashboard System (`pages/dashboard.html` + `js/dashboard.js`)
**Role-Based Content Display:**
- Automatic role detection on page load
- Shows user role in sidebar (Customer or Job Seeker)
- Uses `data-role` attributes to show/hide content
- Automatic logout on session expiration

**User Profile Display:**
- Shows user's first and last name
- Displays role (Customer/Job Seeker)
- User initials in avatar

## How to Use

### For End Users:

**1. Create Account:**
1. Go to Login page
2. Click "Sign Up" tab
3. Fill in all required fields
4. **Select Account Type** (most important!):
   - Choose "Customer" if they want to book home care services
   - Choose "Job Seeker" if they want to find job opportunities
5. Click "Sign Up"

**2. Login:**
1. Click "Log In" tab
2. Enter email and password
3. Click "Log In"
4. Redirected to appropriate dashboard based on role

**3. Default Admin Account:**
- Email: `admin@hcs.com`
- Password: `Admin123`
- Role: Admin (redirects to Admin Dashboard)

### For Developers:

**Adding Role-Specific Content in Dashboard:**
```html
<!-- Customer-only content -->
<div data-role="customer-only">
    Content visible only to customers
</div>

<!-- Job Seeker-only content -->
<div data-role="jobseeker-only">
    Content visible only to job seekers
</div>
```

**Check User Role in JavaScript:**
```javascript
const user = auth.getCurrentUser();
if (auth.hasRole('customer')) {
    // Customer-specific logic
}
```

**Get User Information:**
```javascript
const user = auth.getCurrentUser();
console.log(user.firstName, user.role, user.email);
```

## Account Storage
- Accounts stored in browser's LocalStorage
- Persists until user clears browser data
- Format: `hcs_users` (JSON array)
- Current user session: `hcs_current_user`

## Features Implemented

✅ User registration with role selection
✅ Email validation (duplicate checking)
✅ Password validation (min 6 characters)
✅ Login authentication
✅ Role-based dashboard routing
✅ Session management
✅ Logout functionality
✅ User profile display
✅ LocalStorage persistence
✅ Admin account initialization

## Testing Scenarios

**Scenario 1 - Customer Signup & Login:**
1. Sign up with role "Customer"
2. Login with those credentials
3. Should redirect to customer dashboard

**Scenario 2 - Job Seeker Signup & Login:**
1. Sign up with role "Job Seeker"
2. Login with those credentials
3. Should redirect to job seeker dashboard

**Scenario 3 - Admin Login:**
1. Login with admin@hcs.com / Admin123
2. Should redirect to Admin Dashboard

**Scenario 4 - Invalid Credentials:**
1. Try login with non-existent email
2. Try login with wrong password
3. Should show error messages

## Future Enhancements

- [ ] Backend integration with database
- [ ] Password hashing (never store plain text)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Role-specific dashboard customization
- [ ] User profile picture upload
- [ ] More role types (Staff, Manager, etc.)

## File Structure

```
js/
  ├── auth.js              (NEW - Authentication system)
  ├── userLogin.js         (UPDATED - Role-based login)
  └── dashboard.js         (NEW - Dashboard initialization)

pages/
  ├── userLogin.html       (UPDATED - Added role selection)
  ├── dashboard.html       (UPDATED - Role-based display)
  └── adminDashboard.html  (UPDATED - Added auth support)
```

---
Account System Version 1.0 - Ready for use and customization
