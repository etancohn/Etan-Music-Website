import { ReactNode, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    User,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { app } from '../firebase';
import { BG, Btn, FAINT, MUTED, PANEL_FONT, RED, TEXT } from './fields';

// Emails allowed to edit content. Keep in sync with the allowlists in
// firestore.rules and storage.rules — this check is only UX (a friendly
// message instead of a permission error); the rules are the enforcement.
export const EDITOR_EMAILS = ['etan.cohn@gmail.com', 'cohnetan@gmail.com'];

export const auth = getAuth(app);

const isEditor = (user: User | null) =>
    !!user?.email && EDITOR_EMAILS.includes(user.email);

function Screen({ children }: { children: ReactNode }) {
    return (
        <div style={{ minHeight: '100vh', background: BG, color: TEXT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: PANEL_FONT }}>
            <div style={{ textAlign: 'center', padding: 24, maxWidth: 420 }}>{children}</div>
        </div>
    );
}

// Wraps the admin panel: renders a Google sign-in screen until an allowlisted
// account is signed in. Write access is enforced again by the security rules,
// so this gate failing open would still not expose anything.
export default function AuthGate({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => onAuthStateChanged(auth, (u) => {
        setUser(u);
        setChecked(true);
    }), []);

    const signIn = async () => {
        setError(null);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (err) {
            console.error(err);
            setError('Sign-in didn’t complete — try again.');
        }
    };

    if (!checked) {
        return <Screen><span style={{ color: MUTED, fontSize: 14, letterSpacing: '.08em' }}>Checking who you are…</span></Screen>;
    }

    if (!user || !isEditor(user)) {
        return (
            <Screen>
                <h1 style={{ fontSize: 26, fontWeight: 600, margin: '0 0 10px' }}>Site editor</h1>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
                    {user
                        ? `${user.email} doesn’t have access to edit this site. Sign in with the site owner’s Google account.`
                        : 'Sign in with Google to edit the site’s content.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <Btn kind="accent" onClick={signIn}>Sign in with Google</Btn>
                    {user && <Btn onClick={() => signOut(auth)}>Sign out</Btn>}
                </div>
                {error && <p style={{ color: RED, fontSize: 13, marginTop: 18 }}>{error}</p>}
                <p style={{ color: FAINT, fontSize: 12, marginTop: 28, lineHeight: 1.6 }}>
                    Not looking for the editor? <a href="/" style={{ color: MUTED }}>Go to the site</a>.
                </p>
            </Screen>
        );
    }

    return <>{children}</>;
}
