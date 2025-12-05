import admin from "firebase-admin"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

let serviceAccount

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Running on Vercel (JSON string)
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // Running locally (file path)
  serviceAccount = JSON.parse(
    fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8")
  )
} else {
  throw new Error("No Firebase service account configuration found")
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })
}

export const db = admin.firestore()
export { admin }