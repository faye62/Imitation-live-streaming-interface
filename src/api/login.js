import {get, post} from '../config/axios';

class Login {
    // 发送验证码
    async sendCode(phone) {
        return post('/smst/user/send-code', {phone});
    }

    // 验证码登录
    async codeLogin(phone, code) {
        return post('/smst/user/login', {phone, code});
    }

    // 获取我的店铺
    async getMyShop() {
        return get('/smst/user/store-list');
    }
}

export default new Login();
