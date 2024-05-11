// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: car;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: car;
const widget = new ListWidget();
const fileMgr = FileManager.iCloud();
const appDir = fileMgr.documentsDirectory();

const file = {
  schedule: fileMgr.joinPath(appDir, "f1-scoreboard-files/schedule-cache.json"),
  driverStandings: fileMgr.joinPath(appDir, "f1-scoreboard-files/driver-cache.json"),
  constructorStandings: fileMgr.joinPath(appDir, "f1-scoreboard-files/constructor-cache.json"),
  flagImages: fileMgr.joinPath(appDir, "f1-scoreboard-files/driver-flags/"),
  teamLogos: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos"),
  f1Logo: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/f1.png"),
  logos: {
    mercedes: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/mercedes.png"),
    red_bull: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/redbull.png"),
    ferrari: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/ferrari.png"),
    mclaren: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/mclaren.png"),
    aston_martin: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/astonmartin.png"),
    alpine: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/alpine.png"),
    rb: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/alphatauri.png"),
    sauber: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/sauber.png"),
    haas: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/haas.png"),
    williams: fileMgr.joinPath(appDir, "f1-scoreboard-files/team-logos/williams.png"),
  },
  getDate(filePath) {
    const createDate = fileMgr.creationDate(filePath);

    return createDate;
  },
};

const cache = {
  check(filePath) {
    if (fileMgr.fileExists(filePath)) {
      // add check to make sure standings are up to date or if they should be updated
      return true;
    } else {
      return false;
    }
  },
  async downloadCache(filePath) {
    try {
      let success = await fileMgr.downloadFileFromiCloud(filePath);
      console.log("Successfully downloaded file from iCloud");
    } catch (error) {
      console.log("Error downloading file from iCloud: ${error}");
    }
  },
  readSchedule() {
    const schedule = fileMgr.readString(file.schedule);
    const scheduleObj = JSON.parse(schedule);

    return scheduleObj;
  },
  readDriverStandings() {
    const driverStandings = fileMgr.readString(file.driverStandings);
    const driverStandingsObj = JSON.parse(driverStandings);

    return driverStandingsObj;
  },
  readConstructorStandings() {
    const constructorStandings = fileMgr.readString(file.constructorStandings);
    const constructorStandingsObj = JSON.parse(constructorStandings);

    return constructorStandingsObj;
  },
  saveResponse(filePath, responseJSON) {
    fileMgr.writeString(filePath, responseJSON);

    return;
  },
};

