# User Management Test Plan

## Application Overview

Test plan for the User Management CRUD application built with SvelteKit and DDD architecture. The application provides a complete user management system with SQLite storage, allowing users to create, read, update, and delete user records.

## Test Scenarios

### 1. Navigation and UI

**Seed:** `e2e/seed.spec.ts`

#### 1.1. Home page displays correctly

**File:** `e2e/navigation/home-page.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173
  2. Verify the page loads successfully
  3. Check that the heading 'Welcome to SvelteKit' is visible
  4. Verify the description text is present
  5. Verify the 'Manage Users' link is visible and clickable

**Expected Results:**
  - Page URL should be http://localhost:4173/
  - Main heading should display 'Welcome to SvelteKit'
  - Description should mention 'DDD architecture'
  - Four bullet points should list: DDD architecture, SQLite database, SvelteKit API routes, and shadcn-ui-svelte components
  - 'Manage Users' button should be visible and functional

#### 1.2. Navigation between pages works correctly

**File:** `e2e/navigation/page-navigation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173
  2. Click on the 'Manage Users' link
  3. Verify navigation to /users page
  4. Click on the 'Home' navigation link
  5. Verify navigation back to home page
  6. Click on the 'SvelteKit Demo' logo
  7. Verify navigation to home page

**Expected Results:**
  - Clicking 'Manage Users' should navigate to http://localhost:4173/users
  - Users page should display with table and 'Add User' button
  - Clicking 'Home' should navigate back to http://localhost:4173/
  - Home page should display welcome message
  - Logo should always navigate to home page from any location

#### 1.3. Users page displays correctly

**File:** `e2e/navigation/users-page.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Verify the page heading is 'Users'
  3. Check that the description 'Manage your users here' is visible
  4. Verify the 'Add User' button is present
  5. Check that the users table is displayed
  6. Verify table headers: Name, Email, Created, Actions

**Expected Results:**
  - Page URL should be http://localhost:4173/users
  - Heading should display 'Users'
  - Description text should be visible
  - 'Add User' button should be present and clickable
  - Table should be visible with proper column headers
  - If users exist, they should be displayed in table rows

### 2. Create User Functionality

**Seed:** `e2e/seed.spec.ts`

#### 2.1. Create user with valid data

**File:** `e2e/create-user/create-valid-user.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Add User' button
  3. Verify the 'Create User' dialog opens
  4. Fill in Name field with 'Ana García'
  5. Fill in Email field with 'ana.garcia@example.com'
  6. Click 'Create User' button
  7. Wait for the dialog to close
  8. Verify success notification appears

