const DateUtils = require('./src/DateUtils');
const DateFormat = require('./src/DateFormat');

module.exports = {
    DateUtils, // Date工具
    DateFormat, // Date格式化工具
    bindPrototype() {
        Date.prototype.format = (format) => {
            return DateUtils.format(this, format);
        };
        Date.prototype.round2day = () => {
            return DateUtils.round2day(this);
        };
        Date.prototype.round2hour = () => {
            return DateUtils.round2hour(this);
        };
        Date.prototype.addDay = (day) => {
            return DateUtils.addDay(this, day);
        };
        Date.prototype.addHour = (hour) => {
            return DateUtils.addHour(this, hour);
        };
        Date.prototype.addMinute = (minute) => {
            return DateUtils.addMinute(this, minute);
        };
        Date.prototype.addSecend = (secend) => {
            return DateUtils.addSecend(this, secend);
        };
        Date.prototype.subtract = (date) => {
            return DateUtils.subtract(this, date);
        };
    }
};