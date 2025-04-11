import {get, post, put} from '../config/axios';

class Inventory {
  //获取店铺的库存盘点数据
  static getInventory(data) {
    return get('/smst/inventory/page', data);
  }

  static getAllInventory({storeId, date}) {
    return get('/smst/inventory/getAll', {
      storeId,
      date,
    });
  }

  static createInventory(data) {
    return post('/smst/inventory/create', data);
  }

  static editInventory(data) {
    return put('/smst/inventory/update', data);
  }

  static getTotalInventory({storeId, date}) {
    return get('/smst/inventory/total-inventory', {storeId, date});
  }

  static getTheoryInventory({storeId, date}) {
    return get('/smst/inventory/theory-consume', {storeId, date});
  }

  static getUncheckedInventoryStore(date) {
    return get(`/smst/inventory/unchecked-store?startDate=${date}&endDate=${date}`);
  }
}

export default Inventory;
