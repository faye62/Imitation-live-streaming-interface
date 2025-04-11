import {get, post} from '../config/axios';

class Store {
    // 批量更新店铺图片
    // async massUpdataImg(shopId, menuList) {
    //   return await post(`v1/shop/batchUpdateSpu?shopId=${shopId}`, menuList, {});
    // }
    //获取所有客户
    async getCustomer(name) {
        return get(`/admin-api/cms/qywx/search-customer?name=${name}`, {});
    }

    //绑定客户
    async bindChatGroup(customerId, chatGroupId) {
        return post(
            `/admin-api/cms/qywx/bind-customer`,
            {
                customerId,
                chatGroupId
            }
        );
    }

    //通过群id获得绑定客户
    async getCustomerByChatGroupId(chatGroupId) {
        return get(
            `/admin-api/cms/qywx/customer-list?chatGroupId=${chatGroupId}`,
            {}
        );
    }

    //获取绑定客户的地址
    async getCustomerAddress(customerId) {
        return get(
            `/admin-api/cms/qywx/customer-address?customerId=${customerId}`,
            {}
        );
    }

    //获取绑定客户的签约
    async getCustomerProject(customerId) {
        return get(
            `/admin-api/cms/qywx/customer-project?customerId=${customerId}`,
            {}
        );
    }

    //通过客户id获得店铺
    async getShopByCustomerId(customerId) {
        return get(`/admin-api/cms/qywx/shop-list?customerId=${customerId}`, {});
    }

    //获得店铺数据
    async getShopData(platformId, date) {
        return get(
            `/admin-api/cms/qywx/shop-data?platformId=${platformId}&date=${date}`,
            {}
        );
    }

    //解绑群
    async unbindChatGroup(customerId, chatGroupId) {
        return post(
            `/admin-api/cms/qywx/unbind-customer`,
            {
                customerId,
                chatGroupId
            }
        );
    }

    //查看客情记录
    async getSentiment(customerId) {
        return get(`/admin-api/cms/qywx/customer-log?customerId=${customerId}`, {});
    }

    //添加客情记录
    async addSentiment(customerId, content) {
        return post(
            `/admin-api/cms/qywx/add-customer-log`,
            {
                customerId,
                content
            }
        );
    }
}

export default new Store();
