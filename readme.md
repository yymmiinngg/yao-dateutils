# yao-dateutils

一个Java程序员开发的日期时间类工具集，封装了一系列针对日期时间对象(Date)的常规操作

```
npm install yao-dateutils
```

## 引入模块
```
const { DateUtils, DateFormat, bindDatePrototype } = require('yao-dateutils');
```

- DateUtils 日期工具集
- DateFormat 日期格式化类
- bindDatePrototype 运行此方法可将日期工具集函数绑定到Date.prototype上

# DateUtils

## 时间格式化

DateUtils.format(date, format);

### format
- yyyy: 年份(如2019);
- yy: 短年份(如19);
- MM: 月份，10以下用0补位;
- M: 月份(1~12);
- dd: 日子，10以下用0补位;
- d: 日子(0~31);
- HH: 小时，10以下用0补位;
- H: 小时(0~23);
- hh: 小时，10以下用0补位;
- h: 小时(0~11);
- mm: 分钟，10以下用0补位;
- m: 分钟(0~59);
- ss: 秒，10以下用0补位;
- s: 秒(0~59);
- SSS: 毫秒，100以下用0补位;
- S: 毫秒(0~999);
- a: am或pm

```
let simpleFormat = 'yyyy-MM-dd HH:mm:ss.SSS';
let now = new Date();
console.log('format by "yyyy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('format by "yyyy年MM月dd日HH时mm分ss秒"', DateUtils.format(now, 'yyyy年MM月dd日HH时mm分ss秒'));
console.log('format by "yyyy-MM-dd hh:mm:ss a"', DateUtils.format(now, 'yyyy-MM-dd hh:mm:ss a'));
console.log('format by "yy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yy-MM-dd HH:mm:ss.SSS'));
```
输出
```
format by "yyyy-MM-dd HH:mm:ss.SSS" 2019-04-25 17:50:21.579
format by "yyyy年MM月dd日HH时mm分ss秒" 2019年04月25日17时50分21秒
format by "yyyy-MM-dd hh:mm:ss a" 2019-04-25 05:50:21 pm
format by "yy-MM-dd HH:mm:ss.SSS" 19-04-25 17:50:21.579
```

## 字符串转换成Date

DateUtils.parse(datestr, format);

### format
- yyyy: 年份(如2019);
- yy: 短年份(如19);
- MM: 月份;
- dd: 日子;
- HH: 小时(0~23);
- hh: 小时(0~11);
- mm: 分钟;
- ss: 秒;
- SSS: 毫秒;
- a: am或pm

```
let d1 = DateUtils.parse('2019-02-02 02:02:02.002 pm', 'yyyy-MM-dd hh:mm:ss.SSS a');
console.log('d1', DateUtils.format(d1, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('d1', DateUtils.format(d1, 'yyyy-MM-dd HH:mm:ss.SSS'));
let d2 = DateUtils.parse('2019-02-02 pm', 'yyyy-MM-dd a');
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd HH:mm:ss.SSS'));
```
输出
```
d1 2019-02-02 02:02:02.002 pm
d1 2019-02-02 14:02:02.002
d2 2019-02-02 00:00:00.000 pm
d2 2019-02-02 12:00:00.00
```

## 时间计算

```
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
```
输出
```
date 2019-04-25 17:50:21.579
yesterday 2019-04-24 17:50:21.579
tomorrow 2019-04-26 17:50:21.579
lastHour 2019-04-25 16:50:21.579
nextHour 2019-04-25 18:50:21.579
lastMinute 2019-04-25 17:49:21.579
nextMinute 2019-04-25 17:51:21.579
lastSecond 2019-04-25 17:50:20.579
nextSecond 2019-04-25 17:50:22.579
```

## 时间取整

