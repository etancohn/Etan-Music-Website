// The hidden content-editor URL. Not linked anywhere on the site and kept
// unguessable on purpose — share it only with people who should edit content.
// (The real protection is Firebase Auth + security rules; the obscure path
// just keeps the editor out of casual sight.)
export const ADMIN_PATH = '/dashboard';
