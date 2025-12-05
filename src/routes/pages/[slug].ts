import { getSanityClient } from "../../lib/cms/sanityClient.js"
import type { Request, Response } from "express"

export default async function handler(req: Request, res: Response) {
  const { slug } = req.params
  try {
    const client = getSanityClient()
    const page = await client.fetch('*[_type == "page" && slug.current == ][0]', { slug })
    if (!page) return res.status(404).json({ error: "Page not found" })
    res.json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
}
