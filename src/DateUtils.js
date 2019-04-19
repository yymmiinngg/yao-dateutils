/**
 * 日期工具类
 */
const str_toLength = Symbol();
class DateUtils {

    /**
     * 字符串长度控制方法
     * @param {string} str 字符串
     * @param {Number} length 目标长度
     * @param {string} fillstring 填充字符
     * @returns {string} 返回目标长度的字符串
     */
    static [str_toLength](str, length, fillstring = '0') {
        if (!str) {
            str = fillstring;
        }
        if ('string' !== typeof (str)) {
            str = str.toString();
        }
        if (str.length < length) while (str.length < length) {
            str = fillstring + str;
        }
        if (str.length > length) {
            str = str.substring(str.length - length, str.length);
        }
        return str;
    }

    /**
     * 格式化日期时间
     * @param {Date} date 日期时间对象
     * @param {string} format 格式化字符串
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
    static format(date, format) {
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
            let ms = reg.exec(format);
            if (ms && ms.length) for (let i = 0; i < ms.length; i++) {
                let p = ms[i];
                let v = o[k];
                format = format.replace(p, v);
            }
        }
        return format;
    }

    /**
     * 将字符串转换成日期
     * @param {string} datestr 日期时间字符串
     * @param {string} format 格式化字符串
     * @returns {Date} 日期时间对象
     */
    static parse(datestr, format = "yyyy-MM-dd HH:mm:ss") {
        if (!datestr) {
            return null;
        }
        let fullYearPos = format.indexOf("yyyy");
        let shortYearPos = format.indexOf("yy");
        let monthPos = format.indexOf("MM");
        let dayhPos = format.indexOf("dd");
        let hourPos = format.indexOf("HH");
        let minutePos = format.indexOf("mm");
        let secondsPos = format.indexOf("ss");
        let mSecondsPos = format.indexOf("SSS");
        let aPos = format.indexOf("a");

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

    /**
     * 返回 日期1 减去 日期2 的日期差
     * @param {Date} date1 日期1
     * @param {Date} date2 日期2
     * @returns {Object} {days:相差天数, hours:余下的小时数, minutes:余下的分钟数, seconds:余下的秒数, milliseconds:余下的毫秒数, totaldays:总相差天数, totalhours:总共相差小时数, totalminutes:总共相差分钟数, totalseconds:总共相差秒数, totalmilliseconds:总共相差毫秒数}
     */
    static subtract(date1, date2) {
        let time = date1.getTime() - date2.getTime();
        let mday = 24 * 60 * 60 * 1000;
        let mhour = 60 * 60 * 1000;
        let mminute = 60 * 1000;
        let mseconds = 1000;
        return {
            days: parseInt(time / mday),
            hours: parseInt(time % mday / mhour),
            minutes: parseInt(time % mday % mhour / mminute),
            seconds: parseInt(time % mday % mhour % mminute / mseconds),
            milliseconds: parseInt(time % mday % mhour % mminute % mseconds),
            totaldays: parseInt(time / mday),
            totalhours: parseInt(time / mhour),
            totalminutes: parseInt(time / mminute),
            totalseconds: parseInt(time / mseconds),
            totalmilliseconds: time
        };
    }

}

module.exports = DateUtils;