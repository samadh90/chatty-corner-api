const countDown = (seconds) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
};

const timeElapsed = (startTime) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const currentTime = `${hours}:${minutes}:${seconds}`;
    const timeElapsed = (currentTime - startTime) / 1000;
    return timeElapsed;
};

const getTime = (date = new Date()) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
};

const getFullDate = (date = new Date()) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const getDateAndTime = () => {
    const date = new Date();
    return `${getFullDate(date)} ${getTime(date)}`;
};

module.exports = {
    getFullDate: getFullDate,
    countDown: countDown,
    timeElapsed: timeElapsed,
    getTime: getTime,
    getDateAndTime: getDateAndTime
};