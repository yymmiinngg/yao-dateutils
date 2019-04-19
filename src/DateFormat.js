const DateUtils = require('./DateUtils');
/**
 * 日期工具类
 */
class DateFormat {
    
    constructor(format) { 
        this.format = format;
    }

    format(date) { 
        DateUtils.format(date, format);
    }

    parse(dateStr) { 
        DateUtils.parse(dateStr, format);
    }
}

module.exports = DateFormat;