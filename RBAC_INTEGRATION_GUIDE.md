# RBAC System Integration Guide

## System Overview

This document provides a complete guide to the implemented Role-Based Access Control (RBAC) system for the Home Care Service platform.

## Completed Implementation

### 1. **Core Authentication System** (`js/auth.js`)

The `AuthSystem` class provides:

- **11 Roles with Hierarchical Permissions:**
  - Super Admin (full access)
  - Platform Admin (user management)
  - HR Admin (provider verification)
  - Operations Admin (booking management)
  - Caregiver (service provider)
  - Pet Care Provider
  - Garden Maintenance Provider
  - House Cleaning Provider
  - Customer (service requestor)
  - Customer Support Agent
  - Moderator (content moderation)

- **Key Methods:**
  - `loginUser(email, password)` - Authenticate user and create session
  - `hasPermission(role, permission)` - Check user permissions
  - `hasRole(userId, roleId)` - Verify user role
  - `sendMessage(senderId, recipientId, content)` - Send messages between users
  - `getConversation(conversationId)` - Retrieve message thread
  - `getUserConversations(userId)` - Get all user conversations
  - `createBooking(...)` - Create service booking
  - `updateBooking(bookingId, updates)` - Update booking status

- **Demo Accounts:**
  ```
  Email Format: [role]@test.com
  Password: 123456
  
  Accounts:
  - superadmin@test.com
  - platform@test.com
  - hr@test.com
  - operations@test.com
  - caregiver@test.com
  - petcare@test.com
  - garden@test.com
  - cleaning@test.com
  - customer@test.com
  - support@test.com
  - moderator@test.com
  ```

### 2. **Dashboard Routing System** (`js/dashboard.js`)

The `DashboardManager` class provides:

- **initializeDashboard()** - Set up role-specific dashboard UI
- **getMenuForRole(role)** - Return sidebar menu for specific role
- **updateHeader(user, role)** - Update user info display
- **applyPermissions(role)** - Enforce permission-based visibility
- **checkAccess(requiredRole)** - Verify user has required role

### 3. **Role-Specific Dashboards**

All 11 dashboards created with role-appropriate UI and functionality:

| Role | Dashboard File | Key Features |
|------|-----------------|--------------|
| Super Admin | `pages/superadminDashboard.html` | System overview, user management, analytics, settings |
| Platform Admin | `pages/platformAdminDashboard.html` | User statistics, customer/provider/support breakdown |
| HR Admin | `pages/hrAdminDashboard.html` | Provider applications, verification workflow |
| Operations Admin | `pages/operationsAdminDashboard.html` | Booking management, service assignment |
| Caregiver | `pages/caregiverDashboard.html` | Available jobs, active jobs, earnings, client details |
| Pet Care | `pages/petCareDashboard.html` | Pet care job listing and management |
| Garden | `pages/gardenDashboard.html` | Garden maintenance job listing and management |
| Cleaning | `pages/cleaningDashboard.html` | House cleaning job listing and management |
| Customer | `pages/customerDashboard.html` | Book services, view bookings, messaging |
| Support | `pages/supportDashboard.html` | Support tickets, new messages, user reports |
| Moderator | `pages/moderatorDashboard.html` | Content reports, user moderation, ban management |

### 4. **Messaging System** (`pages/messaging.html`)

Full-featured messaging interface:

- **Conversation List** - Shows all user conversations with unread counts
- **Real-time Chat** - Send and receive messages with timestamps
- **User Avatars** - Display conversation participants
- **Message Status** - Sent/received visual distinction
- **Auto-scroll** - Scroll to latest messages automatically

### 5. **Authentication Confirmation** (`pages/authConfirmation.html`)

Post-login confirmation screen:

- Displays login success with animations
- Shows user info and role
- Lists role-specific features
- Auto-redirects after 5 seconds to role-specific dashboard
- User can also click "Go to Dashboard" button

## Testing Workflow

### Login Flow

1. **Access Login Page** → `pages/userLogin.html`
2. **Enter Demo Credentials**
   ```
   Email: [role]@test.com
   Password: 123456
   ```
3. **View Confirmation Page** → Auto-shows `pages/authConfirmation.html`
4. **Auto-redirect to Dashboard** → After 5 seconds

### Verify Each Role Dashboard

**Test Sequence for each role:**

1. Navigate to respective dashboard (e.g., `/pages/superadminDashboard.html`)
2. Verify sidebar menu shows role-specific items
3. Check that statistics display (use localStorage values)
4. Test "Messages" link in sidebar → Should load `/pages/messaging.html`
5. Verify logout button returns to login

