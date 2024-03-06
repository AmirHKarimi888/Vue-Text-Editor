//Generate random color for avatar
export function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Generate random uid
export function generateUid() {
    return Math.floor(Math.random() * 10000000000000);
}

//Date of today
export let today: any = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;


//Time of now in AM or PM
export function formatAMPM(date: { getHours: () => any; getMinutes: () => any; }) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
}