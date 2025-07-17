import crypto from "crypto"
export const convertBOFA = (bofaCSVObject) => {
  console.log("Converting this bofa object: ", bofaCSVObject)
  const convertedObject = {
    Date: bofaCSVObject.Date,
    Name: bofaCSVObject.Description,
    Amount: bofaCSVObject.Amount,
    TransactionCategory: "Other",
    Id: crypto.randomUUID(),
    Bank: "Bank Of America - Debit Card",
  }
  return convertedObject
}

export const convertCHASE = (chaseCSVObject) => {
  console.log("Converting this chase object: ", chaseCSVObject)
  const convertedObject = {
    Date: chaseCSVObject["Transaction Date"],
    Name: chaseCSVObject.Description,
    Amount: chaseCSVObject.Amount,
    TransactionCategory: "Other",
    Id: crypto.randomUUID(),
    Bank: "Chase Bank - Credit Card",
  }

  return convertedObject
}

//Date
//Name
//Amount
export function setTransactionCategory(name: string): string {
  const foodKeywords = ["mcdonald", "starbucks", "chipotle"]
  const travelKeywords = ["uber", "lyft", "delta"]
  const shoppingKeywords = ["amazon", "walmart", "target"]

  const lowerName = name.toLowerCase()

  if (foodKeywords.some((keyword) => lowerName.includes(keyword))) {
    return "Food"
  }
  if (travelKeywords.some((keyword) => lowerName.includes(keyword))) {
    return "Travel"
  }
  if (shoppingKeywords.some((keyword) => lowerName.includes(keyword))) {
    return "Shopping"
  }
  return "Other"
}
