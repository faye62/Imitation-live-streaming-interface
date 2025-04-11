import {get, post} from '../config/axios';

class Mine {
    //获取资产数据
    async getMyInvest() {
        return get('/smst/invest/overview');
    }

    //获取我的分红记录
    async getMyDividend(data) {
        return get('/smst/invest/dividend-list', data);
    }

    //获取配货单
    async getMyDeliveryOrder() {
        return get('/smst/delivery-order/page');
    }

    //获取我的持股数据
    async getMyStockStructure() {
        return get('/smst/invest/stock-structure');
    }

    //获取店铺的采购报销数据
    async getExpenseOrder(data) {
        return get('/smst/expense-order/page', data);
    }

    //提交店铺的采购报销数据
    async createExpenseOrder(data) {
        return post('/smst/expense-order/create', data);
    }

    //获取报销选项
    async getExpenseOptions() {
        return get('/smst/expense-order/enum-list');
    }

    //获取店铺的库存盘点数据
    async getInventory(data) {
        return get('/smst/inventory/page', data);
    }

    async createInventory(data) {
        return post('/smst/inventory/create', data);
    }

    // //主动发起配货（央厨）
    // async activeLaunch(data) {
    //     return post('/smst/delivery-order/center/active-launch', data);
    // }
    //
    // //被动发起配货（央厨）
    // async passiveLaunch(data) {
    //     return post('/smst/delivery-order/center/passive-launch', data);
    // }
    //
    // //发起要货（门店）
    // async storeLaunch(data) {
    //     return post('/smst/delivery-order/store/launch', data);
    // }
    //
    // //修改配货单（发起时）（央厨）
    // async updateLaunch(data) {
    //     return post('/smst/delivery-order/center/update-launch', data);
    // }
    //
    // //修改配货单（到店时）（央厨）
    // async updateArrive(data) {
    //     return post('/smst/delivery-order/center/update-arrive', data);
    // }
    //
    // //确认签收（门店）
    // async confirmSign(data) {
    //     return post('/smst/delivery-order/store/confirm-sign', data);
    // }

}

export default new Mine();
