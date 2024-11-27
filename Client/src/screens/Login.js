import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(" https://food-delivery-application-api-lac.vercel.app/api/loginuser", JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.data
            console.log(json)
            if (json.success) {
                localStorage.setItem("userEmail", credentials.email)
                localStorage.setItem("authToken", json.authToken)
                console.log(localStorage.getItem("authToken"))
                navigate("/")
            }
            console.log("user login successfully", response.data)
        } catch (error) {
            console.error("Error login user:", error.response ? error.response.data : error.message);
        }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>don't have account </Link>
                </form>
            </div>
        </>
    )
}