const f1Data = {
  scheduleYear() {
    const scheduleObj = cache.readSchedule();
    const scheduleYear = scheduleObj.MRData.RaceTable.season;

    return scheduleYear;
  },
  scheduleRaceDate(round) {
    const scheduleObj = cache.readSchedule();
    const roundIndex = round - 1;
    const raceDate = scheduleObj.MRData.RaceTable.Races[roundIndex].date;

    return raceDate;
  },
  scheduleGPLocs() {
    const raceList = [];
    const scheduleObj = cache.readSchedule();
    const races = scheduleObj.MRData.RaceTable.Races;

    for (const race of races) {
      const adjString = race.raceName.slice(0, -10) + " GP";
      raceList.push(adjString); //Circuit.Location.country for country name
    }

    return raceList;
  },
  scheduleGPDates() {
    const gpDateList = [];
    const scheduleObj = cache.readSchedule();
    const races = scheduleObj.MRData.RaceTable.Races;

    for (const race of races) {
      gpDateList.push(race.date);
    }

    return gpDateList;
  },
  scheduleGPTimes() {
    const gpTimeList = [];
    const scheduleObj = cache.readSchedule();
    const races = scheduleObj.MRData.RaceTable.Races;

    for (const race of races) {
      gpTimeList.push(race.time);
    }

    return gpTimeList;
  },
  scheduleGPDateTimes() {
    const gpDateTimeList = [];
    const scheduleObj = cache.readSchedule();
    const races = scheduleObj.MRData.RaceTable.Races;

    for (const race of races) {
      const date = race.date;
      const time = race.time;
      const isoDateTime = `${date}T${time}`;
      gpDateTimeList.push(isoDateTime);
    }

    return gpDateTimeList;
  },
  nextGPDate() {
    const scheduleObj = cache.readSchedule();
    const driverStandingsObj = cache.readDriverStandings();
    const roundInCache = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].round;
    const raceDate = scheduleObj.MRData.RaceTable.Races[roundInCache].date;

    return raceDate;
  },
  nextGPTime() {
    const scheduleObj = cache.readSchedule();
    const driverStandingsObj = cache.readDriverStandings();
    const roundInCache = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].round;
    const raceTime = scheduleObj.MRData.RaceTable.Races[roundInCache].time;

    return raceTime;
  },
  nextGPLoc() {
    const scheduleObj = cache.readSchedule();
    const driverStandingsObj = cache.readDriverStandings();
    const roundInCache = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].round;
    const raceLoc = scheduleObj.MRData.RaceTable.Races[roundInCache].raceName;

    return raceLoc;
  },
  nextGPEvents() {
    const events = [];
    const scheduleObj = cache.readSchedule();
    const driverStandingsObj = cache.readDriverStandings();
    const roundInCache = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].round;
    const sprintWeekend = helper.sprintCheck();

    if (sprintWeekend === true) {
      let firstEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].FirstPractice;
      let secondEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].SecondPractice;
      let thirdEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].Sprint;
      let fourthEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].Qualifying;

      let eventOne = "Practice 1";
      let eventTwo = "Sprint Qualifying";
      let eventThree = "Sprint";
      let eventFour = "Qualifying";

      const firstEventDT = new Date(`${firstEventObj.date}T${firstEventObj.time}`);
      const secondEventDT = new Date(`${secondEventObj.date}T${secondEventObj.time}`);
      const thirdEventDT = new Date(`${thirdEventObj.date}T${thirdEventObj.time}`);
      const fourthEventDT = new Date(`${fourthEventObj.date}T${fourthEventObj.time}`);

      events.push(
        { eventOne, firstEventDT },
        { eventTwo, secondEventDT },
        { eventThree, thirdEventDT },
        { eventFour, fourthEventDT }
      );
    } else {
      let firstEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].FirstPractice;
      let secondEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].SecondPractice;
      let thirdEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].ThirdPractice;
      let fourthEventObj = scheduleObj.MRData.RaceTable.Races[roundInCache].Qualifying;

      let eventOne = "Practice 1";
      let eventTwo = "Practice 2";
      let eventThree = "Practice 3";
      let eventFour = "Qualifying";

      const firstEventDT = new Date(`${firstEventObj.date}T${firstEventObj.time}`);
      const secondEventDT = new Date(`${secondEventObj.date}T${secondEventObj.time}`);
      const thirdEventDT = new Date(`${thirdEventObj.date}T${thirdEventObj.time}`);
      const fourthEventDT = new Date(`${fourthEventObj.date}T${fourthEventObj.time}`);

      events.push(
        { eventOne, firstEventDT },
        { eventTwo, secondEventDT },
        { eventThree, thirdEventDT },
        { eventFour, fourthEventDT }
      );
    }

    return events;
  },
  totalRounds() {
    const scheduleObj = cache.readSchedule();
    const totalRounds = scheduleObj.MRData.RaceTable.Races.length;

    return totalRounds;
  },
  roundInDriverCache() {
    const driverStandingsObj = cache.readDriverStandings();
    const roundInCache = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].round;

    return roundInCache;
  },
  driverStandingsNames() {
    const driverNames = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const driverFName = standing.Driver.givenName;
      const driverLName = standing.Driver.familyName;
      const driverFullName = `${driverFName} ${driverLName}`;
      driverNames.push(driverFullName);
    }

    return driverNames;
  },
  driverStandingsPos() {
    const driverPositions = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const driverPos = standing.position;
      driverPositions.push(driverPos);
    }

    return driverPositions;
  },
  driverStandingsPoints() {
    const driverPoints = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const currentDriverPoints = standing.points;
      driverPoints.push(currentDriverPoints);
    }

    return driverPoints;
  },
  driverStandingsWins() {
    const driverWins = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const currentDriverWins = standing.wins;
      driverWins.push(currentDriverWins);
    }

    return driverWins;
  },
  driverNations() {
    const nationISOCodes = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const driverNationality = standing.Driver.nationality;
      const convertedISOCode = helper.countryCodeConv(driverNationality);
      nationISOCodes.push(convertedISOCode);
    }
    return nationISOCodes;
  },
  driverStandingsTeams() {
    const driverTeams = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const driverTeam = standing.Constructors[0].name;
      driverTeams.push(driverTeam);
    }

    return driverTeams;
  },
  driverStandingsTeamCodes() {
    const driverTeamCodes = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const driverTeam = standing.Constructors[0].constructorId;
      driverTeamCodes.push(driverTeam);
    }

    return driverTeamCodes;
  },
  roundInConstructorCache() {
    const constructorStandingsObj = cache.readConstructorStandings();
    const roundInCache = constructorStandingsObj.MRData.StandingsTable.StandingsLists[0].round;

    return roundInCache;
  },
  constructorTeams() {
    const teams = [];
    const constructorStandingsObj = cache.readConstructorStandings();
    const standings = constructorStandingsObj.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    for (const standing of standings) {
      const team = standing.Constructor.name;
      teams.push(team);
    }

    return teams;
  },
  constructorTeamCodes() {
    const teamCodes = [];
    const constructorStandingsObj = cache.readConstructorStandings();
    const standings = constructorStandingsObj.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    for (const standing of standings) {
      const teamCode = standing.Constructor.constructorId;
      teamCodes.push(teamCode);
    }

    return teamCodes;
  },
  constructorPositions() {
    const positions = [];
    const constructorStandingsObj = cache.readConstructorStandings();
    const standings = constructorStandingsObj.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    for (const standing of standings) {
      const teamPosition = standing.position;
      positions.push(teamPosition);
    }

    return positions;
  },
  constructorPoints() {
    const points = [];
    const constructorStandingsObj = cache.readConstructorStandings();
    const standings = constructorStandingsObj.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    for (const standing of standings) {
      const teamPoints = standing.points;
      points.push(teamPoints);
    }

    return points;
  },
  constructorWins() {
    const wins = [];
    const constructorStandingsObj = cache.readConstructorStandings();
    const standings = constructorStandingsObj.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    for (const standing of standings) {
      const teamWins = standing.wins;
      wins.push(teamWins);
    }

    return wins;
  },
};

