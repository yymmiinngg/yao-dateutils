const DateUtils = require('./yao_dateutils');
let now = new Date();
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss'));
console.log('取整日期', DateUtils.format(DateUtils.round2day(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('取整小时', DateUtils.format(DateUtils.round2hour(now), 'yyyy-MM-dd HH:mm:ss'));