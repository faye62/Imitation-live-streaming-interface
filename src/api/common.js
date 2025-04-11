import {get, post} from '../config/axios';

class Common {
  static uploadFile(base64, format) {
    const res = post('/smst/common/upload-file', {
      base64,
      format,
    });
    return res;
  }
}

export default Common;
