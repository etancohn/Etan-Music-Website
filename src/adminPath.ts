// The content-editor URL. Not linked anywhere on the public site. The path is
// deliberately simple — the real protection is Firebase Auth + security rules
// (allowlisted editors only), so a guessable path just lands visitors on a
// sign-in wall. Swap in something obscure later if that ever feels warranted.
export const ADMIN_PATH = '/dashboard';
