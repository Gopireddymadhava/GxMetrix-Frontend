import axios from 'axios';
import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);
export const ShopContextProvider = (props) => {


    const [userId, setUserId] = useState();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const userDetails = {
        username: username,
        password: password,
      }
      const login = async (event) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (!passwordRegex.test(password)) {
          toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      }
        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                username: username,
                password: password,
            });
            console.log(response.data);

            if (response.data.message === "Username not exists") {
                toast.error("Username does not exist");
            }
            else if (response.data.message === "password Not Match") {
              toast.error("Enter a valid password");
            } else if (response.data.message === "Login Success") {
                setUserId(response.data.userId);
                console.log(response.data);
                window.localStorage.setItem('userId', response.data.userId);
                window.localStorage.setItem('user_data', JSON.stringify(userDetails));
                window.localStorage.setItem('username', userDetails.username);
                toast.success("Logged in successfully");

                // Fetch user data after login
                const userDataResponse = await axios.get(`http://localhost:8080/user/${userDetails.username}`);
                const userData = userDataResponse.data;

                // Send email
                await axios.post(`http://localhost:8080/user/send-email/${userData}`);

                window.location.href = '/home';
            } else {
                toast.error("Please enter valid Username and Password");
            }
        } catch (error) {
            console.error(error);
            toast.error("Login Failed")
        }
    }
    const contextValue={login,username,setPassword,setUserId,setUsername,password,userDetails,userId}
  return (
    <ShopContext.Provider value={contextValue} >
    {props.children}
  </ShopContext.Provider>
  )
}