const requests = {
  async scheduleRequest() {
    const check = cache.check(file.schedule);
    const needToUpdate = updater.schedule();
    const scheduleURL = "http://ergast.com/api/f1/current.json";

    if (check === false) {
      const apiReq = new Request(scheduleURL);
      const apiObj = await apiReq.loadJSON();
      const apiCache = JSON.stringify(apiObj);
      cache.saveResponse(file.schedule, apiCache);
    } else if (check === true && needToUpdate === true) {
      const apiReq = new Request(scheduleURL);
      const apiObj = await apiReq.loadJSON();
      const apiCache = JSON.stringify(apiObj);
      cache.saveResponse(file.schedule, apiCache);
    } else {
      cache.readSchedule();
    }
  },
  async driversRequest() {
    const check = cache.check(file.driverStandings);
    const needToUpdate = updater.standings();
    const driverURL = "http://ergast.com/api/f1/current/driverStandings.json";

    if (check === false) {
      const apiReq = new Request(driverURL);
      const apiObj = await apiReq.loadJSON();
      const apiCache = JSON.stringify(apiObj);
      cache.saveResponse(file.driverStandings, apiCache);
      console.log("Driver Standings downloaded and saved to cache");
    } else if (check === true && needToUpdate === true) {
      const apiReq = new Request(driverURL);
      const apiObj = await apiReq.loadJSON();
      const apiCache = JSON.stringify(apiObj);
      cache.saveResponse(file.driverStandings, apiCache);
      console.log("Driver Standings downloaded and saved to cache");
    } else {
      cache.readDriverStandings();
    }
  },
  async constructorRequest() {
    const check = cache.check(file.constructorStandings);
    const needToUpdate = updater.standings();
    const constructorURL = "http://ergast.com/api/f1/current/constructorStandings.json";

    if (check === false) {
      const apiReq = new Request(constructorURL);
      const apiObj = await apiReq.loadJSON();
      const apiCache = JSON.stringify(apiObj);
      cache.saveResponse(file.constructorStandings, apiCache);
      console.log("Constructor Standings downloaded and saved to cache");
    } else if (check === true && needToUpdate === true) {
      const apiReq = new Request(constructorURL);
      const apiObj = await apiReq.loadJSON();
      const apiCache = JSON.stringify(apiObj);
      cache.saveResponse(file.constructorStandings, apiCache);
      console.log("Constructor Standings downloaded and saved to cache");
    } else {
      cache.readConstructorStandings();
    }
  },
};

