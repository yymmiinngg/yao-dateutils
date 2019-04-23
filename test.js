const { DateUtils, DateFormat, bindDatePrototype } = require('./yao_dateutils');

// 时间计算
let now = new Date();
let yesterday = DateUtils.addDay(now, -1);
let tomorrow = DateUtils.addDay(now, 1);
console.log('now', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss'));
console.log('yesterday', DateUtils.format(yesterday, 'yyyy-MM-dd HH:mm:ss'));
console.log('tomorrow', DateUtils.format(tomorrow, 'yyyy-MM-dd HH:mm:ss'));

// 日期格式化 DateUtils.format(date, format)
console.log('format by "yyyy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('format by "yyyy年MM月dd日HH时mm分ss秒"', DateUtils.format(now, 'yyyy年MM月dd日HH时mm分ss秒'));
console.log('format by "yyyy-MM-dd hh:mm:ss a"', DateUtils.format(now, 'yyyy-MM-dd hh:mm:ss a'));
console.log('format by "yyyy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('round2month', DateUtils.format(DateUtils.round2month(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('round2day', DateUtils.format(DateUtils.round2day(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('round2hour', DateUtils.format(DateUtils.round2hour(now), 'yyyy-MM-dd HH:mm:ss'));

// 字符串转时间 DateUtils.parse(dateStr, format)
let d1 = DateUtils.parse('2019-02-02 02:02:02.002 pm', 'yyyy-MM-dd hh:mm:ss.SSS a');
console.log('d1', DateUtils.format(d1, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('d1', DateUtils.format(d1, 'yyyy-MM-dd HH:mm:ss.SSS'));

let d2 = DateUtils.parse('2019-02-02 pm', 'yyyy-MM-dd a');
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd HH:mm:ss.SSS a'));

// 时间减法
let result = DateUtils.subtract(yesterday, now);
console.log('subtract', result);

// 周期拆分
let dateArr = DateUtils.splitPeriodTime(4, tomorrow, yesterday);
console.log('splitPeriodTime', 4, DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss'), DateUtils.format(yesterday, 'yyyy-MM-dd HH:mm:ss'));
for (let d of dateArr) {
    console.log(' - ', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS a'));
}

// 获得进度点时间
let d3 = DateUtils.getProgressTime(0.25, now, yesterday);
console.log('getProgressTime', 0.25, DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss'), DateUtils.format(yesterday, 'yyyy-MM-dd HH:mm:ss'));
console.log(DateUtils.format(d3, 'yyyy-MM-dd HH:mm:ss.SSS a'));

// DateFormat
// 格式化日期
let df = new DateFormat('yyyy年MM月dd日HH时mm分ss秒');
console.log('now', df.format(now));
console.log('yesterday', df.format(yesterday));

// 字符串转成时间
let d4 = df.parse('2007年04月11日13时30分00秒');
console.log('d4', df.format(d4));

// 绑定Date类型方法
bindDatePrototype();
console.log('bindDatePrototype');
console.log('Date.format()', now.format('yyyy-MM-dd HH:mm:ss'));

