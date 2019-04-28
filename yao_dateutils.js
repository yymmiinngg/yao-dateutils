const DateUtils = require('./src/DateUtils');
const DateFormat = require('./src/DateFormat');

module.exports = {
    DateUtils, // Date工具
    DateFormat, // Date格式化工具
    /**
     * 绑定方法到Date对象
     */
    bindDatePrototype() {
        let ms = [
            'format',
            'ceil2month', 'floor2month', 'round2month',
            'ceil2day', 'floor2day', 'round2day',
            'ceil2hour', 'floor2hour', 'round2hour',
            'ceil2minute', 'floor2minute', 'round2minute',
            'ceil2second', 'floor2second', 'round2second',
            'addDay', 'addHour', 'addMinute', 'addSecond', 'addMillisecond'
        ];
        for (let m of ms) {
            Date.prototype[m] = function (...p) {
                return DateUtils[m](this, ...p)
            }
        }
        return ms;
    }
};