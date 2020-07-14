const puppeteer = require("puppeteer");

async function wrapItAll(a, b, processId, localImagePath) {
  // const variableTitle = process.argv[2];
  const variableTitle = a;
  if (!variableTitle) {
    throw new Error(
      `[testWithNode.js] Error: For processId ${processId}, no title was provided!`
    );
    // process.exit(1);
  }

  // const variableFormType = process.argv[3];
  const variableFormType = b;
  if (!variableFormType) {
    console.error("[testWithNode.js] Error: Please provide a formtype.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // enlarge span for navigation timeout (by default 30.000ms)
  page.setDefaultNavigationTimeout(60000);

  // for production
  // await page.goto('https://ribosom.miamed.de/login');
  // for testing via labamboss
  await page.goto("https://ribosom.labamboss.com/");

  await page.type("#signin_username", ""); // cred
  await page.type("#signin_password", ""); // cred

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
  try {
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click("#ly_media_asset_filename"), // button that triggers file selection
    ]);

    // await fileChooser.accept(["./Assets/test123.svg"]);
    await fileChooser.accept([`${localImagePath}`]);
  } catch (err) {
    throw new Error(`Error at file picker: ${err}`);
  }

  try {
    await Promise.all([
      page.click(".sf_admin_action_save input"),
      page.waitForNavigation(),
    ]);
  } catch (err) {
    throw new Error(`Error at save-input: ${err}`);
  }

  await page.screenshot({ path: "screenshot.png" });
  // GET THE NEWLY CREATED ASSETS URL:
  console.log("NEWLY CREATED ASSET URL: ", page.url());

  try {
    await browser.close();
  } catch (err) {
    throw new Error(`Error at browser-close: ${err}`);
  }
}

exports.data = wrapItAll;
