# yao-dateutils

一个Java程序员开发的日期时间类工具集，封装了一系列针对日期时间对象(Date)的常规操作

```
npm install yao-dateutils
```

## 引入模块
```
const { DateUtils, DateFormat, bindDatePrototype } = require('yao-dateutils');
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
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('当前时间', DateUtils.format(now, 'yyyy年MM月dd日HH时mm分ss秒'));
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd hh:mm:ss a'));
console.log('当前时间', DateUtils.format(now, 'yyyy-MM-dd HH:mm:ss.SSS'));
console.log('取整月份', DateUtils.format(DateUtils.round2month(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('取整日期', DateUtils.format(DateUtils.round2day(now), 'yyyy-MM-dd HH:mm:ss'));
console.log('取整小时', DateUtils.format(DateUtils.round2hour(now), 'yyyy-MM-dd HH:mm:ss'));
```
输出
```
当前时间 2019-04-22 19:46:39.274
当前时间 2019年04月22日19时46分39秒
当前时间 2019-04-22 07:46:39 pm
当前时间 2019-04-22 19:46:39.274
取整月份 2019-04-01 00:00:00
取整日期 2019-04-22 00:00:00
取整小时 2019-04-22 19:00:00
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
let d = DateUtils.parse('2019-02-02 02:02:02.002 pm', 'yyyy-MM-dd hh:mm:ss.SSS a');
console.log('字符串转时间', DateUtils.format(d, 'yyyy-MM-dd hh:mm:ss.SSS a'));
console.log('字符串转时间', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS'));
```
输出
```
字符串转时间 2019-02-02 02:02:02.002 pm
字符串转时间 2019-02-02 14:02:02.002
```

## 时间减法
```
let yesterday = DateUtils.addDay(now, -1);
let result = DateUtils.subtract(yesterday, now);
console.log('减法所得', result);
```
输出
```
减法所得 { days: -1,
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
```
let dateArr = DateUtils.split(now, yesterday, 4);
for (let d of dateArr) {
    console.log(' - ', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS a'));
}
```
输出
```
 -  2019-04-22 19:46:39.274 pm
 -  2019-04-22 13:46:39.274 pm
 -  2019-04-22 07:46:39.274 am
 -  2019-04-22 01:46:39.274 am
 -  2019-04-21 19:46:39.274 pm
```

## 绑定Date类型方法
```
bindDatePrototype();
console.log('绑定Date类型方法：Date.format()', now.format('yyyy-MM-dd HH:mm:ss'));
```
输出
```
绑定Date类型方法：Date.format() 2019-04-22 19:56:16
```