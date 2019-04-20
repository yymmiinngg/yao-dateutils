/**
 * 日期工具类
 */
let str_toLength = Symbol('str_toLength');
class DateUtils {

    static [str_toLength](str, length, fillChar = '0') {
        if (!str) {
            str = fillChar;
        }
        if ('string' !== typeof (str)) {
            str = str.toString();
        }
        if (str.length < length) while (str.length < length) {
            str = fillChar + str;
        } else {
            str = str.substring(str.length - length, str.length);
        }
        return str;
    }

    /**
     * 格式化日期时间
     * @param {Date} date 日期时间对象
     * @param {string} formater 格式化字符串
     * yyyy:年份(如2019);
     * yy:短年份(如19);
     * MM:月份，10以下用0补位;
     * M:月份(1~12);
     * dd:日子，10以下用0补位;
     * d:日子(0~31);
     * HH:小时，10以下用0补位;
     * H:小时(0~24);
     * hh:小时，10以下用0补位;
     * h:小时(0~12);
     * mm:分钟，10以下用0补位;
     * m:分钟(0~59);
     * ss:秒，10以下用0补位;
     * s:秒(0~59);
     * SSS:毫秒，100以下用0补位;
     * S:毫秒(0~999);
     * a:am或pm
     * @returns {string} 日期字符串
     */
    static format(date, formater) {
        if (!date) {
            return null;
        }
        let o = {
            // 年份
            "yyyy": date.getFullYear(),
            "yy": DateUtils[str_toLength](date.getFullYear(), 2),
            // 月份
            "MM": DateUtils[str_toLength](date.getMonth() + 1, 2),
            "M": date.getMonth() + 1,
            // 日
            "dd": DateUtils[str_toLength](date.getDate(), 2),
            "d": date.getDate(),
            // 小时(24)
            "HH": DateUtils[str_toLength](date.getHours(), 2),
            "H": date.getHours(),
            // 小时(12)
            "hh": DateUtils[str_toLength](date.getHours() % 12, 2),
            "h": date.getHours() % 12,
            // 分
            "mm": DateUtils[str_toLength](date.getMinutes(), 2),
            "m": date.getMinutes(),
            // 秒
            "ss": DateUtils[str_toLength](date.getSeconds(), 2),
            "s": date.getSeconds(),
            // 秒 
            "SSS": DateUtils[str_toLength](date.getMilliseconds(), 3),
            "S": date.getMilliseconds(),
            // 上午|下午
            "a": date.getHours() < 12 ? 'am' : 'pm',
        };
        for (let k in o) {
            let reg = new RegExp(k, 'g');
            let ms = reg.exec(formater);
            if (ms && ms.length) for (let i = 0; i < ms.length; i++) {
                let p = ms[i];
                let v = o[k];
                formater = formater.replace(p, v);
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
        if (!datestr) {
            return null;
        }
        let fullYearPos = formater.indexOf("yyyy");
        let shortYearPos = formater.indexOf("yy");
        let monthPos = formater.indexOf("MM");
        let dayhPos = formater.indexOf("dd");
        let hourPos = formater.indexOf("HH");
        let minutePos = formater.indexOf("mm");
        let secondsPos = formater.indexOf("ss");
        let mSecondsPos = formater.indexOf("SSS");
        let aPos = formater.indexOf("a");

        let fullYear = fullYearPos != -1 ? datestr.substring(fullYearPos, fullYearPos + 4) : (shortYearPos != -1 ? '20' + datestr.substring(shortYearPos, shortYearPos + 2) : '1970');
        let month = monthPos != -1 ? datestr.substring(monthPos, monthPos + 2) : '01';
        let day = dayhPos != -1 ? datestr.substring(dayhPos, dayhPos + 2) : '01';
        let hour = hourPos != -1 ? datestr.substring(hourPos, hourPos + 2) : '00';
        let minute = minutePos != -1 ? datestr.substring(minutePos, minutePos + 2) : '00';
        let seconds = secondsPos != -1 ? datestr.substring(secondsPos, secondsPos + 2) : '00';
        let mSeconds = mSecondsPos != -1 ? datestr.substring(mSecondsPos, mSecondsPos + 3) : '000';
        let a = aPos != -1 ? datestr.substring(aPos, aPos + 2) : 'am';

        let d4 = /^\d{4}$/;
        let d2 = /^\d{2}$/;
        let d3 = /^\d{3}$/;
        let aa = /^[ap]m$/;
        if (!d4.test(fullYear)
            || !d2.test(month)
            || !d2.test(day)
            || !d2.test(hour)
            || !d2.test(minute)
            || !d2.test(seconds)
            || !d3.test(mSeconds)
            || !aa.test(a)
        ) {
            return null;
        }
        let date = new Date();
        date.setFullYear(fullYear);
        date.setMonth(month - 1);
        date.setDate(day);
        date.setHours((hour < 12 && a === 'pm') ? hour + 12 : hour);
        date.setMinutes(minute);
        date.setSeconds(seconds);
        date.setMilliseconds(mSeconds);
        return date;
    }

    /**
     * 时间取整到月（如：2019-01-15 01:01:01 > 2019-01-15 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2month(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        _date.setMinutes(0);
        _date.setHours(0);
        _date.setDate(1);
        return _date;
    }

    /**
     * 时间取整到日期（如：2019-01-15 01:01:01 > 2019-01-15 00:00:00）
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
     * 时间取整到小时（如：2019-01-15 01:01:01 > 2019-01-15 01:00:00）
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
     * 时间取整到分钟（如：2019-01-15 01:01:01 > 2019-01-15 01:01:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2minute(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        return _date;
    }

    /**
     * 时间取整到秒（如：2019-01-15 01:01:01.231 > 2019-01-15 01:01:01.000）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2secends(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        return _date;
    }

    /**
     * 给日期时间增加天数（如：2019-01-15 01:01:01 > 2019-01-16 01:01:01）
     * @param {Date} date 日期时间
     * @param {number} day 天数
     * @returns {Date} 增加天数后的日期时间
     */
    static addDay(date, day) {
        return new Date(date.getTime() + day * 86400 * 1000);
    }

    /**
     * 给日期时间增加小时数（如：2019-01-15 01:01:01 . addHour(1) > 2019-01-15 02:01:01）
     * @param {Date} date 日期时间
     * @param {number} hour 小时数
     * @returns {Date} 增加小时数后的日期时间
     */
    static addHour(date, hour) {
        return new Date(date.getTime() + hour * 3600 * 1000);
    }

    /**
     * 给日期时间增加分钟数（如：2019-01-15 01:01:01 . addMinute(1) > 2019-01-15 01:02:01）
     * @param {Date} date 日期时间
     * @param {number} minute 分钟数
     * @returns {Date} 增加分钟数后的日期时间
     */
    static addMinute(date, minute) {
        return new Date(date.getTime() + minute * 60 * 1000);
    }

    /**
    * 给日期时间增加秒数（如：2019-01-15 01:01:01 . addSecend(1) > 2019-01-15 01:01:02）
    * @param {Date} date 日期时间
    * @param {number} sec 秒数
    * @returns {Date} 增加秒数后的日期时间
    */
    static addSecend(date, sec) {
        return new Date(date.getTime() + sec * 1000);
    }
}

module.exports = DateUtils;