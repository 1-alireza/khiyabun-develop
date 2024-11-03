import jalaali from "jalaali-js";

export function formatServerTime(serverTime, lang) {
    const date = new Date(serverTime);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (lang === 'fa') {
        const persianAmPm = hours >= 12 ? 'ب.ظ' : 'ق.ظ';
        const persianHours = (hours % 12 || 12).toString().padStart(2, '0');
        return `${persianHours}:${minutes} ${persianAmPm}`;
    } else if (lang === 'en') {
        const amPm = hours >= 12 ? 'pm' : 'am'; // English AM and PM
        const englishHours = (hours % 12 || 12).toString().padStart(2, '0');
        return `${englishHours}:${minutes} ${amPm}`;
    } else {
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
}


// export function timeDifference(serverTime1, serverTime2) {
//     const date1 = new Date(serverTime1);
//     const date2 = new Date(serverTime2);
//
//     const diff = Math.abs(date2 - date1); // Calculate the absolute difference in milliseconds
//
//     const hoursDiff = Math.floor(diff / (1000 * 60 * 60)); // Use Math.floor to get whole hours
//     const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Use Math.floor to get whole minutes
//
//     return `${hoursDiff.toString().padStart(2, '0')}:${minutesDiff.toString().padStart(2, '0')}`;
// }

export function timeDifference(serverTime1, serverTime2) {
    const date1 = new Date(serverTime1);
    const date2 = new Date(serverTime2);

    const diff = Math.abs(date2 - date1);

    const hoursDiff = Math.floor(diff / (1000 * 60 * 60));
    const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000);

    // If there are any seconds, add 1 to minutes
    const finalMinutesDiff = secondsDiff > 0 ? minutesDiff + 1 : minutesDiff;

    return `${hoursDiff.toString().padStart(2, '0')}:${finalMinutesDiff.toString().padStart(2, '0')}`;
}

export function getServerTimeDifference(serverTime) {
    const now = new Date();
    const serverDate = new Date(serverTime);
    return serverDate - now;
}

export function startTimer(difference) {
    return setInterval(() => {
        difference += 1000; // Increment difference by 1000 ms (1 second)
        const elapsedSeconds = Math.floor(difference / 1000);
        console.log(`Elapsed Time: ${elapsedSeconds} seconds`);

        // You can update your UI here with the elapsed time
        // document.getElementById("timer").innerText = `Elapsed Time: ${elapsedSeconds} seconds`;
    }, 1000); // Return the timer ID if you want to stop it later
}

export const convertToJalali = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
    return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
};

export const convertJalaliToGregorian = (jalaliDate, type) => {
    console.log(jalaliDate);

    const [jy, jm, jd] = jalaliDate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    return(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`);

};

