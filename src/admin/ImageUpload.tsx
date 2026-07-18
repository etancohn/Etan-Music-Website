import { useRef, useState } from 'react';
import { uploadFile } from './storage';
import { Btn, FAINT, RED } from './fields';

// Photo-upload widget: picks an image, uploads it to Storage, and hands the
// resulting URL to `onChange`. `onChange(null)` clears the slot (the site
// then falls back to its bundled photo).
export default function ImageUpload({ url, onChange, folder, noun = 'photo' }: {
    url: string | undefined;
    onChange: (url: string | null) => void;
    folder: string;
    noun?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setBusy(true);
        setError(null);
        try {
            onChange(await uploadFile(file, folder));
        } catch (err) {
            console.error(err);
            setError('Upload failed — check your internet and try again.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                {url && (
                    <img
                        src={url}
                        alt=""
                        style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(237,239,235,.2)', flex: 'none' }}
                    />
                )}
                <input ref={inputRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
                <Btn onClick={() => inputRef.current?.click()} disabled={busy} kind={url ? 'ghost' : 'accent'}>
                    {busy ? 'Uploading…' : url ? `Replace ${noun}` : `Upload ${noun}`}
                </Btn>
                {url && !busy && (
                    <Btn onClick={() => onChange(null)} kind="danger" small>
                        Use original {noun}
                    </Btn>
                )}
            </div>
            {error && <div style={{ fontSize: 12, color: RED, marginTop: 8 }}>{error}</div>}
            {!url && !error && !busy && (
                <div style={{ fontSize: 12, color: FAINT, marginTop: 8 }}>
                    Using the built-in {noun} — upload one to replace it.
                </div>
            )}
        </div>
    );
}
