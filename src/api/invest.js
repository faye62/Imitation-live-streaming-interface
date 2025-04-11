import {get, post} from '../config/axios';

class Invest {
  static getOverview() {
    const res = get('/smst/invest/overview');
    return res;
  }

  static getSimulateData(stockPercent) {
    const res = get('/smst/invest/simulate?stockPercent=' + stockPercent);
    return res;
  }

  static getRank() {
    const res = get('/smst/invest/rank');
    return res;
  }

  static getStockMotivateList({pageNo, storeId, status, startDate, endDate}) {
    const res = get('/smst/stock-motivate/page', {pageNo, storeId, status, startDate, endDate});
    return res;
  }

  static confirmCreateStockMotivate(data) {
    const res = post('/smst/stock-motivate/confirm-create', data);
    return res;
  }

  static confirmEvaluateStockMotivate(data) {
    const res = post('/smst/stock-motivate/confirm-evaluate', data);
    return res;
  }
}

export default Invest;
