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

    // === 时间格式化 =======================================================================================

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
     * H:小时(0~23);
     * hh:小时，10以下用0补位;
     * h:小时(0~11);
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
     * yyyy:年份(如2019);
     * yy:短年份(如19);
     * MM:月份;
     * dd:日子;
     * HH:小时(0~23);
     * hh:小时(0~11);
     * mm:分钟;
     * ss:秒;
     * SSS:毫秒;
     * a:am或pm
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
        let hourPos = format.indexOf("hh");
        let HOURPos = format.indexOf("HH");
        let minutePos = format.indexOf("mm");
        let secondsPos = format.indexOf("ss");
        let mSecondsPos = format.indexOf("SSS");
        let aPos = format.indexOf("a");

        let fullYear = fullYearPos != -1 ? datestr.substring(fullYearPos, fullYearPos + 4) : null;
        let shortYear = shortYearPos != -1 ? datestr.substring(shortYearPos, shortYearPos + 2) : null;
        let month = monthPos != -1 ? datestr.substring(monthPos, monthPos + 2) : null;
        let day = dayhPos != -1 ? datestr.substring(dayhPos, dayhPos + 2) : null;
        let minute = minutePos != -1 ? datestr.substring(minutePos, minutePos + 2) : null;
        let seconds = secondsPos != -1 ? datestr.substring(secondsPos, secondsPos + 2) : null;
        let mSeconds = mSecondsPos != -1 ? datestr.substring(mSecondsPos, mSecondsPos + 3) : null;
        let a = aPos != -1 ? datestr.substring(aPos, aPos + 2) : null;

        let hour = hourPos != -1 ? datestr.substring(hourPos, hourPos + 2) : null;
        let HOUR = HOURPos != -1 ? datestr.substring(HOURPos, HOURPos + 2) : null;

        let d4 = /^\d{4}$/;
        let d2 = /^\d{2}$/;
        let d3 = /^\d{3}$/;
        let aa = /^[ap]m$/;
        if (
            !(!fullYear || d4.test(fullYear)) ||
            !(!shortYear || d2.test(shortYear)) ||
            !(!month || d2.test(month)) ||
            !(!day || d2.test(day)) ||
            !(!hour || d2.test(hour)) ||
            !(!HOUR || d2.test(HOUR)) ||
            !(!minute || d2.test(minute)) ||
            !(!seconds || d2.test(seconds)) ||
            !(!mSeconds || d3.test(mSeconds)) ||
            !(!a || aa.test(a))
        ) {
            return null;
        }

        fullYear = parseInt(fullYear ? fullYear : (shortYear ? '20' + shortYear : 1970));
        month = parseInt(month ? month : 1);
        day = parseInt(day ? day : 1);
        hour = parseInt(hour ? hour : 0);
        HOUR = parseInt(HOUR ? HOUR : (hour < 12 && a === 'pm') ? hour + 12 : hour);
        minute = parseInt(minute ? minute : 0);
        seconds = parseInt(seconds ? seconds : 0);
        mSeconds = parseInt(mSeconds ? mSeconds : 0);

        let date = new Date();
        date.setFullYear(fullYear);
        date.setMonth(month - 1);
        date.setDate(day);
        date.setHours(HOUR);
        date.setMinutes(minute);
        date.setSeconds(seconds);
        date.setMilliseconds(mSeconds);
        return date;
    }

    // === 时间取整 =======================================================================================

    /**
     * 时间向外取整到月（如：2019-4-16 10:32:38 > 2019-5-1 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static ceil2month(date) {
        let _date = DateUtils.floor2month(date);
        _date.setMonth(_date.getMonth() + 1);
        return _date;
    }

    /**
     * 时间向内取整到月（如：2019-4-16 10:32:38 > 2019-4-1 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static floor2month(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        _date.setMinutes(0);
        _date.setHours(0);
        _date.setDate(1);
        return _date;
    }

    /**
     * 时间进行“四舍五入”取整到月（如：2019-4-14 10:32:38 > 2019-4-1 00:00:00， 2019-4-16 10:32:38 > 2019-5-1 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2month(date) {
        let _date1 = DateUtils.floor2month(date);
        let _date2 = DateUtils.ceil2month(date);
        if ((_date2.getTime() - date.getTime()) <= (date.getTime() - _date1.getTime())) {
            return _date2;
        } else {
            return _date1;
        }
    }

    /**
     * 时间向外取整到日期（如：2019-01-01 01:01:01 > 2019-01-02 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static ceil2day(date) {
        let _date = DateUtils.floor2day(date);
        _date.setDate(_date.getDate() + 1);
        return _date;
    }

    /**
     * 时间向内取整到日期（如：2019-01-01 01:01:01 > 2019-01-01 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static floor2day(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        _date.setMinutes(0);
        _date.setHours(0);
        return _date;
    }

    /**
     * 时间“四舍五入”取整到日期（如：2019-01-01 01:01:01 > 2019-01-01 00:00:00, 2019-01-01 12:01:01 > 2019-01-02 00:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2day(date) {
        let _date1 = DateUtils.floor2day(date);
        let _date2 = DateUtils.ceil2day(date);
        if ((_date2.getTime() - date.getTime()) <= (date.getTime() - _date1.getTime())) {
            return _date2;
        } else {
            return _date1;
        }
    }

    /**
     * 时间向外取整到小时（如：2019-01-01 01:01:01 > 2019-01-01 02:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static ceil2hour(date) {
        let _date = DateUtils.floor2hour(date);
        _date.setHours(_date.getHours() + 1);
        return _date;
    }

    /**
     * 时间向内取整到小时（如：2019-01-01 01:01:01 > 2019-01-01 01:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static floor2hour(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        _date.setMinutes(0);
        return _date;
    }

    /**
     * 时间“四舍五入”取整到小时（如：2019-01-01 01:01:01 > 2019-01-01 01:00:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2hour(date) {
        let _date1 = DateUtils.floor2hour(date);
        let _date2 = DateUtils.ceil2hour(date);
        if ((_date2.getTime() - date.getTime()) <= (date.getTime() - _date1.getTime())) {
            return _date2;
        } else {
            return _date1;
        }
    }

    /**
     * 时间向外取整到分钟（如：2019-01-15 01:01:01 > 2019-01-15 01:01:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static ceil2minute(date) {
        let _date = DateUtils.floor2minute(date);
        _date.setMinutes(_date.getMinutes() + 1);
        return _date;
    }

    /**
     * 时间向内取整到分钟（如：2019-01-15 01:01:01 > 2019-01-15 01:01:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static floor2minute(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        _date.setSeconds(0);
        return _date;
    }

    /**
     * 时间“四舍五入”取整到分钟（如：2019-01-15 01:01:01 > 2019-01-15 01:01:00）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2minute(date) {
        let _date1 = DateUtils.floor2minute(date);
        let _date2 = DateUtils.ceil2minute(date);
        if ((_date2.getTime() - date.getTime()) <= (date.getTime() - _date1.getTime())) {
            return _date2;
        } else {
            return _date1;
        }
    }

    /**
     * 时间向外取整到秒（如：2019-01-15 01:01:01.231 > 2019-01-15 01:01:02.000）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static ceil2second(date) {
        let _date = DateUtils.floor2second(date);
        _date.setSeconds(_date.getSeconds() + 1);
        return _date;
    }

    /**
     * 时间向内取整到秒（如：2019-01-15 01:01:01.231 > 2019-01-15 01:01:01.000）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static floor2second(date) {
        let _date = new Date(date.getTime());
        _date.setMilliseconds(0);
        return _date;
    }

    /**
     * 时间“四舍五入”取整到秒（如：2019-01-15 01:01:01.231 > 2019-01-15 01:01:01.000）
     * @param {Date} date 日期时间
     * @returns {Date} 取整后的日期时间
     */
    static round2second(date) {
        let _date1 = DateUtils.floor2second(date);
        let _date2 = DateUtils.ceil2second(date);
        if ((_date2.getTime() - date.getTime()) <= (date.getTime() - _date1.getTime())) {
            return _date2;
        } else {
            return _date1;
        }
    }

    // === 时间计算 =======================================================================================

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
    * 给日期时间增加秒数（如：2019-01-01 01:01:01 . addSecond(1) > 2019-01-01 01:01:02）
    * @param {Date} date 日期时间
    * @param {number} sec 秒数
    * @returns {Date} 增加秒数后的日期时间
    */
    static addSecond(date, sec) {
        return new Date(date.getTime() + sec * 1000);
    }

    /**
    * 给日期时间增加秒数（如：2019-01-01 01:01:01.000 . addMillisecond(1) > 2019-01-01 01:01:02.001）
    * @param {Date} date 日期时间
    * @param {number} msec 毫秒数
    * @returns {Date} 增加毫秒数后的日期时间
    */
    static addMillisecond(date, msec) {
        return new Date(date.getTime() + msec);
    }

    // === 时间对比 =======================================================================================

    /**
     * 返回 日期1 减去 日期2 的日期差（totalxxx为小数时向外取整，如计算得出totaldays==3.1，则totaldays实际返回值为4）
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
            totaldays: Math.ceil(time / mday),
            totalhours: Math.ceil(time / mhour),
            totalminutes: Math.ceil(time / mminute),
            totalseconds: Math.ceil(time / mseconds),
            totalmilliseconds: time
        };
    }

    // === 周期计算 =======================================================================================

    /**
     * 将一段时间均匀拆分成顺序时间点数组(返回的数组长度等于count)
     * @param {Number} count 返回时间点个数；
     * @param {Date} start 开始时间，如果开始时间大于结束时间，则返回从大到小的列表
     * @param {Date} end 结束时间，如果结束时间大于开始时间，则返回从小到大的列表（默认为当前时间点）
     * @returns {Array} 连续时间刻度的数组
     */
    static splitPeriodTime(count, start, end = new Date()) {
        if (count <= 0) {
            return [];
        }
        let subtractValue = DateUtils.subtract(end, start);
        let timeItem = subtractValue.totalmilliseconds / (count - 1);
        let arr = [new Date(start.getTime())];
        while (arr.length < count - 1) {
            let t = start.getTime() + timeItem * arr.length;
            arr.push(new Date(t))
        }
        if (count > 1) {
            arr.push(new Date(end.getTime()));
        }
        return arr;
    }

    /**
     * 获得周期内某一进度点的时间：把时间周期切分成100等分，取得progress所在进度的时间
     * @param {Number} progress 进度点，范围[0~1)的符点数，精度为两位小数
     * @param {} start 开始时间
     * @param {*} end 结束时间（默认为当前时间点）
     */
    static getProgressTime(progress, start, end = new Date()) {
        let idx = parseInt(progress * 100);
        if (idx < 0 || idx >= 100) {
            throw Error('progress must be number and in [0, 1)');
        }
        let arr = DateUtils.splitPeriodTime(100, start, end);
        return arr[idx];
    }

}

module.exports = DateUtils;