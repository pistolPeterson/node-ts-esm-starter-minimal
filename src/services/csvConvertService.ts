export const convertBOFA = (bofaCSVObject) => {
  console.log("Converting this bofa object: ", bofaCSVObject)
  const convertedObject = {
    Date: bofaCSVObject.Date,
    Name: bofaCSVObject.Description,
    Amount: bofaCSVObject.Amount,
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
    Bank: "Chase Bank - Credit Card",
  }

  return convertedObject
}

//Date
//Name
//Amount
