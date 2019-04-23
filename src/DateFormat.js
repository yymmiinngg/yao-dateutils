const DateUtils = require('./DateUtils');
/**
 * 日期工具类
 */
class DateFormat {
    
    constructor(format) { 
        this.formater = format;
    }

    format(date) { 
       return DateUtils.format(date, this.formater);
    }

    parse(dateStr) { 
        return DateUtils.parse(dateStr, this.formater);
    }
}

module.exports = DateFormat;