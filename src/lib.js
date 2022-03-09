/**
 *  Add Hours to date
 * @param {number} hours 
 * @returns 
 */
Date.prototype.addHours = function (hours) { this.setTime(this.getTime() + (hours * 60 * 60 * 1000)); return this }


/**
  * Get milliseconds between two dates
  * @param {Date} date1 
  * @param {Date} date2 
  * @returns 
  */
const MillisecondsBetweenDates = (date1, date2) => Math.abs(date1 - date2)