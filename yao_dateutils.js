const DateUtils = require('./src/DateUtils');
const DateFormat = require('./src/DateFormat');

module.exports = {
    DateUtils, // Date工具
    DateFormat, // Date格式化工具
    /**
     * 绑定方法到Date对象：format、round2month、round2day、round2hour、round2minute、round2secend、addDay、addHour、addMinute、addSecend、subtract
     */
    bindDatePrototype() {
        Date.prototype.format = function (format) {
            return DateUtils.format(this, format);
        };
        Date.prototype.round2month = function () {
            return DateUtils.round2month(this);
        };
        Date.prototype.round2day = function () {
            return DateUtils.round2day(this);
        };
        Date.prototype.round2hour = function () {
            return DateUtils.round2hour(this);
        };
        Date.prototype.round2minute = function () {
            return DateUtils.round2minute(this);
        };
        Date.prototype.round2secend = function () {
            return DateUtils.round2secend(this);
        };
        Date.prototype.addDay = function (day) {
            return DateUtils.addDay(this, day);
        };
        Date.prototype.addHour = function (hour) {
            return DateUtils.addHour(this, hour);
        };
        Date.prototype.addMinute = function (minute) {
            return DateUtils.addMinute(this, minute);
        };
        Date.prototype.addSecend = function (secend) {
            return DateUtils.addSecend(this, secend);
        };
        Date.prototype.subtract = function (date) {
            return DateUtils.subtract(this, date);
        };
    }
};