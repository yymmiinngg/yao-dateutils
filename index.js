/**
 * 增加format方法 yyyy-MM-dd hh:mm:ss
 */
class SimpleDateFormat {

    constructor(formater) {
        this.formater = formater;
    }

    format(fmt) {
        let o = {
            "yyyy": this.getFullYear(),
            "MM": this.getMonth() + 1,                 //月份 
            "dd": this.getDate(),                    //日 
            "HH": this.getHours(),                   //小时 
            "mm": this.getMinutes(),                 //分 
            "ss": this.getSeconds(),                 //秒 
        };
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                let v = "" + o[k];
                if (k == 'yyyy') {
                    fmt = fmt.replace(RegExp.$1, v);
                } else {
                    fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length));
                }

            }
        }
        return fmt;
    }

    parsex(datestr, formater = "yyyy-MM-dd HH:mm:ss") {
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

    /* 
     * 重写时间的toJSON方法，因为在调用JSON.stringify的时候，时间转换就调用的toJSON，这样会导致少8个小时，所以重写它的toJSON方法
     */
    toJSON() {
        return this.format("yyyy-MM-dd HH:mm:ss"); // util.formatDate是自定义的个时间格式化函数
    }

    round2day() {
        let date = new Date(this.getTime());
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        return date;
    }

    round2hour() {
        let date = new Date(this.getTime());
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        return date;
    }

    addDay(day) {
        let date = new Date(this.getTime() + day * 86400 * 1000);
        return date;
    }

    addHour(hour) {
        let date = new Date(this.getTime() + hour * 3600 * 1000);
        return date;
    }

    addMinute(minute) {
        let date = new Date(this.getTime() + minute * 60 * 1000);
        return date;
    }

    addSecend(sec) {
        let date = new Date(this.getTime() + sec * 1000);
        return date;
    }
}

module.export = {SimpleDateFormat, SimpleFormater}