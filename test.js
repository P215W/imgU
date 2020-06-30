const puppeteer = require("puppeteer");

const variableTitle = process.argv[2];
if (!variableTitle) {
  console.error("Error: Please provide a title.");
  process.exit(1);
}

const variableFormType = process.argv[3];
if (!variableFormType) {
  console.error("Error: Please provide a formtype.");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ribosom.miamed.de/login");

  await page.type("#signin_username", "mge");
  await page.type("#signin_password", "steindia12");

  //   const element = await page.$('tfoot input');
  //   console.log("ELEMENT: ", element);

  await Promise.all([page.click("tfoot input"), page.waitForNavigation()]);

  await Promise.all([
    page.click('[href="/ly_media_asset"]'),
    page.waitForNavigation(),
  ]);

  await Promise.all([
    page.click("#lymedia_folder_path a"),
    page.waitForNavigation(),
  ]);

  // PARAMS FOR FORMS:
  // for text inputs
  // await page.type('#ly_media_asset_title', 'autotestAsset124');
  await page.type("#ly_media_asset_title", variableTitle);
  // for simple dropdowns, i.e. select-elements
  await page.select("#ly_media_asset_CopyrightForm_type", variableFormType); // 'dr_jergas'
  // for multiple-select dropdowns (typable select-elements)
  await page.select(
    "#ly_media_asset_tags_list_fach",
    "medizin:fach=Augenheilkunde"
  );

  // file picker
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("#ly_media_asset_filename"), // button that triggers file selection
  ]);
  // await fileChooser.accept(['/tmp/myfile.pdf']);
  // await fileChooser.accept(['./test123.svg']);
  await fileChooser.accept(["./Assets/test123.svg"]);

  await Promise.all([
    page.click(".sf_admin_action_save input"),
    page.waitForNavigation(),
  ]);

  await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
