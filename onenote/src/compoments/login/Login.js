import React, { useState } from 'react'
import './login.css';
export default function Login(props) {
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const handelSubmit = async(e) =>{
        e.preventDefault()
        let response = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        localStorage.setItem("data.user._id",data.user._id)
        props.setroute("home")
        props.setLoginState(true)
    }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e)=>{handelSubmit(e)}}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <br />
        <button className="login-button" onClick={()=>{props.setroute("signin")}}>
          SignUp
        </button>
      </form>
    </div>
  )
}
