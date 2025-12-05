import * as functions from "firebase-functions"

export const helloWorld = functions.https.onRequest(
  (req: functions.https.Request, res: functions.Response) => {
    res.send("Hello from Firebase!")
  }
)