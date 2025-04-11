import {get, post} from '../config/axios';

class Product {
  static getBasicProductList() {
    const res = get('/smst/basic-product/simple-list');
    return res;
  }
}

export default Product;
