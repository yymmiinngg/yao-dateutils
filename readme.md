# yao-dateutils

一个Java程序员开发的日期时间类工具集，封装了一系列针对日期时间对象(Date)的常规操作

```
npm install yao-dateutils
```

## 引入模块
```
const DU = require('yao-dateutils');
```

## 格式化Date
```
let str = DU.format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
console.log('当前时间', str);
```
输出
```
当前时间 2019-04-14 02:55:57.239
```

字符串转Date对象
```
let d = DU.parse('2019-02-02 02:02:02.002 pm', 'yyyy-MM-dd HH:mm:ss.SSS a');
console.log('时间', DateUtils.format(d, 'yyyy-MM-dd HH:mm:ss.SSS'));
```
输出
```
时间 2019-02-02 20:02:02.002
```

## Formater
格式化元素
- yyyy: 年份(如2019);
- yy: 短年份(如19);
- MM: 月份，10以下用0补位;
- M: 月份(1~12);
- dd: 日子，10以下用0补位;
- d: 日子(0~31);
- HH: 小时，10以下用0补位;
- H: 小时(0~24);
- hh: 小时，10以下用0补位;
- h: 小时(0~12);
- mm: 分钟，10以下用0补位;
- m: 分钟(0~59);
- ss: 秒，10以下用0补位;
- s: 秒(0~59);
- SSS: 毫秒，100以下用0补位;
- S: 毫秒(0~999);
- a: ama或pm