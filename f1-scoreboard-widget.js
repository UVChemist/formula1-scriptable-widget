// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: car;
const widget = new ListWidget();
const fileMgr = FileManager.iCloud();
const appDir = fileMgr.documentsDirectory();

const file = {
  schedule: fileMgr.joinPath(appDir, "f1-widget-files/cache/schedule-cache.json"),
  driverStandings: fileMgr.joinPath(appDir, "f1-widget-files/cache/driver-cache.json"),
  constructorStandings: fileMgr.joinPath(appDir, "f1-widget-files/cache/constructor-cache.json"),
  flagImages: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/"),
  teamLogos: fileMgr.joinPath(appDir, "f1-widget-files/team-logos"),
  f1Logo: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/f1.png"),
  logos: {
    mercedes: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/mercedes.png"),
    red_bull: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/redbull.png"),
    ferrari: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/ferrari.png"),
    mclaren: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/mclaren.png"),
    aston_martin: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/astonmartin.png"),
    alpine: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/alpine.png"),
    rb: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/alphatauri.png"),
    sauber: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/sauber.png"),
    haas: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/haas.png"),
    williams: fileMgr.joinPath(appDir, "f1-widget-files/team-logos/williams.png"),
  },
  flags: {
    aus: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/aus.png"),
    can: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/can.png"),
    chn: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/chn.png"),
    deu: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/deu.png"),
    dnk: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/dnk.png"),
    esp: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/esp.png"),
    fin: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/fin.png"),
    fra: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/fra.png"),
    gbr: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/gbr.png"),
    jpn: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/jpn.png"),
    mco: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/mco.png"),
    mex: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/mex.png"),
    nld: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/nld.png"),
    tha: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/tha.png"),
    usa: fileMgr.joinPath(appDir, "f1-widget-files/driver-flags/usa.png"),
  },
  tracks: {
    albert_park: fileMgr.joinPath(appDir, "f1-widget-files/tracks/albert_park.png"),
    americas: fileMgr.joinPath(appDir, "f1-widget-files/tracks/americas.png"),
    bahrain: fileMgr.joinPath(appDir, "f1-widget-files/tracks/bahrain.png"),
    baku: fileMgr.joinPath(appDir, "f1-widget-files/tracks/baku.png"),
    catalunya: fileMgr.joinPath(appDir, "f1-widget-files/tracks/catalunya.png"),
    hungaroring: fileMgr.joinPath(appDir, "f1-widget-files/tracks/hungaroring.png"),
    imola: fileMgr.joinPath(appDir, "f1-widget-files/tracks/imola.png"),
    interlagos: fileMgr.joinPath(appDir, "f1-widget-files/tracks/interlagos.png"),
    jeddah: fileMgr.joinPath(appDir, "f1-widget-files/tracks/jeddah.png"),
    losail: fileMgr.joinPath(appDir, "f1-widget-files/tracks/losail.png"),
    marina_bay: fileMgr.joinPath(appDir, "f1-widget-files/tracks/marina_bay.png"),
    miami: fileMgr.joinPath(appDir, "f1-widget-files/tracks/miami.png"),
    monaco: fileMgr.joinPath(appDir, "f1-widget-files/tracks/monaco.png"),
    monza: fileMgr.joinPath(appDir, "f1-widget-files/tracks/monza.png"),
    red_bull_ring: fileMgr.joinPath(appDir, "f1-widget-files/tracks/red_bull_ring.png"),
    rodriguez: fileMgr.joinPath(appDir, "f1-widget-files/tracks/rodriguez.png"),
    shanghai: fileMgr.joinPath(appDir, "f1-widget-files/tracks/shanghai.png"),
    silverstone: fileMgr.joinPath(appDir, "f1-widget-files/tracks/silverstone.png"),
    spa: fileMgr.joinPath(appDir, "f1-widget-files/tracks/spa.png"),
    suzuka: fileMgr.joinPath(appDir, "f1-widget-files/tracks/suzuka.png"),
    vegas: fileMgr.joinPath(appDir, "f1-widget-files/tracks/vegas.png"),
    villeneuve: fileMgr.joinPath(appDir, "f1-widget-files/tracks/villeneuve.png"),
    yas_marina: fileMgr.joinPath(appDir, "f1-widget-files/tracks/yas_marina.png"),
    zandvoort: fileMgr.joinPath(appDir, "f1-widget-files/tracks/zandvoort.png"),
  },
  getDate(filePath) {
    const createDate = fileMgr.creationDate(filePath);

    return createDate;
  },
};