const helper = {
  dateFormat(dateString) {
    const isoDate = dateString + "T00:00:00.000";
    const dateObj = new Date(isoDate);
    return dateObj;
  },
  countryCodeConv(nationality) {
    countryCodes = {
      dutch: "nld",
      monegasque: "mco",
      mexican: "mex",
      spanish: "esp",
      australian: "aus",
      british: "gbr",
      german: "deu",
      canadian: "can",
      japanese: "jpn",
      danish: "dnk",
      thai: "tha",
      chinese: "chn",
      french: "fra",
      finnish: "fin",
      american: "usa",
    };
    const nationString = nationality.toLowerCase();
    const nationISOCode = countryCodes[nationString];
    return nationISOCode;
  },
  smallDateFormat(dateString) {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const smallDate = `${month}/${day}`;

    return smallDate;
  },
  roundDisplayCalculator() {
    const totalRounds = f1Data.totalRounds();
    const currentRound = parseInt(f1Data.roundInDriverCache());
    const roundsLeft = totalRounds - currentRound;
    const maxDisplayRounds = 12;

    if (roundsLeft < maxDisplayRounds) {
      const remainder = roundsLeft % 2;
      if (remainder === 0) {
        const leftColumnStart = currentRound;
        const rightColumnStart = currentRound + roundsLeft / 2;
        const leftColumnRounds = currentRound + roundsLeft / 2;
        const rightColumnRounds = totalRounds;

        return [leftColumnStart, leftColumnRounds, rightColumnStart, rightColumnRounds];
      } else if (remainder !== 0) {
        const leftColumnStart = currentRound;
        const rightColumnStart = currentRound + Math.ceil(roundsLeft / 2);
        const leftColumnRounds = currentRound + Math.ceil(roundsLeft / 2);
        const rightColumnRounds = totalRounds;

        return [leftColumnStart, leftColumnRounds, rightColumnStart, rightColumnRounds];
      }
    } else {
      const leftColumnStart = currentRound;
      const rightColumnStart = currentRound + 6;
      const leftColumnRounds = currentRound + 6;
      const rightColumnRounds = rightColumnStart + 6;

      return [leftColumnStart, leftColumnRounds, rightColumnStart, rightColumnRounds];
    }
  },
  eventFormatter(event, date) {
    const eventDate = `${date.getMonth()}/${date.getDate()}`;
    const eventTime = `${date.toLocaleTimeString().slice(0, 5)} ${date.toLocaleTimeString().slice(-2)}`;
    const formattedEvent = `${eventDate} ${eventTime}: ${event}`;

    return formattedEvent;
  },
  sprintCheck() {
    const currentRound = f1Data.roundInDriverCache();
    const scheduleObj = cache.readSchedule();
    const currentRaceObj = scheduleObj.MRData.RaceTable.Races[currentRound];
    const currentRaceObjkeys = Object.keys(currentRaceObj);
    if (currentRaceObjkeys.includes("Sprint")) {
      return true;
    } else {
      return false;
    }
  },
  downloadImages() {
    const logoPathObj = file.teamLogos;
    const logoPaths = Object.values(logoPathObj);

    logoPaths.forEach((path) => {
      fileMgr.downloadFileFromiCloud(path);
    });
  },
};

