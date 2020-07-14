const xlsx = require("xlsx");
const fs = require("fs");
const requestmodule = require("request");
const callMethod = require("./caller.js");

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
const sheet = xlsx.readFile("./Assets/testXlsx.xlsx").Sheets["Sheet1"];
const sheetJSON = xlsx.utils.sheet_to_json(sheet);
console.log("originalData: ", sheetJSON);

//  LOOP THROUGH ALL ROWS (blank rows are ignored by default) TO GET EACH IMAGE-URL and call download function with url:
const tableElementsWithMissingImageUrl = [];
// sheetJSON.forEach(item => {
//     if (item.imageUrl) {
//       download(
//         `${item.imageUrl}`,
//         `C:/Users/Marc/imageUploadAutomation/Assets/${item.title}_processID${item.processId}.jpg`,
//         function () {
//           console.log(`Done with ${item.title}`);
//         }
//       );
//     } else {
//       tableElementsWithMissingImageUrl.push(item);
//     }
// });

const newData = sheetJSON.map(item => {
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

callMethod.data(newData);

exports.data = newData;
