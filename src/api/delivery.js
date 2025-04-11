import {get, post, _delete, put} from '../config/axios';

class Delivery {
  static centerCreate(data) {
    const res = post('/smst/delivery-order/center/launch', data);
    return res;
  }

  static storeLaunch(data) {
    const res = post('/smst/delivery-order/store/launch', data);
    return res;
  }

  static updateOrder(data) {
    const res = put('/smst/delivery-order/center/update', data);
    return res;
  }


  static confirmSign(data) {
    const res = post('/smst/delivery-order/store/confirm-sign', data);
    return res;
  }

  static deleteOrder(id) {
    const res = _delete('/smst/delivery-order/delete?id=' + id);
    return res;
  }

  static getDetailById(id) {
    const res = get('/smst/delivery-order/get?id=' + id);
    return res;
  }

  static pageList({pageNo, status, storeId, startDate, endDate}) {
    const res = get('/smst/delivery-order/page', {
      pageNo,
      status,
      storeId,
      startDate,
      endDate
    });
    return res;
  }
}

export default Delivery;
