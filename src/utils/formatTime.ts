import dayjs from 'dayjs'

/**
 * 日期快捷选项适用于 el-date-picker
 */
export const defaultShortcuts = [
    {
        text: '今天',
        value: () => {
            return new Date()
        }
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return [date, date]
        }
    },
    {
        text: '最近七天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return [date, new Date()]
        }
    },
    {
        text: '最近 30 天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
            return [date, new Date()]
        }
    },
    {
        text: '本月',
        value: () => {
            const date = new Date()
            date.setDate(1) // 设置为当前月的第一天
            return [date, new Date()]
        }
    },
    {
        text: '今年',
        value: () => {
            const date = new Date()
            return [new Date(`${date.getFullYear()}-01-01`), date]
        }
    }
]

/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-MM、YYYY-MM-DD`
 * @description format 季度："YYYY-MM-DD HH:mm:ss QQQQ"
 * @description format 星期："YYYY-MM-DD HH:mm:ss WWW"
 * @description format 几周："YYYY-MM-DD HH:mm:ss ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-MM-DD HH:mm:ss WWW QQQQ ZZZ"
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(date: Date, format?: string): string {
    // 日期不存在，则返回空
    if (!date) {
        return ''
    }
    // 日期存在，则进行格式化
    return date ? dayjs(date).format(format ?? 'YYYY-MM-DD HH:mm:ss') : ''
}

/**
 * 获取当前的日期+时间
 */
export function getNowDateTime() {
    return dayjs()
}

/**
 * 获取当前日期是第几周
 * @param dateTime 当前传入的日期值
 * @returns 返回第几周数字值
 */
export function getWeek(dateTime: Date): number {
    const temptTime = new Date(dateTime.getTime())
    // 周几
    const weekday = temptTime.getDay() || 7
    // 周1+5天=周六
    temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
    let firstDay = new Date(temptTime.getFullYear(), 0, 1)
    const dayOfWeek = firstDay.getDay()
    let spendDay = 1
    if (dayOfWeek != 0) spendDay = 7 - dayOfWeek + 1
    firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
    const d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
    return Math.ceil(d / 7)
}

/**
 * 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @param param 当前时间，new Date() 格式或者字符串时间格式
 * @param format 需要转换的时间格式字符串
 * @description param 10秒：  10 * 1000
 * @description param 1分：   60 * 1000
 * @description param 1小时： 60 * 60 * 1000
 * @description param 24小时：60 * 60 * 24 * 1000
 * @description param 3天：   60 * 60* 24 * 1000 * 3
 * @returns 返回拼接后的时间字符串
 */
export function formatPast(param: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
    // 传入格式处理、存储转换值
    let t: any, s: number
    // 获取js 时间戳
    let time: number = new Date().getTime()
    // 是否是对象
    typeof param === 'string' || 'object' ? (t = new Date(param).getTime()) : (t = param)
    // 当前时间戳 - 传入时间戳
    time = Number.parseInt(`${time - t}`)
    if (time < 10000) {
        // 10秒内
        return '刚刚'
    } else if (time < 60000 && time >= 10000) {
        // 超过10秒少于1分钟内
        s = Math.floor(time / 1000)
        return `${s}秒前`
    } else if (time < 3600000 && time >= 60000) {
        // 超过1分钟少于1小时
        s = Math.floor(time / 60000)
        return `${s}分钟前`
    } else if (time < 86400000 && time >= 3600000) {
        // 超过1小时少于24小时
        s = Math.floor(time / 3600000)
        return `${s}小时前`
    } else if (time < 259200000 && time >= 86400000) {
        // 超过1天少于3天内
        s = Math.floor(time / 86400000)
        return `${s}天前`
    } else {
        // 超过3天
        const date = typeof param === 'string' || 'object' ? new Date(param) : param
        return formatDate(date, format)
    }
}

/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns 返回拼接后的时间字符串
 */
export function formatAxis(param: Date): string {
    const hour: number = new Date(param).getHours()
    if (hour < 6) return '凌晨好'
    else if (hour < 9) return '早上好'
    else if (hour < 12) return '上午好'
    else if (hour < 14) return '中午好'
    else if (hour < 17) return '下午好'
    else if (hour < 19) return '傍晚好'
    else if (hour < 22) return '晚上好'
    else return '夜里好'
}

/**
 * 将毫秒，转换成时间字符串。例如说，xx 分钟
 *
 * @param ms 毫秒
 * @returns {string} 字符串
 */
export function formatPast2(ms: number): string {
    const day = Math.floor(ms / (24 * 60 * 60 * 1000))
    const hour = Math.floor(ms / (60 * 60 * 1000) - day * 24)
    const minute = Math.floor(ms / (60 * 1000) - day * 24 * 60 - hour * 60)
    const second = Math.floor(ms / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60)
    if (day > 0) {
        return day + ' 天' + hour + ' 小时 ' + minute + ' 分钟'
    }
    if (hour > 0) {
        return hour + ' 小时 ' + minute + ' 分钟'
    }
    if (minute > 0) {
        return minute + ' 分钟'
    }
    if (second > 0) {
        return second + ' 秒'
    } else {
        return 0 + ' 秒'
    }
}


/**
 * 设置起始日期，时间为00:00:00
 * @param param 传入日期
 * @returns 带时间00:00:00的日期
 */
export function beginOfDay(param: Date): Date {
    return new Date(param.getFullYear(), param.getMonth(), param.getDate(), 0, 0, 0)
}

/**
 * 设置结束日期，时间为23:59:59
 * @param param 传入日期
 * @returns 带时间23:59:59的日期
 */
export function endOfDay(param: Date): Date {
    return new Date(param.getFullYear(), param.getMonth(), param.getDate(), 23, 59, 59)
}

/**
 * 计算两个日期间隔天数
 * @param param1 日期1
 * @param param2 日期2
 */
export function betweenDay(param1: Date, param2: Date): number {
    param1 = convertDate(param1)
    param2 = convertDate(param2)
    // 计算差值
    return Math.floor((param2.getTime() - param1.getTime()) / (24 * 3600 * 1000))
}

/**
 * 日期计算
 * @param param1 日期
 * @param param2 添加的时间
 */
export function addTime(param1: Date, param2: number): Date {
    param1 = convertDate(param1)
    return new Date(param1.getTime() + param2)
}

/**
 * 日期转换
 * @param param 日期
 */
export function convertDate(param: Date | string): Date {
    if (typeof param === 'string') {
        return new Date(param)
    }
    return param
}

/**
 * 指定的两个日期, 是否为同一天
 * @param a 日期 A
 * @param b 日期 B
 */
export function isSameDay(a: dayjs.ConfigType, b: dayjs.ConfigType): boolean {
    if (!a || !b) return false

    const aa = dayjs(a)
    const bb = dayjs(b)
    return aa.year() == bb.year() && aa.month() == bb.month() && aa.day() == bb.day()
}

/**
 * 获取一天的开始时间、截止时间
 * @param date 日期
 * @param days 天数
 */
export function getDayRange(
    date: dayjs.ConfigType,
    days: number
): [dayjs.ConfigType, dayjs.ConfigType] {
    const day = dayjs(date).add(days, 'd')
    return getDateRange(day, day)
}

/**
 * 获取最近7天的开始时间、截止时间
 */
export function getLast7Days(): [dayjs.ConfigType, dayjs.ConfigType] {
    const lastWeekDay = dayjs().subtract(7, 'd')
    const yesterday = dayjs().subtract(1, 'd')
    return getDateRange(lastWeekDay, yesterday)
}

/**
 * 获取最近30天的开始时间、截止时间
 */
export function getLast30Days(): [dayjs.ConfigType, dayjs.ConfigType] {
    const lastMonthDay = dayjs().subtract(30, 'd')
    const yesterday = dayjs().subtract(1, 'd')
    return getDateRange(lastMonthDay, yesterday)
}

/**
 * 获取最近1年的开始时间、截止时间
 */
export function getLast1Year(): [dayjs.ConfigType, dayjs.ConfigType] {
    const lastYearDay = dayjs().subtract(1, 'y')
    const yesterday = dayjs().subtract(1, 'd')
    return getDateRange(lastYearDay, yesterday)
}

/**
 * 获取指定日期的开始时间、截止时间
 * @param beginDate 开始日期
 * @param endDate 截止日期
 */
export function getDateRange(
    beginDate: dayjs.ConfigType,
    endDate: dayjs.ConfigType
): [string, string] {
    return [
        dayjs(beginDate).startOf('d').format('YYYY-MM-DD HH:mm:ss'),
        dayjs(endDate).endOf('d').format('YYYY-MM-DD HH:mm:ss')
    ]
}

/*
* @param duration 时间，单位秒
* */
export function formatDuration(duration) {
    if (!duration) return '1秒';
    const secondsInMinute = 60;
    const secondsInHour = 60 * 60;
    const secondsInDay = 24 * 60 * 60;

    if (duration < secondsInMinute) {
        return `${duration}秒`;
    } else if (duration < secondsInHour) {
        const minutes = Math.floor(duration / secondsInMinute);
        const seconds = duration % secondsInMinute;
        return seconds === 0 ? `${minutes}分钟` : `${minutes}分钟${seconds}秒`;
    } else if (duration < secondsInDay) {
        const hours = Math.floor(duration / secondsInHour);
        const minutes = Math.floor((duration % secondsInHour) / secondsInMinute);
        const seconds = duration % secondsInMinute;
        return seconds === 0
            ? minutes === 0
                ? `${hours}小时`
                : `${hours}小时${minutes}分钟`
            : `${hours}小时${minutes}分钟${seconds}秒`;
    } else {
        const days = Math.floor(duration / secondsInDay);
        const hours = Math.floor((duration % secondsInDay) / secondsInHour);
        const minutes = Math.floor((duration % secondsInHour) / secondsInMinute);
        const seconds = duration % secondsInMinute;
        return seconds === 0
            ? minutes === 0
                ? hours === 0
                    ? `${days}天`
                    : `${days}天${hours}小时`
                : `${days}天${hours}小时${minutes}分钟`
            : `${days}天${hours}小时${minutes}分钟${seconds}秒`;
    }
}

// 获取日期
export function getDay(dayDiff: number): String {
    return formatDate(addTime(new Date(), dayDiff * 1000 * 3600 * 24), "YYYYMMDD")
}

export function getDayAdd(dayDiff: number): String {
    return formatDate(addTime(new Date(), dayDiff * 1000 * 3600 * 24), "YYYY-MM-DD")
}

export function getDayAddSimple(dayDiff: number): String {
    return formatDate(addTime(new Date(), dayDiff * 1000 * 3600 * 24), "MM-DD")
}

export function getDayAddHms(dayDiff: number): String {
    return formatDate(addTime(new Date(), dayDiff * 1000 * 3600 * 24), "YYYY-MM-DD hh:mm:ss")
}

export function formatTimestamp(timestamp: number): string {
    if (!timestamp) return '';
    return formatDate(new Date(timestamp), 'YYYY-MM-DD HH:mm:ss')
}

//获取某一天的开始

export function getDayBegin(date: Date | number,format:string = 'YYYY-MM-DD HH:mm:ss'): string {
  let newDate: Date;
  if (typeof date === 'number') {
    const today = new Date();
    newDate = new Date(today.setDate(today.getDate() + date));
  } else {
    newDate = new Date(date);
  }
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  return formatDate(newDate, format);
}

// export function getDayBegin(date: Date | number): string {
//   let newDate: Date;
//   if (typeof date === 'number') {
//     const today = new Date();
//     newDate = new Date(today.setDate(today.getDate() + date));
//   } else {
//     newDate = new Date(date);
//   }
//   newDate.setHours(0);
//   newDate.setMinutes(0);
//   newDate.setSeconds(0);
//   console.log(newDate,'11')
//   console.log(formatDate(newDate,'YYYY-MM-DD hh:mm:ss'),'getDayBegin');
//   return formatDate(newDate, "YYYY-MM-DD HH:mm:ss");
// }
//获取某一天的结束
export function getDayEnd(date: Date | number): string {
    let newDate: Date;
    if (typeof date === 'number') {
        const today = new Date();
        newDate = new Date(today.setDate(today.getDate() + date));
    } else {
        newDate = new Date(date);
    }
    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);
    return formatDate(newDate, "YYYY-MM-DD HH:mm:ss");
}

// 获取今天和前6天的日期
export const getTodayAndPreviousSixDays = () => {
    const today = new Date();

    // 计算前6天的日期
    const sixDaysAgo = new Date(today);
    sixDaysAgo.setDate(today.getDate() - 6);

    return {
        today,
        sixDaysAgo
    };
}

// 获取上周一和上周日的日期
export const getLastWeekDates = () => {
    const today = new Date();

    // 计算今天是本周的第几天 (0:周日, 1:周一, ..., 6:周六)
    const dayOfWeek = today.getDay();

    // 计算上周一的日期 (今天的日期 - 本周的天数 - 6)
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - dayOfWeek - 7 + 1); // 上周一

    // 计算上周日的日期 (上周一 + 6天)
    const lastSunday = new Date(today);
    lastSunday.setDate(lastMonday.getDate() + 6); // 上周日

    return {
        lastMonday,
        lastSunday
    };
}

/**
 * 获取日期 年月日时分秒格式
 *  @param date 日期 YYYY-MM-DD 格式
 * @param startFormat 时间 HH:mm:ss 格式
 * @param endFormat 时间 HH:mm:ss 格式
 * @return startDate 开始日期 YYYY-MM-DD HH:mm:ss 格式
 * @return endDate 结束日期 YYYY-MM-DD HH:mm:ss 格式
 * */
export const getTodayHsm = (date: Date[], startFormat: string = '00:00:00', endFormat: string = '23:59:59') => {
    if (!date) return;
    const result = {
        startDate: '',
        endDate: ''
    }
    const [startDate, endDate] = date;

    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    const isValidTimeFormat = regex.test(startFormat) && regex.test(endFormat); // 判断时间格式是否正确
    if (!isValidTimeFormat) {
        result.startDate = startDate + ' 00:00:00';
        result.endDate = endDate + ' 23:59:59';
    } else {
        result.startDate = startDate + ' ' + startFormat;
        result.endDate = endDate + ' ' + endFormat;
    }
    return result;
}

/**
 * 判断当前日期是周几
 * @param {string | Date} date - 日期字符串或 Date 对象，默认为当前日期
 * @returns {string} 返回周几，例如 "周一"、"周二" 等
 */
export const getWeekday = (date = new Date()) => {
    // 使用 dayjs 处理日期
    const day = dayjs(date);

    // 获取星期几的数字（0 为周日，1 为周一，...，6 为周六）
    const weekdayNumber = day.day();

    // 将数字转换为中文周几
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[weekdayNumber];
}

/**
 * 通过时间戳计算前一天和后一天的日期
 * @param {string} dateStr - 输入日期字符串，格式为 YYYY-DD-MM（年-日-月）
 * @returns {Object} - 返回格式为 { previousDay: 'YYYY-MM-DD', nextDay: 'YYYY-MM-DD' }
 */
export const getPreviousAndNextDay=(dateStr)=> {
  // 解析输入的年、月、日
  const [year, month, day] = dateStr.split('-').map(Number);

  // 创建 Date 对象（月份从 0 开始，需减 1）
  const date = new Date(year, month - 1, day);

  // 验证日期有效性
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    throw new Error('Invalid date: 输入格式应为 YYYY-MM-DD，且日期需合法');
  }

  // 计算前后一天的时间戳
  const timestamp = date.getTime();
  const ONE_DAY_MS = 86400000; // 1天的毫秒数
  const prevDate = new Date(timestamp - ONE_DAY_MS);
  const nextDate = new Date(timestamp + ONE_DAY_MS);


  return {
    previousDay: formatDate(prevDate,'YYYY-MM-DD'),
    nextDay: formatDate(nextDate,'YYYY-MM-DD')
  };
}

/**
 * 计算和比较两个日期的工具函数
 * @param {string|Date} date1 - 第一个日期（格式为 YYYY-MM-DD 或 Date 对象）
 * @param {string|Date} date2 - 第二个日期（格式为 YYYY-MM-DD 或 Date 对象）
 * @returns {Object} - 返回包含比较结果和差值的结果对象
 */
export const compareDates = (date1, date2)=> {
  // 将输入转换为 Date 对象
  const parseDate = (date) => {
    if (typeof date === 'string') {
      const [year, month, day] = date.split('-').map(Number);
      return new Date(year, month - 1, day); // 月份从 0 开始
    }
    if (date instanceof Date) {
      return date;
    }
    throw new Error('Invalid date format. Use YYYY-MM-DD or Date object.');
  };

  const d1 = parseDate(date1);
  const d2 = parseDate(date2);

  // 验证日期有效性
  if (isNaN(d1.getTime())) throw new Error('Invalid date1');
  if (isNaN(d2.getTime())) throw new Error('Invalid date2');

  // 计算时间戳差值（单位：毫秒）
  const timeDiff = d2.getTime() - d1.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数

  // 比较日期
  let comparison;
  if (dayDiff === 0) {
    comparison = 0 // 同一天
  } else if (dayDiff < 0) {
    comparison = 1 // date1 早于 date2
  } else {
    comparison = -1 // date1 晚于 date2
  }

  return {
    comparison, // 比较结果
    dayDiff: Math.abs(dayDiff), // 天数差（绝对值）
    date1: d1.toISOString().split('T')[0], // 格式化 date1
    date2: d2.toISOString().split('T')[0], // 格式化 date2
  };
}




