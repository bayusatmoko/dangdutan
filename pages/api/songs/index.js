import { executeQuery } from "../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await executeQuery("SELECT * FROM songs");
      res.status(200).json({ rows });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    const data = req.body;
    await executeQuery(`INSERT INTO songs (title, album, audioUrl, bannerUrl) values ("${data.title}","${data.album}","${data.audioUrl}","${data.bannerUrl}")`);
    res.status(200).json({ data });
  }
}
