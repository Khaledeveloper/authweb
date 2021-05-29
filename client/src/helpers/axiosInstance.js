import axios from "axios";


//https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/
//https://blog.liplex.de/improve-security-when-working-with-jwt-and-symfony/
export default (history, token, refreshToken, refreshTokenFunc) => {
  //const baseURL = process.env.REACT_APP_BACKEND_URL;

let userToken = token
/*  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }*/

  const axiosInstance = axios.create();
  
  // Add a request interceptor
axiosInstance.interceptors.request.use(
   config => {
       
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + userToken;
       }
       // config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       Promise.reject(error)
   });

  //Add a response interceptor

axiosInstance.interceptors.response.use((response) => {
    console.log("fromAxios instance");
   return response
}, function (error) {
   const originalRequest = error.config;

  /* if (error.response.status === 401 && originalRequest.url === 
'http://13.232.130.60:8081/v1/auth/token) {
       router.push('/login');
       return Promise.reject(error);
   }*/

   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
     
       return axios.post('/api/user/refresh-Token',
           {}, {
            headers : { Authorization: `Bearer ${refreshToken}`
             }})
           .then(res => {
               if (res.status === 201) {
                  // localStorageService.setToken(res.data);
                  userToken = res.data.token
                  refreshTokenFunc(res.data.token, res.data.refreshToken) 

                   axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
                   return axiosInstance(originalRequest);
               }
           }).catch((e)=> console.log(e.response))
   }
   return Promise.reject(error);
});

  return axiosInstance;
};