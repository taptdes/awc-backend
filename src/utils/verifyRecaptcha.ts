import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise"

/**
 * Verifies a reCAPTCHA Enterprise token
 * @param token - The token from the frontend (grecaptcha.enterprise.execute)
 * @param expectedAction - The expected action name (e.g., "contact_form")
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction: string
): Promise<{ valid: boolean; score?: number; reason?: string }> {
  const projectID = process.env.GOOGLE_PROJECT_ID
  const siteKey = process.env.RECAPTCHA_SITE_KEY

  if (!projectID || !siteKey) {
    throw new Error("Missing GOOGLE_PROJECT_ID or RECAPTCHA_SITE_KEY in environment variables")
  }

  const client = new RecaptchaEnterpriseServiceClient()

  try {
    const [assessment] = await client.createAssessment({
      parent: client.projectPath(projectID),
      assessment: {
        event: {
          token,
          siteKey,
        },
      },
    })

    console.log("reCAPTCHA assessment:", {
      valid: assessment.tokenProperties?.valid,
      action: assessment.tokenProperties?.action,
      score: assessment.riskAnalysis?.score,
      reasons: assessment.riskAnalysis?.reasons,
    })

    // Check token validity
    if (!assessment.tokenProperties?.valid) {
      return {
        valid: false,
        reason: String(assessment.tokenProperties?.invalidReason ?? "invalid"),
      }
    }

    // Check expected action
    if (assessment.tokenProperties.action !== expectedAction) {
      return { valid: false, reason: "action-mismatch" }
    }

    // Check risk score
    const score = assessment.riskAnalysis?.score ?? 0
    if (score < 0.5) {
      return { valid: false, score, reason: "low-score" }
    }

    return { valid: true, score }
  } catch (err: any) {
    console.error("Error verifying reCAPTCHA:", err.message ?? err)
    return { valid: false, reason: "error" }
  }
}