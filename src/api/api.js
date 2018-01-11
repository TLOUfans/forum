
import axios from 'axios';

const base = '';

// 注册
export const register = async (params) => {
  return await axios.post(`${base}/user/register`, params);
}

// 查询
export const queryUser = async (params) => {
  return await axios.post(`${base}/user/query`, params);
}

// 删除
export const removeUser = async (params) => {
  return await axios.post(`${base}/user/remove`, params);
}

// 修改
export const updateUser = async (params) => {
  return await axios.post(`${base}/user/update`, params);
}

// 读文件
export const readFile = async (params) => {
  return await axios.post(`${base}/user/readFile`, params);
}