```
date = DateUtils.parse('2019-02-16 00:00:00.000', simpleFormat);
let ceil2month = DateUtils.ceil2month(date);
let floor2month = DateUtils.floor2month(date);
let round2month = DateUtils.round2month(date);
console.log('date', DateUtils.format(date, simpleFormat));
console.log('ceil2month', DateUtils.format(ceil2month, simpleFormat));
console.log('floor2month', DateUtils.format(floor2month, simpleFormat));
console.log('round2month', DateUtils.format(round2month, simpleFormat));

date = DateUtils.parse('2019-01-16 11:00:00.000', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2day = DateUtils.ceil2day(date);
let floor2day = DateUtils.floor2day(date);
let round2day = DateUtils.round2day(date);
console.log('ceil2day', DateUtils.format(ceil2day, simpleFormat));
console.log('floor2day', DateUtils.format(floor2day, simpleFormat));
console.log('round2day', DateUtils.format(round2day, simpleFormat));

date = DateUtils.parse('2019-01-16 23:29:00.000', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2hour = DateUtils.ceil2hour(date);
let floor2hour = DateUtils.floor2hour(date);
let round2hour = DateUtils.round2hour(date);
console.log('ceil2hour', DateUtils.format(ceil2hour, simpleFormat));
console.log('floor2hour', DateUtils.format(floor2hour, simpleFormat));
console.log('round2hour', DateUtils.format(round2hour, simpleFormat));

date = DateUtils.parse('2019-01-16 23:59:29.000', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2minute = DateUtils.ceil2minute(date);
let floor2minute = DateUtils.floor2minute(date);
let round2minute = DateUtils.round2minute(date);
console.log('ceil2minute', DateUtils.format(ceil2minute, simpleFormat));
console.log('floor2minute', DateUtils.format(floor2minute, simpleFormat));
console.log('round2minute', DateUtils.format(round2minute, simpleFormat));

date = DateUtils.parse('2019-01-16 23:59:59.499', simpleFormat);
console.log('date', DateUtils.format(date, simpleFormat));
let ceil2second = DateUtils.ceil2second(date);
let floor2second = DateUtils.floor2second(date);
let roundsecond = DateUtils.round2second(date);
console.log('ceil2second', DateUtils.format(ceil2second, simpleFormat));
console.log('floor2second', DateUtils.format(floor2second, simpleFormat));
console.log('roundsecond', DateUtils.format(roundsecond, simpleFormat));
```
输出
```
date 2019-02-16 00:00:00.000
ceil2month 2019-03-01 00:00:00.000
floor2month 2019-02-01 00:00:00.000
round2month 2019-03-01 00:00:00.000

date 2019-01-16 11:00:00.000
ceil2day 2019-01-17 00:00:00.000
floor2day 2019-01-16 00:00:00.000
round2day 2019-01-16 00:00:00.000

date 2019-01-16 23:29:00.000
ceil2hour 2019-01-17 00:00:00.000
floor2hour 2019-01-16 23:00:00.000
round2hour 2019-01-16 23:00:00.000

date 2019-01-16 23:59:29.000
ceil2minute 2019-01-17 00:00:00.000
floor2minute 2019-01-16 23:59:00.000
round2minute 2019-01-16 23:59:00.000

date 2019-01-16 23:59:59.499
ceil2second 2019-01-17 00:00:00.000
floor2second 2019-01-16 23:59:59.000
roundsecond 2019-01-16 23:59:59.000
```

## 周期计算

```
let result = DateUtils.subtract(yesterday, date);
console.log('subtract', result);

let dateArr = DateUtils.splitPeriodTime(3, tomorrow, yesterday);
console.log('splitPeriodTime', ':', 5, ',', DateUtils.format(tomorrow, simpleFormat), ',', DateUtils.format(yesterday, simpleFormat));
for (let d of dateArr) {
    console.log(' - ', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS a'));
}

let d3 = DateUtils.getProgressTime(0.25, now, yesterday);
console.log('getProgressTime', ':', 0.25, ',', DateUtils.format(now, simpleFormat), ',', DateUtils.format(yesterday, simpleFormat));
console.log(DateUtils.format(d3, 'yyyy-MM-dd HH:mm:ss.SSS a'));
```
输出
```
subtract { days: 97,
  hours: 17,
  minutes: 50,
  seconds: 22,
  milliseconds: 80,
  totaldays: 98,
  totalhours: 2346,
  totalminutes: 140751,
  totalseconds: 8445023,
  totalmilliseconds: 8445022080 }

splitPeriodTime : 5 , 2019-04-26 17:50:21.579 , 2019-04-24 17:50:21.579
 -  2019-04-26 17:50:21.579 pm
 -  2019-04-25 17:50:21.579 pm
 -  2019-04-24 17:50:21.579 pm

getProgressTime : 0.25 , 2019-04-25 17:50:21.579 , 2019-04-24 17:50:21.579
2019-04-25 11:46:43.397 am
```

# DateFormat

日期格式类，设置一个format字符串，重复使用

```
let df = new DateFormat('yyyy年MM月dd日HH时mm分ss秒');
let d4 = df.parse('2007年04月11日13时30分00秒');
console.log('d4', df.format(d4));
console.log('yesterday', df.format(yesterday));
console.log('tomorrow', df.format(tomorrow));
```
输出
```
d4 2007年04月11日13时30分00秒
yesterday 2019年04月24日17时50分21秒
tomorrow 2019年04月26日17时50分21秒
```

# bindDatePrototype()

绑定Date类型方法

- 'format',
- 'ceil2month', 'floor2month', 'round2month',
- 'ceil2day', 'floor2day', 'round2day',
- 'ceil2hour', 'floor2hour', 'round2hour',
- 'ceil2minute', 'floor2minute', 'round2minute',
- 'ceil2second', 'floor2second', 'round2second',
- 'addDay', 'addHour', 'addMinute', 'addSecond', 'addMillisecond'

```
bindDatePrototype();
console.log('bindDatePrototype');
console.log('Date.format()', now.format('yyyy-MM-dd HH:mm:ss'));
```
输出
```
bindDatePrototype
Date.format() 2019-04-23 14:14:22
```