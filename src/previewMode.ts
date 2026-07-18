// Preview mode: the admin dashboard embeds the public site in an iframe at
// `/?preview=1` and streams the unsaved draft into it via postMessage, so
// edits are visible before they're saved. Only an embedded frame counts —
// visiting the URL directly just shows the normal site.
export const IS_PREVIEW = window.parent !== window
    && new URLSearchParams(window.location.search).has('preview');

// postMessage envelope types shared by the dashboard and the preview frame.
export const PREVIEW_STATE_MSG = 'emw-preview-state'; // parent → frame: { content?, tab? }
export const PREVIEW_READY_MSG = 'emw-preview-ready'; // frame → parent: listeners are attached
