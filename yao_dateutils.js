const DateUtils = require('./src/DateUtils');
const DateFormat = require('./src/DateFormat');

module.exports = {
    DateUtils, // Date工具
    DateFormat, // Date格式化工具
    /**
     * 绑定方法到Date对象：format、round2month、round2day、round2hour、round2minute、round2second、addDay、addHour、addMinute、addsecond、subtract
     */
    bindDatePrototype() {
        Date.prototype.format = function (format) {
            return DateUtils.format(this, format);
        };

        Date.prototype.ceil2month = function () {
            return DateUtils.ceil2month(this);
        };
        Date.prototype.floor2month = function () {
            return DateUtils.floor2month(this);
        };
        Date.prototype.round2month = function () {
            return DateUtils.round2month(this);
        };

        Date.prototype.ceil2day = function () {
            return DateUtils.ceil2day(this);
        };
        Date.prototype.floor2day = function () {
            return DateUtils.floor2day(this);
        };
        Date.prototype.round2day = function () {
            return DateUtils.round2day(this);
        };

        Date.prototype.ceil2hour = function () {
            return DateUtils.ceil2hour(this);
        };
        Date.prototype.floor2hour = function () {
            return DateUtils.floor2hour(this);
        };
        Date.prototype.round2hour = function () {
            return DateUtils.round2hour(this);
        };

        Date.prototype.ceil2minute = function () {
            return DateUtils.ceil2minute(this);
        };
        Date.prototype.floor2minute = function () {
            return DateUtils.floor2minute(this);
        };
        Date.prototype.round2minute = function () {
            return DateUtils.round2minute(this);
        };

        Date.prototype.ceil2second = function () {
            return DateUtils.ceil2second(this);
        };
        Date.prototype.floor2second = function () {
            return DateUtils.floor2second(this);
        };
        Date.prototype.round2second = function () {
            return DateUtils.round2second(this);
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
        Date.prototype.addSecond = function (second) {
            return DateUtils.addSecond(this, second);
        };
        Date.prototype.addMillisecond = function (second) {
            return DateUtils.addMillisecond(this, second);
        };
    }
};