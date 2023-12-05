import { executeQuery } from '../lib/db'

export default function handler(req, res) {
    executeQuery("SELECT * FROM songs")
    res.status(200).json({ message: 'This will be song API' })
}