const cache = {
  check(filePath) {
    if (fileMgr.fileExists(filePath)) {
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
      const adjString = race.raceName.slice(0, -10);
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
  nextGPTrackID(round) {
    const nextRound = round;
    const scheduleObj = cache.readSchedule();
    const trackID = scheduleObj.MRData.RaceTable.Races[nextRound].Circuit.circuitId;

    return trackID;
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

      const eventOneObj = { event: eventOne, date: firstEventDT };
      const eventTwoObj = { event: eventTwo, date: secondEventDT };
      const eventThreeObj = { event: eventThree, date: thirdEventDT };
      const eventFourObj = { event: eventFour, date: fourthEventDT };

      events.push(eventOneObj, eventTwoObj, eventThreeObj, eventFourObj);
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

      const eventOneObj = { event: eventOne, date: firstEventDT };
      const eventTwoObj = { event: eventTwo, date: secondEventDT };
      const eventThreeObj = { event: eventThree, date: thirdEventDT };
      const eventFourObj = { event: eventFour, date: fourthEventDT };

      events.push(eventOneObj, eventTwoObj, eventThreeObj, eventFourObj);
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
  driverStandingsSurnames() {
    const driverSurnames = [];
    const driverStandingsObj = cache.readDriverStandings();
    const driverStandingsArr = driverStandingsObj.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const standing of driverStandingsArr) {
      const driverLName = standing.Driver.familyName;
      driverSurnames.push(driverLName);
    }

    return driverSurnames;
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
      try {
        const apiReq = new Request(scheduleURL);
        const apiObj = await apiReq.loadJSON();
        const apiCache = JSON.stringify(apiObj);
        cache.saveResponse(file.schedule, apiCache);
        console.log("Schedule downloaded and saved to cache");
      } catch (error) {
        console.log("Error downloading schedule: ", error);
      }
    } else if (check === true && needToUpdate === true) {
      try {
        const apiReq = new Request(scheduleURL);
        const apiObj = await apiReq.loadJSON();
        const apiCache = JSON.stringify(apiObj);
        cache.saveResponse(file.schedule, apiCache);
      } catch (error) {
        console.log("Error downloading schedule: ", error);
      }
    } else {
      cache.readSchedule();
    }
  },
  async driversRequest() {
    const check = cache.check(file.driverStandings);
    const needToUpdate = updater.standings();
    const driverURL = "http://ergast.com/api/f1/current/driverStandings.json";

    if (check === false) {
      try {
        const apiReq = new Request(driverURL);
        const apiObj = await apiReq.loadJSON();
        const apiCache = JSON.stringify(apiObj);
        cache.saveResponse(file.driverStandings, apiCache);
        console.log("Driver Standings downloaded and saved to cache");
      } catch (error) {
        console.log("Error downloading driver standings: ", error);
      }
    } else if (check === true && needToUpdate === true) {
      try {
        const apiReq = new Request(driverURL);
        const apiObj = await apiReq.loadJSON();
        const apiCache = JSON.stringify(apiObj);
        cache.saveResponse(file.driverStandings, apiCache);
        console.log("Driver Standings downloaded and saved to cache");
      } catch (error) {
        console.log("Error downloading driver standings: ", error);
      }
    } else {
      cache.readDriverStandings();
    }
  },
  async constructorRequest() {
    const check = cache.check(file.constructorStandings);
    const needToUpdate = updater.standings();
    const constructorURL = "http://ergast.com/api/f1/current/constructorStandings.json";

    if (check === false) {
      try {
        const apiReq = new Request(constructorURL);
        const apiObj = await apiReq.loadJSON();
        const apiCache = JSON.stringify(apiObj);
        cache.saveResponse(file.constructorStandings, apiCache);
        console.log("Constructor Standings downloaded and saved to cache");
      } catch (error) {
        console.log("Error downloading constructor standings: ", error);
      }
    } else if (check === true && needToUpdate === true) {
      try {
        const apiReq = new Request(constructorURL);
        const apiObj = await apiReq.loadJSON();
        const apiCache = JSON.stringify(apiObj);
        cache.saveResponse(file.constructorStandings, apiCache);
        console.log("Constructor Standings downloaded and saved to cache");
      } catch (error) {
        console.log("Error downloading constructor standings: ", error);
      }
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
  smallDateFormat(date) {
    if (typeof date === "string") {
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const smallDate = `${month}/${day}`;

      return smallDate;
    } else if (typeof date === "object") {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const smallDate = `${month}/${day}`;

      return smallDate;
    }
  },
  roundDisplayCalculator() {
    //remove this function as it will not be used since the current font allows for all 24 rounds to be displayed
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
  async downloadImages() {
    const logoPathObj = file.teamLogos;
    const logoPaths = Object.values(logoPathObj);

    logoPaths.forEach((path) => {
      fileMgr.downloadFileFromiCloud(path);
    });

    const flagPathObj = file.flags;
    const flagPaths = Object.values(flagPathObj);

    flagPaths.forEach((path) => {
      fileMgr.downloadFileFromiCloud(path);
    });

    const trackPathObj = file.tracks;
    const trackPaths = Object.values(trackPathObj);

    trackPaths.forEach((path) => {
      fileMgr.downloadFileFromiCloud(path);
    });
  },
  timeFormatter(dateObj) {
    const timeString = dateObj.toLocaleTimeString();

    if (timeString.length === 10) {
      const formattedTime = timeString.slice(0, 4) + " " + timeString.slice(-2);
      return formattedTime;
    } else if (timeString.length === 11) {
      const formattedTime = timeString.slice(0, 5) + " " + timeString.slice(-2);
      return formattedTime;
    }
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
    driverSurnames: f1Data.driverStandingsSurnames(),
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
    const f1Font22 = new Font("Copperplate", 22);
    const f1Font16 = new Font("Copperplate-Bold", 16);
    const f1Font14 = new Font("Copperplate", 14);
    const f1Font12 = new Font("Copperplate", 12);

    const gpDates = viewData.seasonSchedule.gpShortDate();
    const gpLocs = viewData.seasonSchedule.gpLocations;
    const currentYear = f1Data.scheduleYear();
    const totalRounds = f1Data.totalRounds();
    const halfRounds = Math.ceil(totalRounds / 2);

    const logoRow = widget.addStack();
    const mainStack = widget.addStack();
    //mainStack.addSpacer();
    const leftCol = mainStack.addStack();
    const rightCol = mainStack.addStack();
    //mainStack.addSpacer();
    const leftOrganizerRow = leftCol.addStack();
    const rightOrganizerRow = rightCol.addStack();
    leftOrganizerRow.addSpacer();
    const leftDateCol = leftOrganizerRow.addStack();
    const leftGPCol = leftOrganizerRow.addStack();
    const rightDateCol = rightOrganizerRow.addStack();
    const rightGPCol = rightOrganizerRow.addStack();
    rightOrganizerRow.addSpacer();

    logoRow.layoutHorizontally();
    mainStack.layoutHorizontally();
    leftCol.layoutVertically();
    rightCol.layoutVertically();
    leftOrganizerRow.layoutHorizontally();
    rightOrganizerRow.layoutHorizontally();
    leftDateCol.layoutVertically();
    leftGPCol.layoutVertically();
    rightDateCol.layoutVertically();
    rightGPCol.layoutVertically();

    logoRow.size = new Size(345, 30);
    mainStack.size = new Size(345, 128); // grab phone data (version or screen size) and calculate widget size
    leftCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    rightCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    leftOrganizerRow.size = new Size(leftCol.size.width, leftCol.size.height);
    rightOrganizerRow.size = new Size(rightCol.size.width, rightCol.size.height);
    leftDateCol.size = new Size(leftOrganizerRow.size.width / 4, leftOrganizerRow.size.height);
    leftGPCol.size = new Size(leftOrganizerRow.size.width / 2, leftOrganizerRow.size.height);
    rightDateCol.size = new Size(rightOrganizerRow.size.width / 4, rightOrganizerRow.size.height);
    rightGPCol.size = new Size(rightOrganizerRow.size.width / 2, rightOrganizerRow.size.height);

    // Logo Row Settings
    logoRow.centerAlignContent();

    logoRow.addSpacer();
    const f1Logo = logoRow.addImage(fileMgr.readImage(file.f1Logo));
    logoRow.addSpacer(10);
    const logoText = logoRow.addText(`${currentYear} GP Schedule`);
    logoRow.addSpacer();

    f1Logo.imageSize = new Size(40, 40);
    logoText.font = f1Font22;

    for (let i = 0; i < halfRounds; i++) {
      const dateRow = leftDateCol.addStack();
      const gpRow = leftGPCol.addStack();

      dateRow.size = new Size(leftDateCol.size.width, leftDateCol.size.height / halfRounds);
      gpRow.size = new Size(leftGPCol.size.width, leftGPCol.size.height / halfRounds);

      const dateText = dateRow.addText(`${gpDates[i]}`);
      const gpText = gpRow.addText(`${gpLocs[i]}`);

      dateRow.layoutHorizontally();
      gpRow.layoutHorizontally();

      dateRow.addSpacer();
      gpRow.addSpacer();

      dateText.font = f1Font12;
      gpText.font = f1Font12;
    }
    for (let i = halfRounds; i < totalRounds; i++) {
      const dateRow = rightDateCol.addStack();
      const gpRow = rightGPCol.addStack();

      dateRow.size = new Size(rightDateCol.size.width, rightDateCol.size.height / halfRounds);
      gpRow.size = new Size(rightGPCol.size.width, rightGPCol.size.height / halfRounds);

      const dateText = dateRow.addText(`${gpDates[i]}`);
      const gpText = gpRow.addText(`${gpLocs[i]}`);

      dateRow.layoutHorizontally();
      gpRow.layoutHorizontally();

      dateRow.addSpacer();
      gpRow.addSpacer();

      dateText.font = f1Font12;
      gpText.font = f1Font12;
    }

    widget.backgroundColor = new Color("99bbffff"); // placeholder color until I can implement a color picking function
  },
  showNextGP() {
    //shows date and time for the next GP
    const f1Font22 = new Font("Copperplate", 22);
    const f1Font16 = new Font("Copperplate-Bold", 16);
    const f1Font14 = new Font("Copperplate", 14);
    const f1Font12 = new Font("Copperplate", 12);

    const nextDateString = f1Data.nextGPDate();
    const nextTimeString = f1Data.nextGPTime();
    const combinedDTString = `${nextDateString}T${nextTimeString}`;
    const nextRaceDateObj = new Date(combinedDTString);
    const nextLoc = f1Data.nextGPLoc();
    const nextEvents = f1Data.nextGPEvents(); // format is an array of objects in the following order: 1st Practice, 2nd Practice, 3rd Practice, Qualifying
    const currentRound = parseInt(f1Data.roundInDriverCache());
    const nextTrackID = f1Data.nextGPTrackID(currentRound);

    const logoRow = widget.addStack();
    const mainStack = widget.addStack();
    mainStack.addSpacer();
    const leftCol = mainStack.addStack();
    const rightCol = mainStack.addStack();
    mainStack.addSpacer();
    const leftOrganizerRow = leftCol.addStack();
    const eventDateCol = leftOrganizerRow.addStack();
    const eventNameCol = leftOrganizerRow.addStack();
    const eventTimeCol = leftOrganizerRow.addStack();
    const gpRow = rightCol.addStack();
    const gpDateTimeRow = rightCol.addStack();
    const gpTrackRow = rightCol.addStack();

    logoRow.layoutHorizontally();
    mainStack.layoutHorizontally();
    leftCol.layoutVertically();
    rightCol.layoutVertically();
    leftOrganizerRow.layoutHorizontally();
    eventDateCol.layoutVertically();
    eventNameCol.layoutVertically();
    eventTimeCol.layoutVertically();
    gpRow.layoutHorizontally();
    gpDateTimeRow.layoutHorizontally();
    gpTrackRow.layoutHorizontally();

    logoRow.size = new Size(345, 30);
    mainStack.size = new Size(345, 128); // grab phone data (version or screen size) and calculate widget size
    leftCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    rightCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    leftOrganizerRow.size = new Size(leftCol.size.width, leftCol.size.height);
    eventDateCol.size = new Size(leftOrganizerRow.size.width / 6, leftOrganizerRow.size.height);
    eventNameCol.size = new Size(leftOrganizerRow.size.width / 2, leftOrganizerRow.size.height);
    eventTimeCol.size = new Size(leftOrganizerRow.size.width / 3, leftOrganizerRow.size.height);
    gpRow.size = new Size(rightCol.size.width, rightCol.size.height / 3.5);
    gpDateTimeRow.size = new Size(rightCol.size.width, rightCol.size.height / 10);
    gpTrackRow.size = new Size(rightCol.size.width, rightCol.size.height / 1.8);

    // Logo Row Settings
    logoRow.centerAlignContent();

    logoRow.addSpacer();
    const f1Logo = logoRow.addImage(fileMgr.readImage(file.f1Logo));
    logoRow.addSpacer(10);
    const logoText = logoRow.addText(`Round ${currentRound + 1} Schedule`);
    logoRow.addSpacer();

    f1Logo.imageSize = new Size(40, 40);
    logoText.font = f1Font22;

    // Main Stack Settings
    const preRaceEvents = 4;

    for (let i = 0; i < preRaceEvents; i++) {
      const event = nextEvents[i].event;
      const eventDateObj = nextEvents[i].date;
      const eventSmallDate = helper.smallDateFormat(eventDateObj);
      const eventTime = helper.timeFormatter(eventDateObj);

      const rowDate = eventDateCol.addStack();
      const rowEvent = eventNameCol.addStack();
      const rowTime = eventTimeCol.addStack();

      rowDate.centerAlignContent();
      rowEvent.centerAlignContent();
      rowTime.centerAlignContent();

      rowDate.layoutHorizontally();
      rowEvent.layoutHorizontally();
      rowTime.layoutHorizontally();

      rowDate.size = new Size(eventDateCol.size.width, eventDateCol.size.height / 4);
      rowEvent.size = new Size(eventNameCol.size.width, eventNameCol.size.height / 4);
      rowTime.size = new Size(eventTimeCol.size.width, eventTimeCol.size.height / 4);

      const dateText = rowDate.addText(eventSmallDate);
      const eventText = rowEvent.addText(event);
      const timeText = rowTime.addText(eventTime);

      dateText.font = f1Font12;
      eventText.font = f1Font14;
      timeText.font = f1Font12;

      dateText.centerAlignText();
      eventText.leftAlignText();
      timeText.centerAlignText();
    }

    const gpSmallDate = helper.smallDateFormat(nextRaceDateObj);
    const gpTime = helper.timeFormatter(nextRaceDateObj);

    const gpRowText = gpRow.addText(nextLoc);
    const gpDateTimeText = gpDateTimeRow.addText(`${gpSmallDate} ${gpTime}`);

    gpRowText.font = f1Font16;
    gpDateTimeText.font = f1Font12;

    gpRowText.centerAlignText();
    gpDateTimeText.centerAlignText();
    gpTrackRow.centerAlignContent();

    const loadTrackImage = fileMgr.readImage(file.tracks[nextTrackID]);
    const trackImage = gpTrackRow.addImage(loadTrackImage);

    trackImage.applyFittingContentMode();

    widget.backgroundColor = new Color("99bbffff"); // placeholder color until I can implement a color picking function
    //centerLine.backgroundColor = new Color("ffffff");
  },
  showDriverStandings() {
    const f1Font22 = new Font("Copperplate", 22);
    const f1Font12 = new Font("Copperplate", 12);
    const f1Font10 = new Font("Copperplate", 10);

    const driverPositions = f1Data.driverStandingsPos();
    const driverNations = f1Data.driverNations();
    const driverNames = f1Data.driverStandingsSurnames();
    const driverPoints = f1Data.driverStandingsPoints();
    const driverWins = f1Data.driverStandingsWins();
    const driverTeams = f1Data.driverStandingsTeams();
    const driverTeamCodes = f1Data.driverStandingsTeamCodes();

    const logoRow = widget.addStack();
    const mainStack = widget.addStack();
    const leftCol = mainStack.addStack();
    mainStack.addSpacer();
    const centerLine = mainStack.addStack();
    mainStack.addSpacer();
    const rightCol = mainStack.addStack();
    const leftOrganizerRow = leftCol.addStack();
    const rightOrganizerRow = rightCol.addStack();
    leftOrganizerRow.addSpacer();
    const leftPosCol = leftOrganizerRow.addStack();
    const leftFlagCol = leftOrganizerRow.addStack();
    const leftNameCol = leftOrganizerRow.addStack();
    const leftPointsCol = leftOrganizerRow.addStack();
    const rightPosCol = rightOrganizerRow.addStack();
    const rightFlagCol = rightOrganizerRow.addStack();
    const rightNameCol = rightOrganizerRow.addStack();
    const rightPointsCol = rightOrganizerRow.addStack();
    rightOrganizerRow.addSpacer();

    logoRow.layoutHorizontally();
    mainStack.layoutHorizontally();
    leftCol.layoutVertically();
    centerLine.layoutVertically();
    rightCol.layoutVertically();
    leftOrganizerRow.layoutHorizontally();
    rightOrganizerRow.layoutHorizontally();
    leftPosCol.layoutVertically();
    leftFlagCol.layoutVertically();
    leftNameCol.layoutVertically();
    leftPointsCol.layoutVertically();
    rightPosCol.layoutVertically();
    rightFlagCol.layoutVertically();
    rightNameCol.layoutVertically();
    rightPointsCol.layoutVertically();

    logoRow.size = new Size(345, 30);
    mainStack.size = new Size(345, 128); // grab phone data (version or screen size) and calculate widget size
    leftCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    centerLine.size = new Size(0.5, mainStack.size.height);
    rightCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    leftOrganizerRow.size = new Size(leftCol.size.width, leftCol.size.height);
    rightOrganizerRow.size = new Size(rightCol.size.width, rightCol.size.height);
    leftPosCol.size = new Size(leftOrganizerRow.size.width / 8, leftOrganizerRow.size.height);
    leftFlagCol.size = new Size(leftOrganizerRow.size.width / 5, leftOrganizerRow.size.height);
    leftNameCol.size = new Size(leftOrganizerRow.size.width / 2.2, leftOrganizerRow.size.height);
    leftPointsCol.size = new Size(leftOrganizerRow.size.width / 6, leftOrganizerRow.size.height);
    rightPosCol.size = new Size(rightOrganizerRow.size.width / 8, rightOrganizerRow.size.height);
    rightFlagCol.size = new Size(rightOrganizerRow.size.width / 5, rightOrganizerRow.size.height);
    rightNameCol.size = new Size(rightOrganizerRow.size.width / 2.2, rightOrganizerRow.size.height);
    rightPointsCol.size = new Size(rightOrganizerRow.size.width / 6, rightOrganizerRow.size.height);

    // Logo Row Settings
    logoRow.centerAlignContent();

    logoRow.addSpacer();
    const f1Logo = logoRow.addImage(fileMgr.readImage(file.f1Logo));
    logoRow.addSpacer();
    const logoText = logoRow.addText("Constructor Standings");
    logoRow.addSpacer();

    f1Logo.imageSize = new Size(40, 40);
    logoText.font = f1Font22;

    // Main Stack Settings
    const totalDrivers = driverNames.length;
    let leftDrivers = 0;
    let rightDrivers = 0;

    if (totalDrivers % 2 === 0) {
      leftDrivers = totalDrivers / 2;
      rightDrivers = totalDrivers / 2;
    } else {
      leftDrivers = Math.ceil(totalDrivers / 2);
      rightDrivers = Math.ceil(totalDrivers / 2);
    }

    for (let i = 0; i < leftDrivers; i++) {
      const rowPos = leftPosCol.addStack();
      const rowFlag = leftFlagCol.addStack();
      const rowName = leftNameCol.addStack();
      const rowPoints = leftPointsCol.addStack();

      rowPos.centerAlignContent();
      rowFlag.centerAlignContent();
      rowName.centerAlignContent();
      rowPoints.centerAlignContent();

      rowPos.layoutHorizontally();
      rowFlag.layoutHorizontally();
      rowName.layoutHorizontally();
      rowPoints.layoutHorizontally();

      rowPos.size = new Size(leftPosCol.size.width, leftPosCol.size.height / leftDrivers);
      rowFlag.size = new Size(leftFlagCol.size.width, leftFlagCol.size.height / leftDrivers);
      rowName.size = new Size(leftNameCol.size.width, leftNameCol.size.height / leftDrivers);
      rowPoints.size = new Size(leftPointsCol.size.width, leftPointsCol.size.height / leftDrivers);

      const posText = rowPos.addText(`${driverPositions[i]}`);
      const nameText = rowName.addText(`${driverNames[i]}`);
      const pointsText = rowPoints.addText(`${driverPoints[i]}`);

      rowName.addSpacer();

      posText.font = f1Font12;
      nameText.font = f1Font12;
      pointsText.font = f1Font12;

      posText.centerAlignText();
      nameText.centerAlignText();
      pointsText.centerAlignText();

      const flagPath = file.flags[driverNations[i]]; // CREATE FLAG IMAGE PATHS
      const flagImage = fileMgr.readImage(flagPath);

      const flag = rowFlag.addImage(flagImage);
      flag.imageSize = new Size(15, 15);
    }

    for (let i = rightDrivers; i < totalDrivers; i++) {
      const rowPos = rightPosCol.addStack();
      const rowFlag = rightFlagCol.addStack();
      const rowName = rightNameCol.addStack();
      const rowPoints = rightPointsCol.addStack();

      rowPos.layoutHorizontally();
      rowFlag.layoutHorizontally();
      rowName.layoutHorizontally();
      rowPoints.layoutHorizontally();

      rowPos.centerAlignContent();
      rowFlag.centerAlignContent();
      rowName.centerAlignContent();
      rowPoints.centerAlignContent();

      rowPos.size = new Size(rightPosCol.size.width, rightPosCol.size.height / rightDrivers);
      rowFlag.size = new Size(rightFlagCol.size.width, rightFlagCol.size.height / rightDrivers);
      rowName.size = new Size(rightNameCol.size.width, rightNameCol.size.height / rightDrivers);
      rowPoints.size = new Size(rightPointsCol.size.width, rightPointsCol.size.height / rightDrivers);

      const posText = rowPos.addText(`${driverPositions[i]}`);
      const nameText = rowName.addText(`${driverNames[i]}`);
      const pointsText = rowPoints.addText(`${driverPoints[i]}`);

      rowName.addSpacer();

      posText.font = f1Font12;
      nameText.font = f1Font12;
      pointsText.font = f1Font12;

      posText.centerAlignText();
      nameText.centerAlignText();
      pointsText.centerAlignText();

      const flagPath = file.flags[driverNations[i]];
      const flagImage = fileMgr.readImage(flagPath);
      console.log[i];
      console.log[flagPath];

      const flag = rowFlag.addImage(flagImage);
      flag.imageSize = new Size(15, 15);
    }

    if (totalDrivers % 2 !== 0) {
      rightCol.addSpacer(12);
    }

    widget.backgroundColor = new Color("99bbffff"); // placeholder color until I can implement a color picking function
    centerLine.backgroundColor = new Color("ffffff");
  },
  showConstructorStandings() {
    const f1Font22 = new Font("Copperplate", 22);
    const f1Font12 = new Font("Copperplate", 12);

    const constructorTeams = f1Data.constructorTeams();
    const constructorPositions = f1Data.constructorPositions();
    const constructorPoints = f1Data.constructorPoints();
    const constructorWins = f1Data.constructorWins();
    const constructorTeamCodes = f1Data.constructorTeamCodes();

    const logoRow = widget.addStack();
    const mainStack = widget.addStack();
    const leftCol = mainStack.addStack();
    mainStack.addSpacer();
    const centerLine = mainStack.addStack();
    mainStack.addSpacer();
    const rightCol = mainStack.addStack();
    const leftOrganizerRow = leftCol.addStack();
    const rightOrganizerRow = rightCol.addStack();
    leftOrganizerRow.addSpacer();
    const leftPosCol = leftOrganizerRow.addStack();
    const leftLogoCol = leftOrganizerRow.addStack();
    const leftTeamCol = leftOrganizerRow.addStack();
    const leftPointsCol = leftOrganizerRow.addStack();
    const rightPosCol = rightOrganizerRow.addStack();
    const rightLogoCol = rightOrganizerRow.addStack();
    const rightTeamCol = rightOrganizerRow.addStack();
    const rightPointsCol = rightOrganizerRow.addStack();
    rightOrganizerRow.addSpacer();

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
    centerLine.size = new Size(0.5, mainStack.size.height);
    rightCol.size = new Size(mainStack.size.width / 2, mainStack.size.height);
    leftOrganizerRow.size = new Size(leftCol.size.width, leftCol.size.height);
    rightOrganizerRow.size = new Size(rightCol.size.width, rightCol.size.height);
    leftPosCol.size = new Size(leftOrganizerRow.size.width / 8, leftOrganizerRow.size.height);
    leftTeamCol.size = new Size(leftOrganizerRow.size.width / 2, leftOrganizerRow.size.height);
    leftPointsCol.size = new Size(leftOrganizerRow.size.width / 6, leftOrganizerRow.size.height);
    leftLogoCol.size = new Size(leftOrganizerRow.size.width / 5, leftOrganizerRow.size.height);
    rightPosCol.size = new Size(rightOrganizerRow.size.width / 8, rightOrganizerRow.size.height);
    rightTeamCol.size = new Size(rightOrganizerRow.size.width / 2, rightOrganizerRow.size.height);
    rightPointsCol.size = new Size(rightOrganizerRow.size.width / 6, rightOrganizerRow.size.height);
    rightLogoCol.size = new Size(rightOrganizerRow.size.width / 5, rightOrganizerRow.size.height);

    // Logo Row Settings
    logoRow.centerAlignContent();

    logoRow.addSpacer();
    const f1Logo = logoRow.addImage(fileMgr.readImage(file.f1Logo));
    logoRow.addSpacer();
    const logoText = logoRow.addText("Constructor Standings");
    logoRow.addSpacer();

    f1Logo.imageSize = new Size(40, 40);
    logoText.font = f1Font22;

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

      posText.font = f1Font12;
      teamText.font = f1Font12;
      pointsText.font = f1Font12;

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

      posText.font = f1Font12;
      teamText.font = f1Font12;
      pointsText.font = f1Font12;

      posText.centerAlignText();
      teamText.centerAlignText();
      pointsText.centerAlignText();

      const logoPath = file.logos[constructorTeamCodes[i]];
      const logoImage = fileMgr.readImage(logoPath);
      console.log[i];
      console.log[logoPath];

      const logo = rowLogo.addImage(logoImage);
      logo.imageSize = new Size(20, 20);

      widget.backgroundColor = new Color("99bbffff"); // placeholder color until I can implement a color picking function
      centerLine.backgroundColor = new Color("ffffff");
    }
  },
};

const app = {
  async init() {
    await requests.scheduleRequest();
    await requests.constructorRequest();
    await requests.driversRequest();
    await cache.downloadCache(file.schedule);
    await cache.downloadCache(file.driverStandings);
    await cache.downloadCache(file.constructorStandings);
    await helper.downloadImages();

    const widgetOptions = args.widgetParameter.toString();
    const optionsArr = widgetOptions.split(",");

    if (optionsArr.length === 1) {
      const widgetType = optionsArr[0];
      views[widgetType]();
    } else if (optionsArr.length === 2) {
      const widgetType = optionsArr[0];
      const backgroundColor = widgetOptions[1];

      views[widgetType]();
      widget.backgroundColor = new Color(backgroundColor);
    } else if (optionsArr.length >= 3) {
      const widgetType = optionsArr[0];
      const backgroundColor = widgetOptions[1];
      const textColor = widgetOptions[2];

      views[widgetType]();
      widget.backgroundColor = new Color(backgroundColor);
      widget.textColor = new Color(textColor);
    } else {
      console.log("No widget options provided");
    }

    if (config.runsInApp) {
      widget.presentMedium();
    } else if (config.runsInWidget) {
      Script.setWidget(widget);
    }

    return;
  },
  version() {
    const versionNum = "v0.5";
    return versionNum;
  },
};

export const version = app.version();

await app.init();