const updater = {
  schedule() {
    const schedYear = f1Data.scheduleYear();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fileDate = file.getDate(file.schedule);

    if (schedYear < currentYear && fileDate < currentDate) {
      return true;
    } else {
      return false;
    }
  },
  standings() {
    const cachedDriverRound = parseInt(f1Data.roundInDriverCache());
    const cachedSchedDate = f1Data.scheduleRaceDate(cachedDriverRound);
    const calcRaceDate = cachedSchedDate + "T00:00:00.000";
    const calcRaceDateObj = new Date(calcRaceDate);
    const totalRounds = parseInt(f1Data.totalRounds());
    const currentDate = new Date();

    for (let i = cachedDriverRound; i < totalRounds; ) {
      const nextRaceDate = f1Data.scheduleRaceDate(i + 1);
      const nextRaceDateString = helper.dateFormat(nextRaceDate);
      const nextRaceDateObj = new Date(nextRaceDateString);

      if (currentDate > calcRaceDateObj && currentDate < nextRaceDateObj) {
        return true;
      } else {
        i++;
      }
    }
    return false;
  },
};

const viewData = {
  seasonSchedule: {
    seasonYear: f1Data.scheduleYear(),
    gpLocations: f1Data.scheduleGPLocs(),
    gpDate: f1Data.scheduleGPDates(),
    gpTime: f1Data.scheduleGPTimes(),
    gpDateTime: f1Data.scheduleGPDateTimes(),
    gpShortDate() {
      const gpDateTimes = f1Data.scheduleGPDateTimes();
      const shortDateStrings = [];

      for (const dateTime of gpDateTimes) {
        const smallDate = helper.smallDateFormat(dateTime);
        shortDateStrings.push(smallDate);
      }

      return shortDateStrings;
    },
  },
  upcomingGP: {
    seasonYear: f1Data.scheduleYear(),
    gpRound: f1Data.roundInConstructorCache() + 1,
    gpLocation: f1Data.nextGPLoc(),
    raceDate: f1Data.nextGPDate(),
    raceTime: f1Data.nextGPTime(),
    gpEventTitles: ["Practice 1", "Practice 2", "Practice 3", "Qualifying"],
    gpEvents: f1Data.nextGPEvents(),
  },
  driverStandings: {
    // Add flag/nationality and team logos
    seasonYear: f1Data.scheduleYear(),
    currentRound: f1Data.roundInDriverCache(),
    drivers: f1Data.driverStandingsNames(),
    positions: f1Data.driverStandingsPos(),
    points: f1Data.driverStandingsPoints(),
    wins: f1Data.driverStandingsWins(),
    teams: f1Data.driverStandingsTeams(),
    teamCodes: f1Data.driverStandingsTeamCodes(),
    nations: f1Data.driverNations(),
  },
  constructorStandings: {
    // add team logos
    seasonYear: f1Data.scheduleYear(),
    currentRound: f1Data.roundInConstructorCache(),
    teams: f1Data.constructorTeams(),
    positions: f1Data.constructorPositions(),
    points: f1Data.constructorPoints(),
    wins: f1Data.constructorWins(),
  },
};

