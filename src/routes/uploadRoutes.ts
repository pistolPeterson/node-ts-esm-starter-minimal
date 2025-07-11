import express, { Request } from "express"
import multer from "multer"
import csv from "csv-parser"
import fs from "fs"

// Import Multer types directly
import type { File as MulterFile } from "multer"
import { readAllFileNamesInDirectory } from "@/services/fileService.ts"

// Extend Express Request type to include 'file' property from multer
interface MulterRequest extends Request {
  file?: MulterFile
}

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving to folder: uploadData")
    cb(null, "uploadData/")
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + Date.now() + "-" + file.originalname
    console.log("Saving as:", fileName)
    cb(null, fileName)
  },
})
const upload = multer({ storage })
router.post("/", upload.single("csvFile"), (req: MulterRequest, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.")
  }
  console.log("File received:", req.file)

  res.send("File uploaded successfully")
})

router.get("/", (req, res) => {
  const results: any[] = []

  readAllFileNamesInDirectory("uploadData").then((files) => {
    console.log("Files in uploadData directory:", files)
  })

  fs.createReadStream("uploadData/csvFile1752202105046-industry.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results)
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    })
  res.send("Upload endpoint is ready. Use POST to upload files.")
})

export default router
