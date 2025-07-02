import express, { Request } from "express"
import multer from "multer"
//import { handleUpload } from '../controllers/uploadController';

// Import Multer types directly
import type { File as MulterFile } from "multer"

// Extend Express Request type to include 'file' property from multer
interface MulterRequest extends Request {
  file?: MulterFile
}

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadData/")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + "-" + file.originalname)
  },
})

router.post("/", upload.single("csvFile"), (req: MulterRequest, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.")
  }
  console.log("File received:", req.file)

  res.send("File uploaded successfully")
})

export default router
