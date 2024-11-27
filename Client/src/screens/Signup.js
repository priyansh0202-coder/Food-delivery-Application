import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Signup() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(" https://food-delivery-application-api-lac.vercel.app/api/createuser", JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert("register user success")
            navigate("/login")
            console.log("user created successfully", response.data)
        } catch (error) {
            console.error("Error creating user:", error.response ? error.response.data : error.message);
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
                        <label htmlFor="name" className="form-label">name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name='location' value={credentials.location} onChange={handleChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user </Link>
                </form>
            </div>
        </>
    )
}
