const wrapFunc = require("./testWithNode.js");

// const tableObj = {
//         line1: {
//             title: "autoTitle1",
//             formatType: "dr_jergas"
//         },
//         line2: {
//             title: "autoTitle2",
//             formatType: "dr_merkel"
//         }
// };

// const DATA = [
//     { title: 'titleA', formatType: 'dr_jergas' },
//     { title: 'titleB', formatType: 'dr_merkel' },
//     { title: 'titleC', formatType: 'dr_jergas' }
// ];

async function processData(obj) {
  // for (let item in obj) {
  for (let item of obj) {
    // if (error) {
    //     break;
    // }
    // await wrapFunc.data(tableObj[item].title, tableObj[item].formatType);
    try {
      // await wrapFunc.data(item.title, item.formatType, item.processId);
      await wrapFunc.data(item.title, item.formatType, item.processId, item.localImagePath);
      console.log(
        `[caller.js] --- Successfully created asset for asset title ${item.title} and processId ${item.processId} ---`
      );
    } catch (err) {
      console.error(`[caller.js] came across an error: ${err} !`);
      process.exit(1);
    }
  }
  console.log("[caller.js] ---- All Creations DONE! ----");
}

exports.data = processData;
