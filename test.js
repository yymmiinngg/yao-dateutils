const { DateUtils, DateFormat, bindDatePrototype } = require('./yao_dateutils');

let simpleFormat = 'yyyy-MM-dd HH:mm:ss.SSS';
let now = new Date();
console.log('==== 时间格式化 DateUtils.format(date, format) =====================');
console.log('format by "yyyy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('format by "yyyy年MM月dd日HH时mm分ss秒"', DateUtils.format(now, 'yyyy年MM月dd日HH时mm分ss秒'));
console.log('format by "yyyy-MM-dd hh:mm:ss a"', DateUtils.format(now, 'yyyy-MM-dd hh:mm:ss a'));
console.log('format by "yy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yy-MM-dd HH:mm:ss.SSS'));
console.log();

console.log('==== 时间转化 DateUtils.parse(dateStr, format) =====================');
let d1 = DateUtils.parse('2019-02-02 02:02:02.002 pm', 'yyyy-MM-dd hh:mm:ss.SSS a');
console.log('d1', DateUtils.format(d1, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('d1', DateUtils.format(d1, 'yyyy-MM-dd HH:mm:ss.SSS'));
let d2 = DateUtils.parse('2019-02-02 pm', 'yyyy-MM-dd a');
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log();

console.log('==== 时间计算 =====================');
let yesterday = DateUtils.addDay(now, -1);
let tomorrow = DateUtils.addDay(now, 1);
let lastHour = DateUtils.addHour(now, -1);
let nextHour = DateUtils.addHour(now, 1);
let lastMinute = DateUtils.addMinute(now, -1);
let nextMinute = DateUtils.addMinute(now, 1);
let lastSecond = DateUtils.addSecond(now, -1);
let nextSecond = DateUtils.addSecond(now, 1);
console.log('date', DateUtils.format(now, simpleFormat));
console.log('yesterday', DateUtils.format(yesterday, simpleFormat));
console.log('tomorrow', DateUtils.format(tomorrow, simpleFormat));
console.log('lastHour', DateUtils.format(lastHour, simpleFormat));
console.log('nextHour', DateUtils.format(nextHour, simpleFormat));
console.log('lastMinute', DateUtils.format(lastMinute, simpleFormat));
console.log('nextMinute', DateUtils.format(nextMinute, simpleFormat));
console.log('lastSecond', DateUtils.format(lastSecond, simpleFormat));
console.log('nextSecond', DateUtils.format(nextSecond, simpleFormat));
console.log();

console.log('==== 时间取整 =====================');
date = DateUtils.parse('2019-02-16 00:00:00.000', simpleFormat);
let ceil2month = DateUtils.ceil2month(date);
let floor2month = DateUtils.floor2month(date);
let round2month = DateUtils.round2month(date);
console.log('date', DateUtils.format(date, simpleFormat));
console.log('ceil2month', DateUtils.format(ceil2month, simpleFormat));
console.log('floor2month', DateUtils.format(floor2month, simpleFormat));
console.log('round2month', DateUtils.format(round2month, simpleFormat));
console.log();

date = DateUtils.parse('2019-01-16 11:00:00.000', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2day = DateUtils.ceil2day(date);
let floor2day = DateUtils.floor2day(date);
let round2day = DateUtils.round2day(date);
console.log('ceil2day', DateUtils.format(ceil2day, simpleFormat));
console.log('floor2day', DateUtils.format(floor2day, simpleFormat));
console.log('round2day', DateUtils.format(round2day, simpleFormat));
console.log();

date = DateUtils.parse('2019-01-16 23:29:00.000', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2hour = DateUtils.ceil2hour(date);
let floor2hour = DateUtils.floor2hour(date);
let round2hour = DateUtils.round2hour(date);
console.log('ceil2hour', DateUtils.format(ceil2hour, simpleFormat));
console.log('floor2hour', DateUtils.format(floor2hour, simpleFormat));
console.log('round2hour', DateUtils.format(round2hour, simpleFormat));
console.log();

date = DateUtils.parse('2019-01-16 23:59:29.000', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2minute = DateUtils.ceil2minute(date);
let floor2minute = DateUtils.floor2minute(date);
let round2minute = DateUtils.round2minute(date);
console.log('ceil2minute', DateUtils.format(ceil2minute, simpleFormat));
console.log('floor2minute', DateUtils.format(floor2minute, simpleFormat));
console.log('round2minute', DateUtils.format(round2minute, simpleFormat));
console.log();

date = DateUtils.parse('2019-01-16 23:59:59.499', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2second = DateUtils.ceil2second(date);
let floor2second = DateUtils.floor2second(date);
let roundsecond = DateUtils.round2second(date);
console.log('ceil2second', DateUtils.format(ceil2second, simpleFormat));
console.log('floor2second', DateUtils.format(floor2second, simpleFormat));
console.log('roundsecond', DateUtils.format(roundsecond, simpleFormat));
console.log();

console.log('==== 周期计算 =====================');
let result = DateUtils.subtract(yesterday, date);
console.log('subtract', result);
console.log();

let dateArr = DateUtils.splitPeriodTime(3, tomorrow, yesterday);
console.log('splitPeriodTime', ':', 5, ',', DateUtils.format(tomorrow, simpleFormat), ',', DateUtils.format(yesterday, simpleFormat));
for (let d of dateArr) {
    console.log(' - ', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS a'));
}
console.log();

let d3 = DateUtils.getProgressTime(0.25, now, yesterday);
console.log('getProgressTime', ':', 0.25, ',', DateUtils.format(now, simpleFormat), ',', DateUtils.format(yesterday, simpleFormat));
console.log(DateUtils.format(d3, 'yyyy-MM-dd HH:mm:ss.SSS a'));
console.log();

console.log('==== DateFormat =====================');
let df = new DateFormat('yyyy年MM月dd日HH时mm分ss秒');
let d4 = df.parse('2007年04月11日13时30分00秒');
console.log('d4', df.format(d4));
console.log('yesterday', df.format(yesterday));
console.log('tomorrow', df.format(tomorrow));
console.log();

// 绑定Date类型方法
bindDatePrototype();
console.log('bindDatePrototype');
console.log('Date.format()', date.format(simpleFormat));

