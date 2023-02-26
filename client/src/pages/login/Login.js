import React, { useState } from "react";
import { Link } from "react-router-dom";
import './login.scss'
import { axiosclient } from "../../utils/axiosclient";
function Login(){     

    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

       
    async function handlesubmit(e){
        e.preventDefault()
        try{
            const result=  await axiosclient.post('/auth/login', {
                email,
                password
            })
            console.log(result)
        }
        catch(error){
             console.log(error)
        }
    } 



    return(
        <div className="login"> 
        <div className="login-box">
            <h2 className="heading">Login</h2>
        <form onSubmit={handlesubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" className="email" id="email" onChange={(e)=>setemail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" className="password" id="password" onChange={(e)=>setpassword(e.target.value)} />

        <input type="submit" className="submit" />
        </form  >
        <p className="subheading">Do not have an account? <Link to ="/signup">Sign up</Link> </p>
        </div>
        </div>
    )
}

export default Login