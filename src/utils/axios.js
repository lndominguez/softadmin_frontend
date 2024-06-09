import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------
export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};


export const fetcherGET = (url) => axiosInstance.get(url).then((res) => res.data);
export const fetcherPOST = (url) => axiosInstance.post(url).then((res) => res.data);
// export const fetcherPATCH = (url) => {
//   console.log(url.data);
//   axiosInstance.patch(url.url, url.data).then((res) => res.data);
// };
export const fetcherDELETE = (url) => axiosInstance.delete(url).then((res) => res.data);



export async function uploadImage(file) {
  const fromData = new FormData();
  fromData.append('file', file);
  const URL = endpoints.upload_image;
  return await axiosInstance.post(URL, fromData);
}

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  upload_image: '/api/upload/image',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  user: {
    list: '/api/user/list',
    details: '/api/user/details',
    search: '/api/user/search',
    new: '/api/user/new',
    update: '/api/user/update',
    delete: '/api/user/delete',
  },
  provider: {
    list: '/api/provider/list',
    details: '/api/provider/details',
    search: '/api/provider/search',
    new: '/api/provider/new',
  },
  airline: {
    list: '/api/airline/list',
    details: '/api/airline/details',
    search: '/api/airline/search',
    new: '/api/airline/new',
  },
};
