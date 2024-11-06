import axios from 'axios';





export const getRandomIntInclusive = (min : number, max : number) => {

    const minCeiled     =   Math.ceil(min);
    const maxFloored    =   Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    
}





export const setupAxiosInterceptors = () => {

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
            debugger

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
}





export function GetCookies(cookieName : string) {

    let wantedCookie: string = "";
    const cookies = document.cookie.split(";");

    cookies.map(cookie => {
        cookie = cookie.trim();
        if (cookie.startsWith(`${cookieName}=`)) {
            const cookieValue = cookie.split("=")[1];
            wantedCookie = cookieValue;
        }
    });


    return wantedCookie;
}
