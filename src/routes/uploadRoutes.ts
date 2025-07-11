import express, { Request } from "express"
import multer from "multer"
import csv from "csv-parser"
import fs from "fs"

// Import Multer types directly
import type { File as MulterFile } from "multer"
import { readAllFileNamesInDirectory } from "@/services/fileService.ts"
import { convertBOFA, convertCHASE } from "@/services/csvConvertService.ts"

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
    //  const bankName = req.bankType === "chase" ? "chase" : "bofa"
    const fileName = file.fieldname + Date.now() + "-" + file.originalname
    cb(null, fileName)
  },
})
const upload = multer({ storage })
router.post("/", upload.single("csvFile"), (req: MulterRequest, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.")
  }
  //console.log("File received:", req.file)
  console.log(req.body)
  res.send("File uploaded successfully")
})
router.get("/", async (req, res) => {
  const uploadPrefix = "uploadData/"
  const results: any[] = []

  try {
    const files = await readAllFileNamesInDirectory("uploadData")
    const filePromises = (files as string[]).map((file) => {
      return new Promise<void>((resolve, reject) => {
        fs.createReadStream(`${uploadPrefix}${file}`)
          .pipe(csv())
          .on("data", (data) => {
            //prevalidation
            if (data.Amount === "" || data.Amount == undefined) {
              console.log("this amount is empty bruv, aint no way")
            } else {
              if (file.includes("bofa")) {
                const filteredBofa = convertBOFA(data)
                results.push(filteredBofa)
              } else if (file.includes("chase")) {
                const filteredChase = convertCHASE(data)
                results.push(filteredChase)
              } else {
                console.log(
                  "This file did not have bofa or chase, we skipping it " + file
                )
              }
            }

            //results.push(data)
          })
          .on("end", () => resolve())
          .on("error", reject)
      })
    })

    await Promise.all(filePromises)

    res.send({
      message: "Upload endpoint is ready. Use POST to upload files.",
      theBody: results,
    })
  } catch (err) {
    res.status(500).send({ error: "Failed to read files", details: err })
  }
})

// router.get("/", (req, res) => {
//   const results: any[] = []
//   const uploadPrefix = "uploadData/"

//   readAllFileNamesInDirectory("uploadData").then((files) => {
//     console.log("Files in uploadData directory:", files)
//     ;(files as string[]).forEach((file) => {
//       fs.createReadStream(`${uploadPrefix}${file}`)
//         .pipe(csv())
//         .on("data", (data) => results.push(data))
//         .on("end", () => {
//           console.log("Showing the data in the file: ", results)
//           // [
//           //   { NAME: 'Daffy Duck', AGE: '24' },
//           //   { NAME: 'Bugs Bunny', AGE: '22' }
//           // ]
//         })
//     })
//   })

//   res.send({
//     message: "Upload endpoint is ready. Use POST to upload files.",
//     theBody: JSON.stringify(results),
//   })
// })

export default router
