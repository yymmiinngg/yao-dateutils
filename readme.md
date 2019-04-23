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

## 增加天数

DateUtils.addDay(n);

```
let now = new Date();
let yesterday = DateUtils.addDay(now, -1);
let tomorrow = DateUtils.addDay(now, 1);
```
输出
```
now 2019-04-23 14:50:12
yesterday 2019-04-22 14:50:12
tomorrow 2019-04-24 14:50:12
```

## 格式化Date

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
let now = new Date();
console.log('format by "yyyy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('format by "yyyy年MM月dd日HH时mm分ss秒"', DateUtils.format(now, 'yyyy年MM月dd日HH时mm分ss秒'));
console.log('format by "yyyy-MM-dd hh:mm:ss a"', DateUtils.format(now, 'yyyy-MM-dd hh:mm:ss a'));
console.log('format by "yyyy-MM-dd HH:mm:ss.SSS"', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('round2month', DateUtils.format(DateUtils.round2month(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('round2day', DateUtils.format(DateUtils.round2day(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('round2hour', DateUtils.format(DateUtils.round2hour(now), 'yyyy-MM-dd HH:mm:ss'));
```
输出
```
format by "yyyy-MM-dd HH:mm:ss.SSS" 2019-04-23 14:14:22.507
format by "yyyy年MM月dd日HH时mm分ss秒" 2019年04月23日14时14分22秒
format by "yyyy-MM-dd hh:mm:ss a" 2019-04-23 02:14:22 pm
format by "yyyy-MM-dd HH:mm:ss.SSS" 2019-04-23 14:14:22.507
round2month 2019-04-01 00:00:00
round2day 2019-04-23 00:00:00
round2hour 2019-04-23 14:00:00
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
console.log('d2', DateUtils.format(d2, 'yyyy-MM-dd HH:mm:ss.SSS a'));
```
输出
```
d1 2019-02-02 02:02:02.002 pm
d1 2019-02-02 14:02:02.002
d2 2019-02-02 00:00:00.000 pm
d2 2019-02-02 12:00:00.000 pm
```

## 时间减法

DateUtils.subtract(d1, d2);

```
let yesterday = DateUtils.addDay(now, -1);
let result = DateUtils.subtract(yesterday, now);
console.log('subtract', result);
```
输出
```
subtract { days: -1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  totaldays: -1,
  totalhours: -24,
  totalminutes: -1440,
  totalseconds: -86400,
  totalmilliseconds: -86400000 }
```

## 周期拆分

DateUtils.splitPeriodTime(n, d1, d2)

```
let dateArr = DateUtils.splitPeriodTime(4, now, yesterday);
console.log('splitPeriodTime');
for (let d of dateArr) {
    console.log(' - ', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS a'));
}
```
输出
```
splitPeriodTime 4 2019-04-23 14:18:53 2019-04-22 14:18:53
 -  2019-04-23 14:18:53.712 pm
 -  2019-04-23 08:18:53.712 am
 -  2019-04-23 02:18:53.712 am
 -  2019-04-22 14:18:53.712 pm
```

## 获得进度点时间

DateUtils.getProgressTime(n, d1, d2);

```
let d3 = DateUtils.getProgressTime(0.25, now, yesterday);
console.log('getProgressTime', DateUtils.format(d3, 'yyyy-MM-dd HH:mm:ss.SSS a'));
```
输出
```
getProgressTime 0.25 2019-04-23 14:18:53 2019-04-22 14:18:53
2019-04-23 08:18:53.712 am
```
# DateFormat

日期格式类，设置一个format字符串，重复使用

## 格式化日期
```
let df = new DateFormat('yyyy年MM月dd日HH时mm分ss秒');
console.log('now', df.format(now));
console.log('yesterday', df.format(yesterday));
```
输出
```
now 2019年04月23日14时39分27秒
yesterday 2019年04月22日14时39分27秒
```

## 字符串转成时间
```
let d4 = df.parse('2007年04月11日13时30分00秒');
console.log('d4', df.format(d4));
```
输出
```
d4 2007年04月11日13时30分00秒
```

# bindDatePrototype()

绑定Date类型方法

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