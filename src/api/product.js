// 查询表格列表的接口
import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
};
