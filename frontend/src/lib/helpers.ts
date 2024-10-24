import axios from 'axios';
import { useAuthToken } from './hooks';





export const getRandomIntInclusive = (min : number, max : number) => {

    const minCeiled     =   Math.ceil(min);
    const maxFloored    =   Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    
}





export const setupAxiosInterceptors = (refreshToken: () => Promise<any>) => {

    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );


    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            debugger

            // Если сервер вернул 401 и это не повторный запрос
            if (error.response.status === 401 && !originalRequest._retry) {
                console.log(originalRequest);
                originalRequest._retry  =   true; // Помечаем запрос как повторный

                try {
                    // Вызываем функцию для обновления токена
                    const newToken      =   await refreshToken();

                    // Обновляем заголовок Authorization новым токеном
                    axios.defaults.headers.common['Authorization']  =   `Bearer ${newToken}`;
                    originalRequest.headers['Authorization']        =   `Bearer ${newToken}`;

                    // Повторяем исходный запрос с новым токеном
                    return axios(originalRequest);
                } catch (refreshError) {
                    // Логика при неудачном обновлении токена, например, выход из системы
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};