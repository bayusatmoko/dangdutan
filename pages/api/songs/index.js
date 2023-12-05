import { executeQuery } from "../lib/db";

export default function handler(req, res) {
  console.log("TEST");
  try {
    executeQuery("SELECT * FROM songs");
    res.status(200).json({ message: "This will be song API" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
