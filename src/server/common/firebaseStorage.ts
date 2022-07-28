import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

import serviceAccount from "../../../firebase_serviceAccountKey.json";

const storageBucket = process.env.STORAGE_BUCKET_URL;

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket,
});

const storage = getStorage().bucket();

export { storage };
