export const unixTimestampToDays = (unix_timestamp: any) => {
  const days = Math.floor(unix_timestamp / 86400);
  unix_timestamp -= days * 86400;

  const hours = Math.floor(unix_timestamp / 3600);
  unix_timestamp -= hours * 3600;

  const minutes = Math.floor(unix_timestamp / 60);
  unix_timestamp -= minutes * 60;

  const seconds = unix_timestamp;

  return (
    (days > 0 ? days + " d. " : "") +
    (hours > 0 ? hours + " h " : "") +
    (minutes > 0 ? minutes + " min " : "") +
    (seconds > 0 ? seconds + " s" : "")
  );
};

export const unixTimestampToDaysTime = (unix_timestamp: any) => {
  const days = Math.floor(unix_timestamp / 86400);
  unix_timestamp -= days * 86400;

  const hours = Math.floor(unix_timestamp / 3600);
  unix_timestamp -= hours * 3600;
  const hoursShort = hours > 12 ? hours - 12 : hours;
  const hoursAMPM = hours > 12 ? "PM" : "AM";

  const minutes = Math.floor(unix_timestamp / 60);
  unix_timestamp -= minutes * 60;

  const seconds = unix_timestamp;

  return (
    (days > 0 ? days + " d. " : "") +
    (hoursShort > 0 ? hoursShort + ":" : "00:") +
    (minutes > 0 ? minutes + ":" : "00:") +
    (seconds > 0 ? seconds + ":" : "00") +
    " " +
    hoursAMPM
  );
};

export const unixTimestampToDateString = function (unix_timestamp: any) {
  return new Date(unix_timestamp * 1000).toLocaleDateString();
};

export const unixTimestampToDateTimeString = function (unix_timestamp: any) {
  mockLastRebaseTimestamp();
  return new Date(unix_timestamp * 1000).toLocaleString();
};

const getTwoDigitsString = (num: number) => {
  return num < 10 ? "0" + num.toString() : num.toString();
};

export const mockLastRebaseTimestamp = function () {
  const sixPMUtc = 64800;

  const now = new Date();

  const secondsPassed = now.getUTCHours() * 3600 + now.getUTCSeconds();

  let result;
  if (secondsPassed > sixPMUtc) {
    result = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth() + 1,
      now.getUTCDate(),
      18,
      0,
      0,
      0,
    );
  } else {
    result = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth() + 1,
      now.getUTCDate() - 1,
      18,
      0,
      0,
      0,
    );
  }

  const date = new Date(result);
  const year = date.getFullYear();
  const month = getTwoDigitsString(date.getMonth());
  const day = getTwoDigitsString(date.getDate());
  const hours = date.getHours();
  const minutes = getTwoDigitsString(date.getMinutes());
  const seconds = getTwoDigitsString(date.getSeconds());
  const hoursShort = getTwoDigitsString(hours > 12 ? hours - 12 : hours);
  const hoursAMPM = hours > 12 ? "PM" : "AM";
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hoursShort +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    hoursAMPM
  );
};
