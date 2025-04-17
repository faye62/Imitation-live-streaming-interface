class RandomTool {
    constructor(seed) {
        this.seed = seed;
    }

    seededRandom() {
        // 线性同余生成器
        const m = 0x80000000; // 2^31
        const a = 1103515245;
        const c = 12345;
        let state = this.seed || Math.floor(Math.random() * m);

        return function () {
            state = (a * state + c) % m;
            return state / m; // 生成一个范围在 [0, 1) 的随机数
        };
    }

    generateSingleNumber(min, max, decimalPlaces) {
        const random = this.seededRandom(this.seed); // 创建一个可复现的随机数生成器
        const rand = random() * (max - min) + min; // 生成在 [min, max) 范围内的随机数
        return parseFloat(rand.toFixed(decimalPlaces)); // 保留指定的小数位数
    }

}

/**
 * 自定义数据生成器
 * @param {number} templateNum 自定义模板数量 单位：万
 */
class CustomData {
    static dataTemplate = {
        placeGMV: 0,// 下单GMV
        salesNum: 0,// 销量
        transactionPeople: 0,// 成交人数
        transactionRate: 0,// 成交转化率
        transactionAmount: 0,// 成交金额 （去掉退款金额）
        unitPrice: 0,// 单价
        lookPeoples: 0,// 观看人数
    };

    constructor(templateNum = 0, seed) {
        this.templateNum = templateNum;
        this.randomTool = new RandomTool(seed);
    }

    static getDataTemplate() {
        return {
            placeGMV: 0,// 下单GMV
            salesNum: 0,// 销量
            transactionPeople: 0,// 成交人数
            transactionRate: 0,// 成交转化率
            transactionAmount: 0,// 成交金额 （去掉退款金额）
            unitPrice: 0,// 单价
            lookPeoples: 0,// 观看人数
        };
    }

    getData() {
        const dataTemplate = CustomData.getDataTemplate();
        let placeGMV = this.templateNum * 10000;

        // 提高基础GMV随机范围
        dataTemplate.placeGMV = this.randomTool.generateSingleNumber(placeGMV, placeGMV * 1.2, 1);

        // 调整销量计算公式，降低销量基数（从88降到30-50）
        const salesBase = 30 + this.randomTool.generateSingleNumber(0, 20, 0);
        dataTemplate.salesNum = (this.templateNum * salesBase) + this.randomTool.generateSingleNumber(0, 50, 0);

        // 调整观看人数系数（从0.2降到0.1）
        dataTemplate.lookPeoples = parseFloat((dataTemplate.placeGMV * 0.1).toFixed(0)) + this.randomTool.generateSingleNumber(0, 300, 0);

        // 提高成交人数比例（从0.4提高到0.6）
        dataTemplate.transactionPeople = parseFloat((dataTemplate.salesNum * 0.6).toFixed(0)) + this.randomTool.generateSingleNumber(0, 50, 0);

        // 成交转化率
        dataTemplate.transactionRate = parseFloat((dataTemplate.transactionPeople / dataTemplate.lookPeoples * 100).toFixed(2));

        // 提高成交金额比例（从0.7提高到0.85）
        dataTemplate.transactionAmount = parseFloat((dataTemplate.placeGMV * 0.85).toFixed(2)) + this.randomTool.generateSingleNumber(0, 5000, 0);

        // 客单价计算（增加最低保障）
        const rawUnitPrice = dataTemplate.transactionAmount / dataTemplate.salesNum;
        dataTemplate.unitPrice = parseFloat((rawUnitPrice < 50 ? 50 + this.randomTool.generateSingleNumber(0, 50, 0) : rawUnitPrice).toFixed(2));

        CustomData.dataTemplate = dataTemplate;
        return dataTemplate;
    }

    // 处理数据 逐渐自增
    processData(data) {
        CustomData.dataTemplate.placeGMV += this.randomTool.generateSingleNumber(3000, 5000, 1);

        // 调整销量增长基数（从88降到40）
        let tempNum = CustomData.dataTemplate.placeGMV / 10000;
        CustomData.dataTemplate.salesNum += (tempNum * 40) + this.randomTool.generateSingleNumber(0, 80, 0);

        // 调整观看人数系数
        CustomData.dataTemplate.lookPeoples = parseFloat((data.placeGMV * 0.12).toFixed(0)) + this.randomTool.generateSingleNumber(0, 400, 0);

        // 提高成交人数比例
        CustomData.dataTemplate.transactionPeople = parseFloat((data.salesNum * 0.65).toFixed(0)) + this.randomTool.generateSingleNumber(0, 80, 0);

        // 成交转化率
        CustomData.dataTemplate.transactionRate = (data.lookPeoples === 0) ? 0 : parseFloat((data.transactionPeople / data.lookPeoples * 100).toFixed(2));

        // 提高成交金额比例
        CustomData.dataTemplate.transactionAmount = parseFloat((data.placeGMV * 0.88).toFixed(2)) + this.randomTool.generateSingleNumber(0, 8000, 0);

        // 客单价计算（增加最低保障）
        const rawUnitPrice = data.transactionAmount / data.salesNum;
        CustomData.dataTemplate.unitPrice = parseFloat((rawUnitPrice < 60 ? 60 + this.randomTool.generateSingleNumber(0, 40, 0) : rawUnitPrice).toFixed(2));

        return CustomData.dataTemplate;
    }
}

