# ReNew You Supabase Auth configuration

Project: `eybsgwzpisgswmxcwjel`

## URL Configuration

Set **Site URL** to:

`https://renewyouhealthwellness.com`

Add these **Redirect URLs**:

- `https://renewyouhealthwellness.com/admin-reset-password.html`
- `https://www.renewyouhealthwellness.com/admin-reset-password.html`
- `https://renewyouhealthwellness.com/admin-dashboard.html`
- `https://www.renewyouhealthwellness.com/admin-dashboard.html`

The website's password-recovery code sends users to `admin-reset-password.html`.

## Custom SMTP / branded Auth mail

Use the verified ReNew You sender domain with Resend. In Supabase Auth SMTP settings use the Resend SMTP credentials for the ReNew You account/domain. Recommended sender:

- Sender name: `ReNew You Health & Wellness`
- Sender email: `no-reply@renewyouhealthwellness.com`

Paste the matching HTML files in `supabase/auth-email-templates/` into the hosted project's Auth Email Templates screens.

Suggested subjects:

- Confirm signup: `Confirm your ReNew You account`
- Invite user: `You're invited to ReNew You Health & Wellness`
- Reset password: `Reset your ReNew You password`
- Magic link: `Your ReNew You secure sign-in link`
- Change email: `Confirm your new ReNew You email address`
- Reauthentication: `Your ReNew You verification code`

## Admin account

The old filings4u Auth user is not automatically portable because password hashes and Auth identities must not be copied manually. Create/invite the ReNew You staff administrator in the new project's Auth Users screen, then use the branded password recovery flow if needed.

## Security notification templates

For production parity, also enable and brand these Auth security notifications:

- Password changed → `password_changed_notification.html`
- Email address changed → `email_changed_notification.html`
- Phone number changed → `phone_changed_notification.html`
- MFA factor added → `mfa_factor_enrolled_notification.html`
- MFA factor removed → `mfa_factor_unenrolled_notification.html`
- Identity linked → `identity_linked_notification.html`
- Identity unlinked → `identity_unlinked_notification.html`

The `welcome.html` file is a separate branded post-activation welcome message. Supabase Auth does not expose a dedicated built-in "welcome" template; use the invite/confirmation message as the activation email and send `welcome.html` separately after activation if desired.

## SMTP verification status

On 2026-09-24 the hosted Auth service reloaded its email limiter from the built-in SMTP limit of 2/hour to the custom-SMTP limit of 30/hour. This confirms that custom SMTP is enabled at the Supabase Auth layer. A real delivery test still requires at least one Auth user/invite target.

Important: the website Edge Functions (`send-wellness-offer`, `submit-contact-inquiry`, and `submit-dot-appointment`) send directly through the Resend HTTP API and therefore still require a `RESEND_API_KEY` Edge Function secret. Supabase Auth SMTP credentials do not automatically populate that Edge Function secret.
