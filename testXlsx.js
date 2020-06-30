const xlsx = require("xlsx");
const callMethod = require("./caller.js");

// normal sheets
const sheet = xlsx.readFile("./Assets/testXlsx.xlsx").Sheets["Sheet1"];
// err, miss. titleB
// const sheet = xlsx.readFile('./Assets/testXlsx_error.xlsx').Sheets["Sheet1"];
// err, miss. formTypeA and titleB
// const sheet = xlsx.readFile('./Assets/testXlsx_errorA-B.xlsx').Sheets["Sheet1"];

console.log("[testXlsx.js]", sheet);
const originalData = xlsx.utils.sheet_to_json(sheet);
// console.log("[testXlsx.js] originalData: ", originalData);

let imageIndexAtLastSuccess;
let dataDownTheLine;
// here is altered data in case of manual re-start at a higher data index:
// 1. find me the array-index of the object possesing the image-index (='aim index') of last successfull asset creation
// imageIndexAtLastSuccess = XXX; //FILL IN the ID number from console-log for last succ. creation

if (imageIndexAtLastSuccess !== undefined || null) {
  dataDownTheLine = originalData.slice(
    imageIndexAtLastSuccess,
    originalData.length
  );
}
// 2. create a new array where you 'pop' the first indices until the aim index
// 3. assign that new array to the binding dataDownTheLine
// dataDownTheLine = xlsx.utils ...
// console.log("[testXlsx.js]" dataDownTheLine: ", dataDownTheLine);

const data = dataDownTheLine || originalData;
console.log("[testXlsx.js] data: ", data);

callMethod.data(data);
