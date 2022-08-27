import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Signup = () => {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    const handlesignup = async ()=>{
        if(credentials.password === credentials.cpassword){
            const reponse = await fetch("http://localhost:4000/api/auth/", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
            });
            const res_json = await reponse.json()
            if(res_json.success){
               localStorage.setItem("token", res_json.token)
               navigate("/")
            }else if(res_json.error){
                 alert(res_json.error)
            }
        }else{
            alert("password does not match")
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
               <h4 className='my-3 mx-1'>Welcome to iNoteBook</h4>
               <input type="text" className="form-control my-2" name='name' placeholder='Name*' onChange={onChange}/>
               <input type="email" className="form-control my-2" name='email' placeholder='Email*' onChange={onChange}/>
               <input type="password" className="form-control my-2" name='password' placeholder='Password*' onChange={onChange}/>
               <input type="password" className="form-control my-2" name='cpassword' placeholder='Confirm Password*' onChange={onChange}/>
               <button className='btn btn-danger my-3' onClick={handlesignup}>Sign Up</button>
           </div>
        </div>
    </div>
    )
}
