const msToCron = (ms) =>{
    const seconds = Math.floor(ms/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);

    const cronSeconds = seconds%60;
    const cronMinutes = minutes%60;
    const cronHours = hours%24;

    return `${cronSeconds} ${cronMinutes} ${cronHours} * * *`;

}

module.exports = {
    msToCron
}