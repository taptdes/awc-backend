import admin from 'firebase-admin'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || path.join(process.cwd(), 'firebase-service-account.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
}

export { admin }
