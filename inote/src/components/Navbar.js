import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
    const handlelogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><b><b className='text-danger'><i>i</i></b>Note<b className='text-primary'><i>B</i></b>ook</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                {localStorage.getItem("token")&&<li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>} 
                </ul>
                </div>
                
                    {!localStorage.getItem("token")?<div className='ml-auto rounded bg-danger'><Link className='btn btn-outline-primary text-white' to='/login'>Login</Link>
                    <Link className='btn btn-danger' to="/signup">Sign Up</Link></div>:<div className='ml-auto rounded bg-danger'><button className='btn btn-danger' onClick={handlelogout}>Log out</button></div>} 
            </div>
            </nav>
        </div>
    )
}
