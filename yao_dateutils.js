/**
 * 日期工具类，formater参数：格式化字符串，与java相似，年份：yyyy，月份：MM，日：dd，小时：HH，分钟：mm，秒：ss
 */
class DateUtils {

    /**
     * 格式化日期时间
     * @param {Date} date 日期时间对象
     * @param {string} formater 格式化字符串
     * @returns {string} 日期字符串
     */
    static format(date, formater) {
        let o = {
            "yyyy": date.getFullYear(),
            "MM": date.getMonth() + 1,                 //月份 
            "dd": date.getDate(),                    //日 
            "HH": date.getHours(),                   //小时 
            "mm": date.getMinutes(),                 //分 
            "ss": date.getSeconds(),                 //秒 
        };
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(formater)) {
                let v = "" + o[k];
                if (k == 'yyyy') {
                    formater = formater.replace(RegExp.$1, v);
                } else {
                    formater = formater.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length));
                }

            }
        }
        return formater;
    }

    /**
     * 将字符串转换成日期
     * @param {string} datestr 日期时间字符串
     * @param {string} formater 格式化字符串
     * @returns {Date} 日期时间对象
     */
    static parse(datestr, formater = "yyyy-MM-dd HH:mm:ss") {
        let fullYearPos = formater.indexOf("yyyy");
        let monthPos = formater.indexOf("MM");
        let dayhPos = formater.indexOf("dd");
        let hourPos = formater.indexOf("HH");
        let minutePos = formater.indexOf("mm");
        let secondsPos = formater.indexOf("ss");
        let fullYear = fullYearPos != -1 ? datestr.substring(fullYearPos, fullYearPos + 4) : '1970';
        let month = monthPos != -1 ? datestr.substring(monthPos, monthPos + 2) : '01';
        let day = dayhPos != -1 ? datestr.substring(dayhPos, dayhPos + 2) : '01';
        let hour = hourPos != -1 ? datestr.substring(hourPos, hourPos + 2) : '00';
        let minute = minutePos != -1 ? datestr.substring(minutePos, minutePos + 2) : '00';
        let seconds = secondsPos != -1 ? datestr.substring(secondsPos, secondsPos + 2) : '00';
        let d4 = /^\d{4}$/;
        let d2 = /^\d{2}$/;
        if (!d4.test(fullYear)
            || !d2.test(month)
            || !d2.test(day)
            || !d2.test(hour)
            || !d2.test(minute)
            || !d2.test(seconds)) {
            return null;
        }
        let date = new Date();
        date.setFullYear(fullYear);
        date.setMonth(month - 1);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(seconds);
        date.setMilliseconds(0);
        return date;
    }

    /**
     * 时间取整到日期（如：2019-01-01 01:01:01 > 2019-01-01 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2day(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        _date.setMinutes(0);
        _date.setHours(0);
        return _date;
    }

    /**
     * 时间取整到小时（如：2019-01-01 01:01:01 > 2019-01-01 01:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2hour(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        _date.setMinutes(0);
        return _date;
    }

    /**
     * 给日期时间增加天数（如：2019-01-01 01:01:01 . addDay(1) > 2019-01-02 01:01:01）
     * @param {Date} date 日期时间
     * @param {number} day 天数
     * @returns {Date} 增加天数后的日期时间
     */
    static addDay(date, day) {
        return new Date(date.getTime() + day * 86400 * 1000);
    }

    /**
     * 给日期时间增加小时数（如：2019-01-01 01:01:01 . addHour(1) > 2019-01-01 02:01:01）
     * @param {Date} date 日期时间
     * @param {number} hour 小时数
     * @returns {Date} 增加小时数后的日期时间
     */
    static addHour(date, hour) {
        return new Date(date.getTime() + hour * 3600 * 1000);
    }

    /**
     * 给日期时间增加分钟数（如：2019-01-01 01:01:01 . addMinute(1) > 2019-01-01 01:02:01）
     * @param {Date} date 日期时间
     * @param {number} minute 分钟数
     * @returns {Date} 增加分钟数后的日期时间
     */
    static addMinute(date, minute) {
        return new Date(date.getTime() + minute * 60 * 1000);
    }

    /**
    * 给日期时间增加秒数（如：2019-01-01 01:01:01 . addSecend(1) > 2019-01-01 01:01:02）
    * @param {Date} date 日期时间
    * @param {number} sec 秒数
    * @returns {Date} 增加秒数后的日期时间
    */
    static addSecend(date, sec) {
        return new Date(date.getTime() + sec * 1000);
    }
}

module.exports = DateUtils;