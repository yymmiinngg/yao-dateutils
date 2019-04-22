const { DateUtils, DateFormat, bindDatePrototype } = require('./yao_dateutils');

// 日期格式化 DateUtils.format(date, format)
let now = new Date();
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('当前时间', DateUtils.format(now, 'yyyy年MM月dd日HH时mm分ss秒'));
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd hh:mm:ss a'));
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('取整月份', DateUtils.format(DateUtils.round2month(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('取整日期', DateUtils.format(DateUtils.round2day(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('取整小时', DateUtils.format(DateUtils.round2hour(now), 'yyyy-MM-dd HH:mm:ss'));

// 字符串转时间 DateUtils.parse(dateStr, format)
let d = DateUtils.parse('2019-02-02 02:02:02.002 pm', 'yyyy-MM-dd hh:mm:ss.SSS a');
console.log('字符串转时间', DateUtils.format(d, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('字符串转时间', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS'));

// 时间减法
let yesterday = DateUtils.addDay(now, -1);
let result = DateUtils.subtract(yesterday, now);
console.log('减法所得', result);

// 周期拆分
let dateArr = DateUtils.split(now, yesterday, 4);
for (let d of dateArr) {
    console.log(' - ', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS a'));
}

// 绑定Date类型方法
bindDatePrototype();
console.log('绑定Date类型方法：Date.format()', now.format('yyyy-MM-dd HH:mm:ss'));