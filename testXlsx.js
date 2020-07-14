const xlsx = require("xlsx");
const callMethod = require("./caller.js");

// GET SHEET AND TRANSFORM IT TO JSON (ONE ARRAY OF OBJECTS):
const sheet = xlsx.readFile("./Assets/testXlsxAfterImageDownload_short.xlsx").Sheets["Tabellenblatt1"];
console.log("[testXlsx.js]: original sheet: ", sheet);
const originalData = xlsx.utils.sheet_to_json(sheet);

// IN CASE WE NEED A MANUAL RESTART AT A HIGHER DATA INDEX IF INITIAL RUN WAS ABORTED
// IN THAT CASE: PLEASE USE the ID number THAT WAS consoleLOGGED for THE last succesSfull asset creation AS THE VALUE FOR THE LET-VAR IMAGEINDEXATLASTSUCCESS:
let imageIndexAtLastSuccess; // = XXX; // PLEASE FILL IN the LAST SUCCESSFULL ASSET ID number HERE
let dataDownTheLine;
if (imageIndexAtLastSuccess !== undefined || null) {
  dataDownTheLine = originalData.slice(
    imageIndexAtLastSuccess,
    originalData.length
  );
}
const data = dataDownTheLine || originalData;
console.log("[testXlsx.js] data: ", data);

// HAND-OVER THE JSON (THE ONE ARRAY OF OBJECTS) TO THE CALLER-JS-FILE:
callMethod.data(data);