const views = {
  showSeasonSchedule() {
    // shows the next 12 races
    const gpDates = viewData.seasonSchedule.gpShortDate();
    const gpLocs = viewData.seasonSchedule.gpLocations;
    const mainStack = widget.addStack();
    const column1 = mainStack.addStack();
    const column2 = mainStack.addStack();
    const roundNumberArray = helper.roundDisplayCalculator();
    const lColStart = roundNumberArray[0];
    const lColEnd = roundNumberArray[1];
    const rColStart = roundNumberArray[2];
    const rColEnd = roundNumberArray[3];

    mainStack.layoutHorizontally();
    column1.layoutVertically();
    column2.layoutVertically();
    mainStack.size = new Size(345, 158); // grab phone data (version or screen size) and calculate widget size
    column1.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    column2.size = new Size(mainStack.size.width / 2, mainStack.size.height);

    const col1LayoutRow = column1.addStack();
    col1LayoutRow.layoutHorizontally();
    const leftCol1 = col1LayoutRow.addStack();
    leftCol1.layoutVertically();
    leftCol1.size = new Size(column1.size.width / 3, mainStack.size.height);
    const rightCol1 = col1LayoutRow.addStack();
    rightCol1.layoutVertically();
    rightCol1.size = new Size(column1.size.width / 1.5, mainStack.size.height);

    const col2LayoutRow = column2.addStack();
    col2LayoutRow.layoutHorizontally();
    const leftCol2 = col2LayoutRow.addStack();
    leftCol2.layoutVertically();
    leftCol2.size = new Size(column2.size.width / 3, mainStack.size.height);
    const rightCol2 = col2LayoutRow.addStack();
    rightCol2.layoutVertically();
    rightCol2.size = new Size(column2.size.width / 1.5, mainStack.size.height);

    for (let i = lColStart; i < lColEnd; i++) {
      const rowL = leftCol1.addStack();
      const rowR = rightCol1.addStack();
      rowL.layoutHorizontally();
      rowR.layoutHorizontally();
      rowL.addSpacer(20);
      const rowDateText = rowL.addText(`${gpDates[i]}`);
      const rowLocText = rowR.addText(`${gpLocs[i]}`);
      rowDateText.font = Font.systemFont(12);
      rowLocText.font = Font.systemFont(12);
    }
    for (let i = rColStart; i < rColEnd; i++) {
      const rowL = leftCol2.addStack();
      const rowR = rightCol2.addStack();
      rowL.layoutHorizontally();
      rowL.layoutHorizontally();
      rowL.addSpacer(20);
      const rowDateText = rowL.addText(`${gpDates[i]}`);
      const rowLocText = rowR.addText(`${gpLocs[i]}`);
      rowDateText.font = Font.systemFont(12);
      rowLocText.font = Font.systemFont(12);
    }
  },
  showNextGP() {
    //shows date and time for the next GP
    const nextDateString = f1Data.nextGPDate();
    const nextTimeString = f1Data.nextGPTime();
    const combinedDTString = `${nextDateString}T${nextTimeString}`;
    const nextRaceDateObj = new Date(combinedDTString);
    const nextLoc = f1Data.nextGPLoc();
    const nextEvents = f1Data.nextGPEvents(); // format is an array of objects in the following order: 1st Practice, 2nd Practice, 3rd Practice, Qualifying

    const mainStack = widget.addStack();
    const leftCol = mainStack.addStack();
    const rightCol = mainStack.addStack();
    const logoRow = leftCol.addStack();

    mainStack.layoutHorizontally();
    leftCol.layoutVertically();
    rightCol.layoutVertically();
    logoRow.layoutHorizontally();

    mainStack.size = new Size(345, 158); // grab phone data (version or screen size) and calculate widget size
    leftCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    rightCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);

    const event1Row = leftCol.addStack();
    const event2Row = leftCol.addStack();
    const event3Row = rightCol.addStack();
    const event4Row = rightCol.addStack();
    const raceRow = rightCol.addStack();

    event1Row.layoutHorizontally();
    event2Row.layoutHorizontally();
    event3Row.layoutHorizontally();
    event4Row.layoutHorizontally();
    raceRow.layoutHorizontally();

    event1Row.addSpacer(20);
    event2Row.addSpacer(20);
    event3Row.addSpacer(20);
    event4Row.addSpacer(20);
    raceRow.addSpacer(20);

    const event1Text = event1Row.addText(helper.eventFormatter(nextEvents[0].eventOne, nextEvents[0].firstEventDT));
    const event2Text = event2Row.addText(helper.eventFormatter(nextEvents[1].eventTwo, nextEvents[1].secondEventDT));
    const event3Text = event3Row.addText(helper.eventFormatter(nextEvents[2].eventThree, nextEvents[2].thirdEventDT));
    const event4Text = event4Row.addText(helper.eventFormatter(nextEvents[3].eventFour, nextEvents[3].fourthEventDT));
    const event5Text = raceRow.addText(helper.eventFormatter("Grand Prix", nextRaceDateObj));

    event1Text.font = Font.systemFont(14);
    event2Text.font = Font.systemFont(14);
    event3Text.font = Font.systemFont(14);
    event4Text.font = Font.systemFont(14);
    event5Text.font = Font.systemFont(14);
  },
  showDriverStandings() {
    const driverNames = f1Data.driverStandingsNames();
    const driverPositions = f1Data.driverStandingsPos();
    const driverPoints = f1Data.driverStandingsPoints();
    const driverWins = f1Data.driverStandingsWins();
    const driverTeams = f1Data.driverStandingsTeams();
    const driverTeamCodes = f1Data.driverStandingsTeamCodes();
    const driverNations = f1Data.driverNations();

    const mainStack = widget.addStack();
    const leftCol = mainStack.addStack();
    const rightCol = mainStack.addStack();
    const logoRow = leftCol.addStack();
  },
  showConstructorStandings() {
    const f1FontLarge = new Font("Copperplate", 22);
    const f1FontSmall = new Font("Copperplate", 12);

    const constructorTeams = f1Data.constructorTeams();
    const constructorPositions = f1Data.constructorPositions();
    const constructorPoints = f1Data.constructorPoints();
    const constructorWins = f1Data.constructorWins();
    const constructorTeamCodes = f1Data.constructorTeamCodes();

    const logoRow = widget.addStack();
    const mainStack = widget.addStack();
    const leftCol = mainStack.addStack();
    const centerLine = mainStack.addStack();
    const rightCol = mainStack.addStack();
    const leftOrganizerRow = leftCol.addStack();
    const rightOrganizerRow = rightCol.addStack();
    const leftPosCol = leftOrganizerRow.addStack();
    const leftLogoCol = leftOrganizerRow.addStack();
    const leftTeamCol = leftOrganizerRow.addStack();
    const leftPointsCol = leftOrganizerRow.addStack();
    const rightPosCol = rightOrganizerRow.addStack();
    const rightLogoCol = rightOrganizerRow.addStack();
    const rightTeamCol = rightOrganizerRow.addStack();
    const rightPointsCol = rightOrganizerRow.addStack();

    logoRow.layoutHorizontally();
    mainStack.layoutHorizontally();
    leftCol.layoutVertically();
    centerLine.layoutVertically();
    rightCol.layoutVertically();
    leftOrganizerRow.layoutHorizontally();
    rightOrganizerRow.layoutHorizontally();
    leftPosCol.layoutVertically();
    leftTeamCol.layoutVertically();
    leftPointsCol.layoutVertically();
    leftLogoCol.layoutVertically();
    rightPosCol.layoutVertically();
    rightTeamCol.layoutVertically();
    rightPointsCol.layoutVertically();
    rightLogoCol.layoutVertically();

    logoRow.size = new Size(345, 30);
    mainStack.size = new Size(345, 128); // grab phone data (version or screen size) and calculate widget size
    leftCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    centerLine.size = new Size(1, mainStack.size.height * 0.8);
    rightCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    leftOrganizerRow.size = new Size(leftCol.size.width, leftCol.size.height);
    rightOrganizerRow.size = new Size(rightCol.size.width, rightCol.size.height);
    leftPosCol.size = new Size(leftOrganizerRow.size.width / 8, leftOrganizerRow.size.height);
    leftTeamCol.size = new Size(leftOrganizerRow.size.width / 2, leftOrganizerRow.size.height);
    leftPointsCol.size = new Size(leftOrganizerRow.size.width / 8, leftOrganizerRow.size.height);
    leftLogoCol.size = new Size(leftOrganizerRow.size.width / 5, leftOrganizerRow.size.height);
    rightPosCol.size = new Size(rightOrganizerRow.size.width / 8, rightOrganizerRow.size.height);
    rightTeamCol.size = new Size(rightOrganizerRow.size.width / 2, rightOrganizerRow.size.height);
    rightPointsCol.size = new Size(rightOrganizerRow.size.width / 8, rightOrganizerRow.size.height);
    rightLogoCol.size = new Size(rightOrganizerRow.size.width / 5, rightOrganizerRow.size.height);

    // Logo Row Settings
    logoRow.centerAlignContent();

    logoRow.addSpacer();
    const f1Logo = logoRow.addImage(fileMgr.readImage(file.f1Logo));
    logoRow.addSpacer();
    const logoText = logoRow.addText("Constructor Standings");
    logoRow.addSpacer();

    f1Logo.imageSize = new Size(40, 40);
    logoText.font = f1FontLarge;

    // Main Stack Settings

    const totalTeams = constructorTeams.length;
    let leftTeams = 0;
    let rightTeams = 0;

    if (totalTeams % 2 === 0) {
      leftTeams = totalTeams / 2;
      rightTeams = totalTeams / 2;
    } else {
      leftTeams = Math.ceil(totalTeams / 2);
      rightTeams = Math.floor(totalTeams / 2);
    }

    for (let i = 0; i < leftTeams; i++) {
      const rowPos = leftPosCol.addStack();
      const rowTeam = leftTeamCol.addStack();
      const rowPoints = leftPointsCol.addStack();
      const rowLogo = leftLogoCol.addStack();

      rowPos.centerAlignContent();
      rowTeam.centerAlignContent();
      rowPoints.centerAlignContent();
      rowLogo.centerAlignContent();

      rowPos.layoutHorizontally();
      rowTeam.layoutHorizontally();
      rowPoints.layoutHorizontally();
      rowLogo.layoutHorizontally();

      rowPos.size = new Size(leftPosCol.size.width, leftPosCol.size.height / leftTeams);
      rowLogo.size = new Size(leftLogoCol.size.width, leftLogoCol.size.height / leftTeams);
      rowTeam.size = new Size(leftTeamCol.size.width, leftTeamCol.size.height / leftTeams);
      rowPoints.size = new Size(leftPointsCol.size.width, leftPointsCol.size.height / leftTeams);

      const posText = rowPos.addText(`${constructorPositions[i]}`);
      const teamText = rowTeam.addText(`${constructorTeams[i]}`);
      const pointsText = rowPoints.addText(`${constructorPoints[i]}`);

      rowTeam.addSpacer();

      posText.font = f1FontSmall;
      teamText.font = f1FontSmall;
      pointsText.font = f1FontSmall;

      posText.centerAlignText();
      teamText.centerAlignText();
      pointsText.centerAlignText();

      const logoPath = file.logos[constructorTeamCodes[i]];
      const logoImage = fileMgr.readImage(logoPath);

      const logo = rowLogo.addImage(logoImage);
      logo.imageSize = new Size(20, 20);
    }

    for (let i = rightTeams; i < totalTeams; i++) {
      const rowPos = rightPosCol.addStack();
      const rowTeam = rightTeamCol.addStack();
      const rowPoints = rightPointsCol.addStack();
      const rowLogo = rightLogoCol.addStack();

      rowPos.layoutHorizontally();
      rowTeam.layoutHorizontally();
      rowPoints.layoutHorizontally();
      rowLogo.layoutHorizontally();

      rowPos.centerAlignContent();
      rowTeam.centerAlignContent();
      rowPoints.centerAlignContent();
      rowLogo.centerAlignContent();

      rowPos.size = new Size(rightPosCol.size.width, rightPosCol.size.height / rightTeams);
      rowLogo.size = new Size(rightLogoCol.size.width, rightLogoCol.size.height / rightTeams);
      rowTeam.size = new Size(rightTeamCol.size.width, rightTeamCol.size.height / rightTeams);
      rowPoints.size = new Size(rightPointsCol.size.width, rightPointsCol.size.height / rightTeams);

      const posText = rowPos.addText(`${constructorPositions[i]}`);
      const teamText = rowTeam.addText(`${constructorTeams[i]}`);
      const pointsText = rowPoints.addText(`${constructorPoints[i]}`);

      rowTeam.addSpacer();

      posText.font = f1FontSmall;
      teamText.font = f1FontSmall;
      pointsText.font = f1FontSmall;

      posText.centerAlignText();
      teamText.centerAlignText();
      pointsText.centerAlignText();

      const logoPath = file.logos[constructorTeamCodes[i]];
      const logoImage = fileMgr.readImage(logoPath);
      console.log[i];
      console.log[logoPath];

      const logo = rowLogo.addImage(logoImage);
      logo.imageSize = new Size(20, 25);

      mainStack.backgroundColor = new Color("99bbffff"); // placeholder color until I can implement a color picking function
    }
  },
};

const app = {
  init() {
    return;
  },
};

await requests.scheduleRequest();
await requests.constructorRequest();
await requests.driversRequest();
await cache.downloadCache(file.schedule); // can implement a check to see if the file is downloaded
await cache.downloadCache(file.driverStandings);
await cache.downloadCache(file.constructorStandings);
await helper.downloadImages();

if (config.runsInApp) widget.presentMedium();
else if (config.runsInWidget) Script.setWidget(widget);
