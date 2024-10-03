export function isDateValid(dateStr: any) {
  return !isNaN(new Date(dateStr) as any);
}

const toTime = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
    // return moment(date).locale("fa").format("HH:mm");
  } else return "";
};
const toDate = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    }).format(new Date(date));
    // return moment(date).locale("fa").format("YYYY/MM/DD");
  } else return "";
};
const toYear = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
    }).format(new Date(date));
    // return moment(date).locale("fa").format("YYYY/MM/DD");
  } else return "";
};

const toENDate = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
      .format(new Date(date))
      .split(",")
      .reverse()
      .join("/")
      .split(" ")
      .join("/")
      .replace(/^\//, "");
  } else return "";
};

const toDay = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "short",
    }).format(new Date(date));
    // return moment(date).locale("fa").format("ddd");
  }
};
const toDayNumber = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
    }).format(new Date(date));
    // return moment(date).locale("fa").format("D");
  } else return "";
};

const toARFormat = (date: any) => {
  if (isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      year: "numeric",
      day: "numeric",
      // by sadra :)
      calendar: "islamic-umalqura",
    }).format(new Date(date));
  }
};

const toMonth = (date: any) => {
  if (date && isDateValid(date)) {
    return new Intl.DateTimeFormat("fa-IR", {
      month: "long",
    }).format(new Date(date));
    // return moment(date).locale("fa").format("jMMM");
  } else return "";
};

export const addHour = (date: Date | number = new Date(), hour = 0) => {
  if (date) {
    const time = new Date(date);
    return new Date(time.setHours(time.getHours() + hour));
  } else return date;
};

export const dateConverter = {
  toDate,
  toTime,
  toDay,
  toARFormat,
  toMonth,
  toDayNumber,
  addHour,
  toENDate,
  toYear,
};
