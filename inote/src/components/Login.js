import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Login = (props) => {
    let navigate = useNavigate()
   const [credentials, setcredentials] = useState({email: "", password: ""});
   const handlelogin = async ()=>{
       const reponse = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password})
       });
       const res_json = await reponse.json()
       if(res_json.success){
          localStorage.setItem("token", res_json.token)
          navigate("/")
       }else{
           alert("noooooo")
       }

   }
   const onChange = (e)=>{
       setcredentials({...credentials, [e.target.name]: e.target.value})
   }
    return (
        <div>
            <Navbar/>
            <div className='container mt-5 pt-5'>
               <div className='card p-3 col-lg-5 col-md-8 col-12 m-auto'>
                   <h5 className='my-4 mx-2'>Welcome to iNoteBook</h5>
                   <input type="text" className="form-control" placeholder='Email*' name='email' onChange={onChange}/>
                   <input type="password" className="form-control my-2" placeholder='Password*' name='password' onChange={onChange}/>
                   <button className='btn btn-danger mb-2' onClick={handlelogin}>Login</button>
                   <p className='my-2'>Don't Have an Account?<Link to="/signup">Sign Up</Link></p>
               </div>
            </div>
        </div>
    )
}
