const xlsx = require("xlsx");
const puppeteer = require('puppeteer');

// parse sheet part:
const sheet = xlsx.readFile("./Assets/vimeoLinks.xlsx").Sheets["Tabellenblatt1"];

const addressOfCell = 'G12';

const desiredCell = sheet[addressOfCell];

const desiredValue = desiredCell ? desiredCell.v : undefinded;

console.log(desiredValue);

// // access url and pup part:
// (async () => {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   await page.goto(`${desiredValue}`);
//   // other actions...
//   await page.keyboard.down('Control');
//   await page.keyboard.press('KeyS');
//   await page.keyboard.up('Control');


//   await page.screenshot({ path: "screenshotImage.png" });
//   await browser.close();
// })();

// for pup. alternatively node image crawler part:
var fs = require('fs');
var requestmodule = require('request');

var download = function(uri, filename, callback){
  requestmodule.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    requestmodule(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// download('https://www.google.com/images/srpr/logo3w.png', 'C:/Users/Marc/imageUploadAutomation/Assets/google.png', function(){
//   console.log('done');
// });

// works down HERE!!!
// download('https://i.vimeocdn.com/video/734647815.jpg', 'C:/Users/Marc/imageUploadAutomation/Assets/google3.jpg', function(){
//   console.log('done');
// });
download(`${desiredValue}`, 'C:/Users/Marc/imageUploadAutomation/Assets/google444.jpg', function(){
  console.log('done');
});


