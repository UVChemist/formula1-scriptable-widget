// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: car;

// Get a reference to the iCloud file manager

const fileMgr = FileManager.iCloud();

// Define the base URL of your GitHub repo
const tagsURL = "https://api.github.com/repos/UVChemist/formula1-scriptable-widget/tags";
const scriptURL = "https://raw.githubusercontent.com/UVChemist/formula1-scriptable-widget/main/f1-scoreboard-widget.js";
const driverFlagsURL = "https://raw.githubusercontent.com/UVChemist/formula1-scriptable-widget/main/driver-flags";
const teamLogosURL = "https://raw.githubusercontent.com/UVChemist/formula1-scriptable-widget/main/team-logos";
const trackImgsURL = "https://raw.githubusercontent.com/UVChemist/formula1-scriptable-widget/main/tracks";
const scheduleApiUrl = "http://ergast.com/api/f1/current.json";
const driverStandingsApiUrl = "http://ergast.com/api/f1/current/driverStandings.json";
const constructorsStandingsApiUrl = "http://ergast.com/api/f1/current/constructorStandings.json";
const versionJsonURL = "https://raw.githubusercontent.com/UVChemist/formula1-scriptable-widget/main/version.json";

// Define the paths of the files and directories in your repo
const baseDir = fileMgr.documentsDirectory();
const appDir = fileMgr.joinPath(baseDir, "f1-widget-files");
const flagDir = fileMgr.joinPath(baseDir, "f1-widget-files/driver-flags");
const logoDir = fileMgr.joinPath(baseDir, "f1-widget-files/team-logos");
const trackDir = fileMgr.joinPath(baseDir, "f1-widget-files/tracks");
const cacheDir = fileMgr.joinPath(baseDir, "f1-widget-files/cache");

const flagImgPaths = [
  "aus.png",
  "can.png",
  "chn.png",
  "deu.png",
  "dnk.png",
  "esp.png",
  "fin.png",
  "fra.png",
  "gbr.png",
  "jpn.png",
  "mco.png",
  "mex.png",
  "nld.png",
  "tha.png",
  "usa.png",
];
const logoImgPaths = [
  "f1.png",
  "alphatauri.png",
  "alpine.png",
  "astonmartin.png",
  "ferrari.png",
  "haas.png",
  "mclaren.png",
  "mercedes.png",
  "redbull.png",
  "sauber.png",
  "williams.png",
];
const trackImgPaths = [
  "albert_park.png",
  "americas.png",
  "bahrain.png",
  "baku.png",
  "catalunya.png",
  "hungaroring.png",
  "imola.png",
  "interlagos.png",
  "jeddah.png",
  "losail.png",
  "marina_bay.png",
  "miami.png",
  "monaco.png",
  "monza.png",
  "red_bull_ring.png",
  "rodriguez.png",
  "shanghai.png",
  "silverstone.png",
  "spa.png",
  "suzuka.png",
  "vegas.png",
  "villeneuve.png",
  "yas_marina.png",
  "zandvoort.png",
];

// Create the directories
fileMgr.createDirectory(appDir, true);
fileMgr.createDirectory(logoDir, true);
fileMgr.createDirectory(flagDir, true);
fileMgr.createDirectory(trackDir, true);
fileMgr.createDirectory(cacheDir, true);

async function downloadFiles() {
  console.log("Downloading flag images...");

  for (const path of flagImgPaths) {
    const downloadURL = `${driverFlagsURL}/${path}`;
    const filePath = fileMgr.joinPath(baseDir, `f1-widget-files/driver-flags/${path}`);
    try {
      const req = new Request(downloadURL);
      const image = await req.loadImage();
      fileMgr.writeImage(filePath, image);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Flag image downloads complete.");

  console.log("Downloading logo images...");

  for (const path of logoImgPaths) {
    const downloadURL = `${teamLogosURL}/${path}`;
    const filePath = fileMgr.joinPath(baseDir, `f1-widget-files/team-logos/${path}`);

    try {
      const req = new Request(downloadURL);
      const image = await req.loadImage();
      fileMgr.writeImage(filePath, image);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Logo image downloads complete.");

  console.log("Downloading track images...");

  for (const path of trackImgPaths) {
    const downloadURL = `${trackImgsURL}/${path}`;
    const filePath = fileMgr.joinPath(baseDir, `f1-widget-files/tracks/${path}`);
    try {
      const req = new Request(downloadURL);
      const image = await req.loadImage();
      fileMgr.writeImage(filePath, image);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Track image downloads complete.");

  console.log("Downloading cache files...");

  try {
    const scheduleReq = new Request(scheduleApiUrl);
    const scheduleFile = await scheduleReq.loadString();
    const schedulePath = fileMgr.joinPath(baseDir, "f1-widget-files/cache/schedule-cache.json");
    fileMgr.writeString(schedulePath, scheduleFile);

    const driverStandingsReq = new Request(driverStandingsApiUrl);
    const driverStandingsFile = await driverStandingsReq.loadString();
    const driverStandingsPath = fileMgr.joinPath(baseDir, "f1-widget-files/cache/driver-cache.json");
    fileMgr.writeString(driverStandingsPath, driverStandingsFile);

    const constructorsStandingsReq = new Request(constructorsStandingsApiUrl);
    const constructorsStandingsFile = await constructorsStandingsReq.loadString();
    const constructorsStandingsPath = fileMgr.joinPath(baseDir, "f1-widget-files/cache/constructor-cache.json");
    fileMgr.writeString(constructorsStandingsPath, constructorsStandingsFile);
  } catch (error) {
    console.error(error);
  }

  console.log("Cache file downloads complete.");

  console.log("Downloading widget script...");

  try {
    const versionReq = new Request(versionJsonURL);
    const versionFile = await versionReq.loadString();
    const versionPath = fileMgr.joinPath(baseDir, "f1-widget-files/version.json");
    fileMgr.writeString(versionPath, versionFile);

    const scriptReq = new Request(scriptURL);
    const scriptFile = await scriptReq.loadString();
    const filePath = fileMgr.joinPath(baseDir, "f1-scoreboard-widget.js");
    fileMgr.writeString(filePath, scriptFile);
  } catch (error) {
    console.error(error);
  }

  console.log("Widget script download complete.");

  console.log("Script install complete.");

  return;
}

async function updateCheck() {
  const scriptPath = fileMgr.joinPath(baseDir, "f1-scoreboard-widget.js");

  if (fileMgr.fileExists(scriptPath)) {
    console.log("Checking for updates...");
    const req = new Request(tagsURL);
    const tagsJSON = await req.loadJSON();
    const latestVersion = tagsJSON[0].name.toString();

    const versionJsonPath = fileMgr.joinPath(baseDir, "f1-widget-files/version.json");
    await fileMgr.downloadFileFromiCloud(versionJsonPath);
    const versionJSONFile = fileMgr.readString(versionJsonPath);
    const versionJSON = JSON.parse(versionJSONFile);
    const currentVersion = versionJSON.version;

    if (currentVersion != latestVersion) {
      console.log("Update available.");
      const updateReq = new Request(scriptURL);
      const updateFile = await updateReq.loadString();
      fileMgr.writeString(scriptPath, updateFile);

      const versionJSONReq = new Request(versionJsonURL);
      const versionJSONFile = await versionJSONReq.loadString();
      fileMgr.writeString(versionJsonPath, versionJSONFile);

      console.log("Update complete.");
    } else {
      console.log("No updates available.");
    }
  } else {
    await downloadFiles();
  }

  return;
}

await updateCheck();
