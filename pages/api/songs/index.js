import { executeQuery } from "../lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await executeQuery("SELECT * FROM songs");
    res.status(200).json({ rows });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
