// React imports
import axios from "axios"





export default function LoginTestToken() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log(event.target.email.value);

        axios.post("https://localhost:44338/Users/Login", { email: event.target.email.value, password: event.target.password.value})
            .then(response => localStorage.setItem("token", response.data.token))
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