### Test Messaging

1. **Create a message** (browser console):
   ```javascript
   auth.sendMessage('user-1-id', 'user-2-id', 'Hello!');
   ```

2. **View conversations** (browser console):
   ```javascript
   auth.getUserConversations(auth.getCurrentUser().id);
   ```

3. **Send message from UI**:
   - Navigate to Messages page
   - Click on a conversation
   - Type message and press Send
   - Verify message appears in conversation

### Test Permissions

1. **Check permission for action** (browser console):
   ```javascript
   auth.hasPermission(auth.getUserRole(), 'create_booking');
   ```

2. **Try unauthorized access**:
   - Login as Customer
   - Try accessing `/pages/superadminDashboard.html`
   - Should be redirected to login or dashboard

## Data Storage

### localStorage Keys

- **hcs_users** - All registered users with roles and profiles
- **hcs_messages** - All message conversations and threads
- **hcs_bookings** - All service bookings (status, client, provider)
- **hcs_current_user** - Currently logged-in user session

### Data Structures

**User Object:**
```javascript
{
  id: "unique-id",
  email: "user@test.com",
  password: "hashed",
  firstName: "John",
  lastName: "Doe",
  role: { id: "caregiver", name: "Caregiver", color: "#10b981" },
  status: "active",
  profile: { bio: "", phone: "", address: "" },
  createdAt: "2024-01-01T00:00:00Z"
}
```

**Message Object:**
```javascript
{
  id: "msg-id",
  conversationId: "conv-id",
  senderId: "sender-id",
  recipientId: "recipient-id",
  content: "Message text",
  timestamp: "2024-01-01T12:00:00Z",
  read: false
}
```

**Booking Object:**
```javascript
{
  id: "booking-id",
  customerId: "customer-id",
  providerId: "provider-id",
  service: "caregiver",
  startDate: "2024-01-15",
  endDate: "2024-01-15",
  status: "pending",
  amount: 150,
  location: "123 Main St"
}
```

## Common Tasks

### Create a New User (Browser Console)

```javascript
auth.registerUser({
  email: 'newuser@test.com',
  password: '123456',
  firstName: 'New',
  lastName: 'User',
  roleId: 'customer'
});
```

### Start a Conversation

```javascript
const userId1 = auth.getCurrentUser().id;
const userId2 = auth.getUsersByRole('caregiver')[0].id;

auth.sendMessage(userId1, userId2, 'Hi, I need your services!');
```

### Create a Booking

```javascript
auth.createBooking({
  customerId: 'customer-id',
  providerId: 'provider-id',
  service: 'caregiver',
  startDate: '2024-01-15',
  endDate: '2024-01-15',
  location: '123 Main St'
});
```

### Check Current User Info

```javascript
const user = auth.getCurrentUser();
const role = auth.getUserRole();
console.log(`${user.firstName} is a ${role.name}`);
```

## Architecture Decisions

### Why localStorage?

- **Frontend-only implementation** - No backend required for demo
- **Real-time data access** - No network latency
- **Persistent sessions** - Data survives page reloads (within same browser)
- **Easy testing** - Can inspect data in DevTools

### Why Class-based Structure?

- **Encapsulation** - Related methods grouped together
- **Reusability** - Import and use across all pages
- **Maintainability** - Easy to add new features or modify logic
- **Scalability** - Can later migrate to proper backend API

### Role Hierarchy Design

- **Super Admin** → Full system access with wildcard permission '*'
- **Admin Roles** → Specific administrative permissions (user management, booking control)
- **Provider Roles** → Service-specific features (job management, messaging)
- **Customer Role** → Limited to booking and messaging
- **Support Roles** → Focused on user support and moderation

## Frontend-Only Considerations

### Security Notes

⚠️ **Important:** This is a frontend-only implementation suitable for **demo/presentation only**.

For production use:

1. **Move auth to backend** - Never store passwords in localStorage
2. **Implement JWT tokens** - Use secure, httpOnly cookies
3. **Validate permissions server-side** - Client-side checks can be bypassed
4. **Hash passwords** - Use bcrypt or similar
5. **Add HTTPS** - All communication must be encrypted
6. **Implement proper session management** - Add expiration and refresh tokens

### Current Limitations

- Permissions enforced only on UI (client-side)
- Demo accounts visible in code
- No password encryption
- No session expiration
- No API rate limiting
- All data visible in localStorage