**Expected Results:**
  - Dialog should open with heading 'Create User'
  - Dialog should contain Name and Email fields with placeholders
  - Fields should accept text input
  - After submission, dialog should close automatically
  - Success notification 'User created successfully' should appear
  - New user should appear in the users table
  - New user row should show correct name, email, and creation date (today's date)

#### 2.2. Create user dialog can be closed without saving

**File:** `e2e/create-user/cancel-create-user.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Note the current number of users in the table
  3. Click the 'Add User' button
  4. Fill in Name field with 'Test Cancel'
  5. Fill in Email field with 'cancel@example.com'
  6. Click the 'Close' button (X icon)
  7. Verify the dialog closes

**Expected Results:**
  - Dialog should close without creating a user
  - Number of users in table should remain unchanged
  - No success notification should appear
  - Table should show the same users as before

#### 2.3. Create user dialog closes with Escape key

**File:** `e2e/create-user/escape-create-dialog.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Add User' button
  3. Fill in Name field with 'Test Escape'
  4. Press the Escape key
  5. Verify the dialog closes

**Expected Results:**
  - Dialog should close when Escape is pressed
  - No user should be created
  - Table should remain unchanged

#### 2.4. Cannot create user with empty fields

**File:** `e2e/create-user/empty-fields-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Add User' button
  3. Leave Name field empty
  4. Leave Email field empty
  5. Click 'Create User' button
  6. Verify validation prevents submission

**Expected Results:**
  - Dialog should remain open
  - No user should be created
  - No success notification should appear
  - Form should indicate required fields (browser validation or custom validation)

#### 2.5. Cannot create user with invalid email format

**File:** `e2e/create-user/invalid-email-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Add User' button
  3. Fill in Name field with 'Invalid Email User'
  4. Fill in Email field with 'not-a-valid-email'
  5. Click 'Create User' button
  6. Verify validation prevents submission

**Expected Results:**
  - Dialog should remain open or show error message
  - No user should be created with invalid email
  - Email field should indicate invalid format
  - Table should not show the new user

#### 2.6. Create user with only name filled

**File:** `e2e/create-user/missing-email-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Add User' button
  3. Fill in Name field with 'No Email User'
  4. Leave Email field empty
  5. Click 'Create User' button

**Expected Results:**
  - Dialog should remain open
  - Email field should show required validation
  - No user should be created
  - Table should remain unchanged

#### 2.7. Create user with only email filled

**File:** `e2e/create-user/missing-name-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Add User' button
  3. Leave Name field empty
  4. Fill in Email field with 'noname@example.com'
  5. Click 'Create User' button

**Expected Results:**
  - Dialog should remain open
  - Name field should show required validation
  - No user should be created
  - Table should remain unchanged

### 3. Read/View User Functionality

**Seed:** `e2e/seed.spec.ts`

#### 3.1. View list of users in table

**File:** `e2e/read-user/view-users-list.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Verify the users table is visible
  3. Check that table has headers: Name, Email, Created, Actions
  4. Verify existing users are displayed in table rows
  5. Check that each user row shows name, email, creation date, and action buttons

**Expected Results:**
  - Table should be visible with proper structure
  - All table headers should be present
  - Each user row should display complete information
  - Action buttons (Edit, Delete) should be visible for each user
  - Creation dates should be formatted correctly (e.g., 'Dec 3, 2025')

#### 3.2. Empty state when no users exist

**File:** `e2e/read-user/empty-state.spec.ts`

**Steps:**
  1. Ensure database has no users (delete all existing users)
  2. Navigate to http://localhost:4173/users
  3. Verify the table structure is still visible
  4. Check for empty state or message

**Expected Results:**
  - Table headers should still be visible
  - Table body should be empty or show an appropriate message
  - 'Add User' button should still be functional
  - No error should be displayed

### 4. Update User Functionality

**Seed:** `e2e/seed.spec.ts`

#### 4.1. Edit user with valid data

**File:** `e2e/update-user/edit-user-successfully.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Create a new user 'Original Name' with email 'original@example.com'
  3. Click the 'Edit' button for the newly created user
  4. Verify the 'Edit User' dialog opens
  5. Verify Name field is pre-filled with 'Original Name'
  6. Verify Email field is pre-filled with 'original@example.com'
  7. Change Name to 'Updated Name'
  8. Change Email to 'updated@example.com'
  9. Click 'Save Changes' button
  10. Wait for the dialog to close

**Expected Results:**
  - Edit dialog should open with pre-filled data
  - Fields should show current user information
  - After submission, dialog should close
  - Success notification 'User updated successfully' should appear
  - User row in table should reflect updated name and email
  - Creation date should remain unchanged
  - Only one user row should exist for this user (no duplication)

#### 4.2. Edit user dialog can be closed without saving

**File:** `e2e/update-user/cancel-edit-user.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Edit' button for an existing user
  3. Note the current user data
  4. Modify the Name field
  5. Modify the Email field
  6. Click the 'Close' button (X icon)
  7. Verify the dialog closes

**Expected Results:**
  - Dialog should close without saving changes
  - User data in table should remain unchanged
  - No success notification should appear
  - Original user information should still be displayed

#### 4.3. Edit user with only name change

**File:** `e2e/update-user/edit-only-name.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Edit' button for an existing user
  3. Note the current email
  4. Change only the Name field to 'New Name Only'
  5. Leave Email field unchanged
  6. Click 'Save Changes' button

**Expected Results:**
  - Dialog should close after saving
  - User name should be updated to 'New Name Only'
  - Email should remain the same as before
  - Success notification should appear
  - Table should reflect the name change

#### 4.4. Edit user with only email change

**File:** `e2e/update-user/edit-only-email.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Edit' button for an existing user
  3. Note the current name
  4. Leave Name field unchanged
  5. Change Email field to 'newemail@example.com'
  6. Click 'Save Changes' button

**Expected Results:**
  - Dialog should close after saving
  - User email should be updated to 'newemail@example.com'
  - Name should remain the same as before
  - Success notification should appear
  - Table should reflect the email change

#### 4.5. Cannot update user with empty name

**File:** `e2e/update-user/empty-name-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Edit' button for an existing user
  3. Clear the Name field completely
  4. Click 'Save Changes' button

**Expected Results:**
  - Dialog should remain open or show validation error
  - Name field should indicate required validation
  - User data should not be updated
  - No success notification should appear

#### 4.6. Cannot update user with empty email

**File:** `e2e/update-user/empty-email-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Edit' button for an existing user
  3. Clear the Email field completely
  4. Click 'Save Changes' button

**Expected Results:**
  - Dialog should remain open or show validation error
  - Email field should indicate required validation
  - User data should not be updated
  - No success notification should appear

#### 4.7. Cannot update user with invalid email format

**File:** `e2e/update-user/invalid-email-edit-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click the 'Edit' button for an existing user
  3. Change Email field to 'invalid-email-format'
  4. Click 'Save Changes' button

**Expected Results:**
  - Dialog should remain open or show validation error
  - Email field should indicate invalid format
  - User data should not be updated with invalid email
  - No success notification should appear

### 5. Delete User Functionality

**Seed:** `e2e/seed.spec.ts`

#### 5.1. Delete user with confirmation

**File:** `e2e/delete-user/delete-user-confirmed.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Create a new user 'To Be Deleted' with email 'delete@example.com'
  3. Note the total number of users
  4. Click the 'Delete' button for the newly created user
  5. Verify the confirmation dialog appears
  6. Verify the dialog shows user name 'To Be Deleted'
  7. Verify warning message about permanent deletion
  8. Click 'Delete' button in the confirmation dialog
  9. Wait for the dialog to close

**Expected Results:**
  - Confirmation dialog should appear with heading 'Are you sure?'
  - Dialog should display the user's name being deleted
  - Warning message should mention 'This action cannot be undone'
  - After confirmation, dialog should close
  - Success notification 'User deleted successfully' should appear
  - User should be removed from the table
  - Total number of users should decrease by 1

#### 5.2. Cancel delete operation

**File:** `e2e/delete-user/cancel-delete-user.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Note the total number of users
  3. Click the 'Delete' button for any existing user
  4. Verify the confirmation dialog appears
  5. Click 'Cancel' button in the confirmation dialog
  6. Verify the dialog closes

**Expected Results:**
  - Confirmation dialog should close
  - User should remain in the table
  - No success notification should appear
  - Total number of users should remain unchanged
  - All user data should be intact

#### 5.3. Delete multiple users sequentially

**File:** `e2e/delete-user/delete-multiple-users.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Create three new users: 'User 1', 'User 2', 'User 3'
  3. Note the initial user count
  4. Delete 'User 1' and confirm
  5. Wait for success notification
  6. Delete 'User 2' and confirm
  7. Wait for success notification
  8. Delete 'User 3' and confirm
  9. Wait for success notification

**Expected Results:**
  - Each delete operation should show confirmation dialog
  - Each confirmation should remove the respective user
  - Three success notifications should appear in sequence
  - Final user count should be 3 less than initial count
  - Table should update correctly after each deletion

### 6. User Interface and Accessibility

**Seed:** `e2e/seed.spec.ts`

#### 6.1. Success notifications appear and are dismissible

**File:** `e2e/ui/notifications-behavior.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Create a new user
  3. Verify success notification appears
  4. Wait to see if notification auto-dismisses
  5. Edit the user
  6. Verify update notification appears
  7. Delete the user
  8. Verify delete notification appears

**Expected Results:**
  - Each action should show appropriate success notification
  - Notifications should appear in the notifications region
  - Notifications should have appropriate icons
  - Notifications should be readable and clear
  - Multiple notifications should be handled properly

#### 6.2. Dialog focus management

**File:** `e2e/ui/dialog-focus.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click 'Add User' button
  3. Verify Name field receives focus automatically
  4. Press Tab key
  5. Verify focus moves to Email field
  6. Press Tab key
  7. Verify focus moves to 'Create User' button

**Expected Results:**
  - First input should be focused when dialog opens
  - Tab navigation should work correctly through form fields
  - Focus should be trapped within the dialog
  - Escape key should close the dialog

#### 6.3. Table displays correctly with many users

**File:** `e2e/ui/table-with-many-users.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Create 10 users with different names and emails
  3. Verify all users are displayed in the table
  4. Check table layout and readability
  5. Verify action buttons are accessible for each user

**Expected Results:**
  - Table should display all users without layout issues
  - Each row should be distinguishable
  - Action buttons should remain accessible and clickable
  - Table should be scrollable if needed
  - No UI overlap or collision

### 7. End-to-End User Workflows

**Seed:** `e2e/seed.spec.ts`

#### 7.1. Complete user lifecycle

**File:** `e2e/workflows/complete-user-lifecycle.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173
  2. Click 'Manage Users' link from home page
  3. Verify users page loads
  4. Create a new user 'Maria Lopez' with email 'maria.lopez@example.com'
  5. Verify user appears in table
  6. Edit the user to change name to 'Maria L. Rodriguez'
  7. Verify the update is reflected in the table
  8. Delete the user
  9. Verify the user is removed from the table
  10. Navigate back to home page

**Expected Results:**
  - Complete workflow should execute without errors
  - Each step should provide appropriate feedback
  - User should be created, updated, and deleted successfully
  - Navigation should work smoothly throughout
  - All notifications should appear at appropriate times

#### 7.2. Create and manage multiple users

**File:** `e2e/workflows/manage-multiple-users.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Create user 'Alice Brown' with 'alice@example.com'
  3. Create user 'Bob Smith' with 'bob@example.com'
  4. Create user 'Charlie Davis' with 'charlie@example.com'
  5. Verify all three users appear in the table
  6. Edit 'Alice Brown' to 'Alice B. Brown'
  7. Delete 'Bob Smith'
  8. Verify final state shows 'Alice B. Brown' and 'Charlie Davis'

**Expected Results:**
  - All users should be created successfully
  - Table should show all users with correct information
  - Edit operation should only affect intended user
  - Delete operation should only remove intended user
  - Remaining users should be unaffected by operations on other users

#### 7.3. Error recovery workflow

**File:** `e2e/workflows/error-recovery.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4173/users
  2. Click 'Add User' button
  3. Try to create user with invalid email
  4. Verify validation prevents creation
  5. Correct the email to valid format
  6. Successfully create the user
  7. Verify user is created after correction

**Expected Results:**
  - Invalid data should be rejected with clear feedback
  - User should be able to correct errors without losing other input
  - Valid data should be accepted after correction
  - User should appear in table after successful creation