/**
 * 处理生成的数据
 * @param {Object} data 数据模板
 *
 */
class DataProcessor {
    // 处理数据
    static processData(data) {

    }
}

class DataGenerator {
    // 生成递减的浮点数序列（金额类，保留1位小数）
    static generateDecreasingFloats(total, n) {
        // 确保total是保留1位小数的数字
        total = parseFloat(total.toFixed(1));

        const weights = Array.from({length: n}, (_, i) => n - i);
        const totalWeight = weights.reduce((a, b) => a + b, 0);

        // 生成基础值（保留2位小数计算）
        const baseValues = weights.map(w => {
            const value = (w / totalWeight) * total;
            return parseFloat(value.toFixed(2));
        });

        // 计算并调整总和误差
        let currentSum = baseValues.reduce((a, b) => a + b, 0);
        let diff = parseFloat((total - currentSum).toFixed(2));

        const adjustedValues = [...baseValues];
        adjustedValues[n - 1] = parseFloat((adjustedValues[n - 1] + diff).toFixed(2));

        // 二次验证并确保最终值保留1位小数
        const finalValues = adjustedValues.map(v => parseFloat(v.toFixed(1)));
        const finalSum = finalValues.reduce((a, b) => a + b, 0);

        // 处理可能的微小误差（不超过0.1）
        if (Math.abs(finalSum - total) > 0.1) {
            finalValues[0] = parseFloat((finalValues[0] + (total - finalSum)).toFixed(1));
        }

        return finalValues.sort((a, b) => b - a); // 确保递减顺序
    }

// 生成递减的整数序列（销量类）
    static generateDecreasingIntegers(total, n) {
        // 边界情况处理
        if (n === 0) return [];
        if (n === 1) return [total];

        // 生成初始递减序列
        const sequence = Array(n).fill(0);
        let remaining = total;

        // 计算基准值和余数
        const avg = Math.floor(total / n);
        const remainder = total % n;

        // 分配基础值
        for (let i = 0; i < n; i++) {
            sequence[i] = avg;
            remaining -= avg;
        }

        // 分配余数（优先分配给前面的元素）
        for (let i = 0; i < remainder; i++) {
            sequence[i]++;
            remaining--;
        }

        // 转换为严格递减序列
        sequence.sort((a, b) => b - a);
        for (let i = 1; i < n; i++) {
            if (sequence[i] >= sequence[i - 1]) {
                sequence[i] = Math.max(0, sequence[i - 1] - 1);
            }
        }

        // 验证并修正总和
        const currentTotal = sequence.reduce((a, b) => a + b, 0);
        if (currentTotal !== total) {
            const diff = total - currentTotal;
            sequence[0] += diff;

            // 重新确保递减
            for (let i = 1; i < n; i++) {
                if (sequence[i] >= sequence[i - 1]) {
                    sequence[i] = Math.max(0, sequence[i - 1] - 1);
                }
            }
        }

        return sequence;
    }

    // 主生成方法
    // 在 DataGenerator 类中修改 generate 方法
    static generate(items, totals) {
        const n = items.length;
        if (n === 0) return items;

        // 生成各字段数据
        const gmvList = this.generateDecreasingFloats(totals.placeGMV, n);
        const salesList = this.generateDecreasingIntegers(totals.salesNum, n);
        const amountList = this.generateDecreasingFloats(totals.transactionAmount, n);

        // 计算平均客单价
        const avgUnitPrice = totals.transactionAmount / totals.salesNum;

        return items.map((item, index) => {
            // 确保商品价格不低于平均客单价的80%
            const minPrice = avgUnitPrice * 0.8;
            const itemPrice = item.price > minPrice ? item.price : minPrice;

            return {
                ...item,
                price: Math.round(itemPrice * 10) / 10,
                gmv: Math.round(gmvList[index] * 10) / 10,
                sales: salesList[index],
                amount: Math.round(amountList[index] * 10) / 10
            };
        });
    }
}

export {
    CustomData,
    DataGenerator,
};