## Customization Guide

### Add a New Role

1. **Update `auth.js` ROLES object:**
   ```javascript
   new_role: {
     id: 'new_role',
     name: 'New Role',
     displayName: 'New Role',
     color: '#3b82f6',
     permissions: ['perm1', 'perm2']
   }
   ```

2. **Add to dashboard menu** in `dashboard.js`:
   ```javascript
   new_role: [
     { label: 'Dashboard', href: '/dashboard/newrole', icon: chartIcon },
     { label: 'Features', href: '/dashboard/newrole/features', icon: featureIcon }
   ]
   ```

3. **Create dashboard page:** `pages/newroleDashboard.html`

4. **Add demo account** in auth initialization:
   ```javascript
   this.registerUser({
     email: 'newrole@test.com',
     password: '123456',
     firstName: 'New',
     lastName: 'Role',
     roleId: 'new_role'
   });
   ```

### Modify Permissions

Edit the `permissions` array in the ROLES object in `auth.js`:

```javascript
customer: {
  // ...
  permissions: [
    'view_bookings',
    'create_booking',
    'cancel_booking',
    'send_message',
    'view_profile'
  ]
}
```

### Update Login Flow

Modify `pages/userLogin.html` and `js/userLogin.js`:

1. After successful login, redirect to:
   ```javascript
   window.location.href = '../pages/authConfirmation.html';
   ```

2. `authConfirmation.html` will:
   - Display confirmation
   - Auto-redirect to role-specific dashboard

## Troubleshooting

### User Can't Login

1. Check console for errors (F12 → Console)
2. Verify email/password match demo accounts
3. Clear localStorage: `localStorage.clear()` and reload
4. Verify auth.js is loaded before login attempt

### Sidebar Menu Not Showing

1. Verify user is logged in: `auth.getCurrentUser()`
2. Check browser console for JavaScript errors
3. Verify dashboard.js is loaded on page
4. Make sure `initializeDashboard()` is called

### Messages Not Sending

1. Verify both users exist in hcs_users
2. Check that sending user ID is valid
3. Look at console for errors
4. Verify messaging UI is loading properly

### Permission Denied Errors

1. Check user role: `auth.getUserRole()`
2. Verify role has required permission: `auth.hasPermission(role, 'permission_name')`
3. Check that role is correctly assigned in user object

## Next Steps

### For Production Implementation

1. **Backend API Development**
   - User authentication with JWT
   - Role-based authorization middleware
   - Database schema for users, roles, messages, bookings
   - API endpoints for all operations

2. **Database Design**
   - Users table with encrypted passwords
   - Roles and permissions tables
   - Messages table with proper indexing
   - Bookings table with status tracking

3. **Security Enhancements**
   - CSRF protection
   - SQL injection prevention
   - XSS protection
   - Rate limiting
   - HTTPS enforcement

4. **Scaling Considerations**
   - Caching layer (Redis)
   - Database replication
   - Load balancing
   - CDN for static assets
   - API rate limiting

## Files Reference

### Core Files
- `js/auth.js` - Authentication and RBAC logic
- `js/dashboard.js` - Dashboard routing and UI management
- `pages/userLogin.html` - Login interface

### Confirmation Flow
- `pages/authConfirmation.html` - Post-login confirmation

### Role Dashboards
- `pages/superadminDashboard.html` - Super Admin dashboard
- `pages/platformAdminDashboard.html` - Platform Admin dashboard
- `pages/hrAdminDashboard.html` - HR Admin dashboard
- `pages/operationsAdminDashboard.html` - Operations Admin dashboard
- `pages/caregiverDashboard.html` - Caregiver dashboard
- `pages/petCareDashboard.html` - Pet Care Provider dashboard
- `pages/gardenDashboard.html` - Garden Maintenance dashboard
- `pages/cleaningDashboard.html` - House Cleaning dashboard
- `pages/customerDashboard.html` - Customer dashboard
- `pages/supportDashboard.html` - Support Agent dashboard
- `pages/moderatorDashboard.html` - Moderator dashboard

### Messaging
- `pages/messaging.html` - Full messaging interface

### Styling
- `styles/dashboard.css` - Main dashboard styles
- Individual role CSS files in `styles/` directory

## Support

For issues or questions:
1. Check browser console (F12)
2. Review this guide
3. Check localStorage data: `localStorage.hcs_users`
4. Trace through auth.js logic with console.log statements
