ReNew You Admin Workspace

Admin files are isolated from the public website under /admin/.

Main entry:
  /admin/index.html

Authentication pages:
  /admin/index.html              Staff sign-in / dashboard
  /admin/forgot-password.html    Password reset request
  /admin/reset-password.html     New password form

Admin assets:
  /admin/css/
  /admin/js/
  /admin/images/

Compatibility redirect files remain at the old root admin-*.html URLs so existing links and bookmarks continue to work.

Changes in this build:
- Public website navigation/styles no longer load into the admin workspace.
- Admin navigation is not rendered on the staff login, forgot-password, or reset-password views.
- Password visibility controls were added to staff sign-in and reset-password fields.
- Forgot-password is now a dedicated admin page.
- Mobile dashboard spacing was reduced and viewport height corrected to prevent excess top/bottom blank space.
- Mobile Sign Out moved into the admin sidebar; the header Sign Out is hidden on mobile.
- Shared admin navigation now routes dashboard sections through a dashboard event instead of leaving the content blank.
- Admin JavaScript was syntax checked and local HTML asset references were validated.
