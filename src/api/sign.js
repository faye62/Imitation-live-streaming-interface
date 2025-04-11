import {get, post} from '../config/axios';

class Sign {
  // 签到
  static async createSign(storeId) {
    return post('/smst/clerk-sign/sign', {storeId});
  }
  static async getSignStore(longitude, latitude) {
    const res = get('/smst/clerk-sign/store', {longitude, latitude});
    return res;
  }
  static async getSignList({storeId, pageNo, startDate, endDate}) {
    return get('/smst/clerk-sign/page', {storeId, pageNo, startDate, endDate});
  }
}

export default Sign;
