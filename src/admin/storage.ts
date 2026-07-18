import { app } from '../firebase';

// Uploads a file to Firebase Storage and returns its public download URL.
// firebase/storage is dynamically imported so it loads only when someone
// actually uploads from the editor.
export async function uploadFile(file: File, folder: string): Promise<string> {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const storage = getStorage(app);
    const safeName = file.name.replace(/[^\w.-]+/g, '_');
    const fileRef = ref(storage, `uploads/${folder}/${Date.now()}-${safeName}`);
    await uploadBytes(fileRef, file, { contentType: file.type });
    return getDownloadURL(fileRef);
}
