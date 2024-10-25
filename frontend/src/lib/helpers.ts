import axios from 'axios';
import { useAuthToken } from './hooks';





export const getRandomIntInclusive = (min : number, max : number) => {

    const minCeiled     =   Math.ceil(min);
    const maxFloored    =   Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    
}





export const setupAxiosInterceptors = (refreshToken: () => Promise<any>) => {

    // axios.interceptors.request.use(
    //     config => {
    //         const token = localStorage.getItem('token');

    //         if (token) {
    //             config.headers.Authorization = `Bearer ${token}`;
    //         }

    //         return config;
    //     },
    //     error => {
    //         return Promise.reject(error);
    //     }
    // );


    axios.interceptors.response.use(
        response => {
            debugger
            console.log(response);

            // if (response.data.newJwtToken) {
            //     localStorage.setItem('token', response.data.newJwtToken); // Обновляем JWT в хранилище
            // }
            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl; // Перенаправление по URL
            }
            return response;
        },
        async error => {
            // const originalRequest = error.config;

            debugger

            // Если сервер вернул 401 и это не повторный запрос
            // if (error.response.status === 401 && !originalRequest._retry) {
            // if (error.response.status === 401) {
            //     console.log(originalRequest);
            //     console.log(error.response);
            //     // originalRequest._retry  =   true; // Помечаем запрос как повторный

            //     try {
            //         // Вызываем функцию для обновления токена
            //         const newToken      =   await refreshToken();

            //         // Обновляем заголовок Authorization новым токеном
            //         axios.defaults.headers.common['Authorization']  =   `${newToken}`;
            //         originalRequest.headers['Authorization']        =   `Bearer ${newToken}`;

            //         // Повторяем исходный запрос с новым токеном
            //         return axios(originalRequest);
            //     } catch (refreshError) {
            //         // Логика при неудачном обновлении токена, например, выход из системы
            //         return Promise.reject(refreshError);
            //     }
            // }

            // return Promise.reject(error);


            if (error.response.status === 401) {
                // Токен истек, но refreshToken автоматически отправляется с запросом
                // Возможно, тут стоит реализовать логику обновления токена, если сервер это не сделает сам
                // В данном случае сервер сам обновит JWT токен, так что нам не нужно ничего делать
                // localStorage.setItem("token", error.response.data.newJwtToken);
                return Promise.reject(error);
            }
            else if (error.response.status === 403) {
                window.location.href = "/tokenTest";
            }

            return Promise.reject(error);
        }
    );
};