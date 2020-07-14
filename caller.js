const xlsx = require("xlsx");
const wrapFunc = require("./testWithNode.js");

// THIS FUNCTION CALLS THE ONE FUNCTION WITHIN TESTWITHNODE-JS-FILE FOR EVERY TABLE ROW (AKA FOR EVERY OBJECT IN THE ONE ARRAY):
async function processData(obj) {
  for (let item of obj) {
    try {
      // await wrapFunc.data(item.title, item.formatType, item.processId, item.localImagePath);
      await wrapFunc.data(item);
      console.log("P A T H: ", item.localImagePath);
      console.log(
        `[caller.js] --- Successfully created asset for asset title ${item.title} and processId ${item.processId} ---`
      );
    } catch (err) {
      console.error(`[caller.js] came across an error: ${err} !`);
      process.exit(1);
    }
  }
  console.log("[caller.js] ---- All Creations DONE! ----");
  console.log("N E W - O B J: ", obj);

  const newWB = xlsx.utils.book_new();
  const newWS = xlsx.utils.json_to_sheet(obj);
  xlsx.utils.book_append_sheet(newWB, newWS, "TestWorksheet444");
  xlsx.writeFile(newWB, "./Assets/test_Xlsx_After_Asset_Creation.xlsx");
}

// EXPORTING THE FUNCTION SO THAT WE CAN CALL IT FROM WITHIN TESTXLSX-JS-FILE:
exports.data = processData;
