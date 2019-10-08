const throttle = (t: number) => {
  return new Promise((resolve) => {
      setTimeout(resolve, t);
  });
};

// inspired by uuid v4 (shortened) https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

/* tslint:disable:no-bitwise */
const uuid = (): string => {
  return "xxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
/* tslint:enable:no-bitwise */

const formatDate = (date: Date, withTime: boolean = false) => {
  // TODO: Language based formatting of dates
  const lang: string = "en";
  switch (lang) {
    case "de":
      return dateNull(date.getDate())
        + "." + dateNull((date.getMonth() + 1))
        + "." + dateNull(date.getFullYear())
        + ((withTime) ? " " + dateNull(date.getHours()) + ":" + dateNull(date.getMinutes()) : "");
      break;
    default:
      return dateNull(date.getFullYear())
        + "/" + dateNull((date.getMonth() + 1))
        + "/" + dateNull(date.getDate())
        + ((withTime) ? " " + dateNull(date.getHours()) + ":" + dateNull(date.getMinutes()) : "");
      break;
  }
};

const dateNull = (num: number): string => {
  return (num < 10) ? "0" + num : "" + num;
};

const cleanNumber = (duration: number) => {
  if (duration === Math.floor(duration)) {
    return duration;
  } else if ( parseFloat(duration.toFixed(1)) === parseFloat(duration.toFixed(2))) {
    return duration.toFixed(1);
  } else {
    return duration.toFixed(2);
  }
};

const formatDuration = (duration: number) => {
  duration = duration / 1000;
  if (duration < 60) {
    return Math.floor(duration) +
      " " + browser.i18n.getMessage("secondsShort");
  } else {
    duration = duration / 60;
    if (duration < 60) {
      return cleanNumber(duration) +
        " " + browser.i18n.getMessage("minutesShort");
    } else {
      duration = duration / 60;
      if (duration < 24) {
        return cleanNumber(duration) +
          " " + browser.i18n.getMessage("hoursShort");
      } else {
        duration = duration / 24;
        return cleanNumber(duration) +
          " " + browser.i18n.getMessage("daysShort");
      }
    }
  }
};

const objEmpty = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
    }
    return true;
};

const downloadFile = (fileData: string, fileType: string,
                      fileName: string): Promise<any> => {

  const file = new Blob([fileData], {
    type: fileType,
  });

  return browser.downloads.download({
      // window.URL ??
      filename: fileName,
      saveAs: true,
      url: URL.createObjectURL(file),
    }).then((downloadId) => {
      return Promise.resolve();
    }).catch((error) => {
      throw new Error("Download failed. " + JSON.stringify(error));
    });
};

const debounce = ( func: (...args: any[]) => void,
                   wait: number = 200,
                   immediate: boolean = false,
): (...args: any[]) => void => {

  let timeout = null;
  let again = false;

  return (...args: any[]) => {
    const callNow = immediate && timeout === null;
    const next = () => func.apply( null , args );

    if (timeout === null) {
      timeout = setTimeout( () => {
        timeout = null;
        if ( again ) {
          next();
          again = false;
        }
      }, wait );
    } else {
      again = true;
    }

    if (callNow) {
      next();
    }
  };
};

export {debounce, downloadFile, formatDate, formatDuration, objEmpty, throttle, uuid};
