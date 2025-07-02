import express, { Request, Response, NextFunction } from "express"
import "dotenv/config"
import { HEALTH_CHECK } from "./constants/constants.ts"
import uploadRoutes from "./routes/uploadRoutes.ts"

import cors from "cors"
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/api/upload", uploadRoutes)

app.get("/api/health", (req, res, next) => {
  return res.send({ message: HEALTH_CHECK })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err)
  }
  res.status(500).send({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
