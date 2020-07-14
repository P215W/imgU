const xlsx = require("xlsx");
const fs = require("fs");
const requestmodule = require("request");

const pathToSheetForImageDownload = "./Assets/testXlsx.xlsx";
const worksheetName = "Sheet1";

// NODE IMAGE CRAWLER FUNCTION:
const download = function (uri, filename, callback) {
  requestmodule.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);
    requestmodule(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

// PARSE SHEET:
const sheetForImageDownload = xlsx.readFile(`${pathToSheetForImageDownload}`).Sheets[`${worksheetName}`];
const sheetAsJSON = xlsx.utils.sheet_to_json(sheetForImageDownload);
console.log("sheetAsJSON: ", sheetAsJSON);

//  LOOP THROUGH ALL ROWS (blank rows are ignored by default) TO GET EACH IMAGE-URL and call download function with url:
const tableElementsWithMissingImageUrl = [];

const newData = sheetAsJSON.map(item => {
  if (item.imageUrl) {
    download(
      `${item.imageUrl}`,
      `C:/Users/Marc/imageUploadAutomation/Assets/${item.title}_processID${item.processId}.jpg`,
      function () {
        console.log(`Done with ${item.title}`);
      }
    );
    item.localImagePath = `C:/Users/Marc/imageUploadAutomation/Assets/${item.title}_processID${item.processId}.jpg`;
  } else {
    tableElementsWithMissingImageUrl.push(item);
  }
  return item;
});
console.log("newData: ", newData);
console.log("Error Array: ", tableElementsWithMissingImageUrl);

// TRANSFORM NEW DATA INTO NEW XLSX-FILE THAT HOLDS THE LOCAL IMAGE PATHS, AND IS THEREFORE USABLE FOR ASSET CREATION:
const newWB = xlsx.utils.book_new();
const newWS = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWB, newWS, "Sheet for asset creation");
xlsx.writeFile(newWB, "./Assets/testXlsx_useForAssetCreation.xlsx");

exports.data = newData;
