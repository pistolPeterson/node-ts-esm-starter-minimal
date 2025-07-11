// services/fileService.js
import fs from "fs"

/**
 * Reads the content of a file from the given path.
 * @param {string} filePath - The full path to the file.
 * @param {string} encoding - The encoding to use when reading the file (e.g., 'utf8', 'binary').
 * @returns {Promise<string>} A promise that resolves with the file content.
 */
export const readFileContent = (filePath, encoding = "utf8") => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        console.error(`Error reading file at ${filePath}:`, err)
        return reject(new Error(`Failed to read file content: ${err.message}`))
      }
      resolve(data)
    })
  })
}

export const readAllFileNamesInDirectory = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error(`Error reading directory at ${dirPath}:`, err)
        return reject(new Error(`Failed to read directory: ${err.message}`))
      }
      resolve(files) // Return all file names
    })
  })
}
