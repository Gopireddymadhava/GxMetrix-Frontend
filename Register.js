import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
export const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const save = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password) {
      toast.error("Fill all the fields");
    }
    else if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
    }
    else if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");


    } else {
      try {
        await axios.post("http://localhost:8080/user/signup", {
          username: name,
          email: email,
          password: password,
        });
        toast.success("Registration done Successfully");
        setname("");
        setEmail("");
        setPassword("");
        navigate("/")
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error("User already exists");
        }
      }
    }
  }
  return (
    <div >
      <div className="container mt-4" >
        <div className="card" style={{ backgroundColor: "lightorange", backgroundImage: "url('https://wallpapercave.com/wp/wp9549965.jpg')" }}>
          <h1 style={{ marginTop: "15px", color: "whitesmoke" }}>Registration</h1>
          <hr />
          <form>
            <div className="form-group" >
              <label style={{ color: "cyan" }}> <h5>UserName</h5></label>
              <Input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Username"
                value={name}
                onChange={(event) => setname(event.target.value)}
                style={{ width: "500px", height: "45px", borderRadius: "7px", textAlign: "center", marginLeft: "310px" }}
              />
            </div>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label style={{ color: "cyan" }}><h5>Email</h5></label>
              <Input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ width: "500px", height: "45px", borderRadius: "7px", textAlign: "center", marginLeft: "310px" }}
              />
            </div>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label style={{ color: "cyan" }}><h5>Password</h5></label>
              <Input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ width: "500px", height: "45px", borderRadius: "7px", textAlign: "center", marginLeft: "310px" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success outline mt-4"
              onClick={save}
              style={{ marginBottom: "5px", backgroundColor: "", color: "white" }}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
