// React imports
import axios from "axios"





export default function LoginTestToken() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        
        debugger


        event.preventDefault();
        // console.log(event.target.email.value);

        // const res = axios.create({
        //     baseURL: "https://localhost:44338",
        //     // method: "POST",
        //     // data: { email: event.target.email.value, password: event.target.password.value},
        //     withCredentials: true,
        // });
        
        // res.post("/Users/Login", { email: event.target.email.value, password: event.target.password.value })
        // .then(response => {
        //     console.log(response);
        //     return response;
        // })
        //     .catch(error => console.error("Login failed", error));

        // console.log(res);
        

        axios.post("https://localhost:44338/Users/Login", { email: event.target.email.value, password: event.target.password.value }, { withCredentials: true })
            // .then(response => localStorage.setItem("token", response.data.token))
            .then(response => response)
            .catch(error => console.error("Login failed", error))
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='flex flex-col'>
                <label>Email:</label>
                <input name="email" />
            </div>

            <div className='flex flex-col'>
                <label>Password:</label>
                <input name="password" />
            </div>

            <input type="submit" value="Submit" />
        </form>
    )
}
