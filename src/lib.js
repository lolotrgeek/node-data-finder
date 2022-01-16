/**
 *  Add Hours to date
 * @param {number} hours 
 * @returns 
 */
 Date.prototype.addHours = function (hours) { this.setTime(this.getTime() + (hours * 60 * 60 * 1000)); return this }