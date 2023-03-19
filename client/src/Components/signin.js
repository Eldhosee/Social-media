
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import img1 from './assets/signin.png'
import "./signin.css"
const SignIn = () => {
    const move=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    async function submit(e)
    {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(response=>{
                if(response.data=='found'){
                    move('/home',{state:{id:email }})
                }
                else if(response.data=="notfound")
                {
                    alert("User not signup")
                }
            })
        } 
        
        catch (e) {

            console.log(e)
            
        }
    }

    return (
        <div className='container1'>


<div class="container text-center">
  <div class="row align-items-center">
    <div class="col" id='col1'>
    <img src={img1} class="card-img-top" id='post' alt="..." />
    </div>
    <div class="col" id='col2'>
    <h4>SignIn</h4>

    <form action='POST'>
   
                <input type="text" placeholder='Username' class="form-control " onChange={(e)=>setEmail(e.target.value)} />
                <br/>
                <input type="password" placeholder="Password" class="form-control" onChange={(e)=>setPassword(e.target.value)}  />
                <br/>
                <input type='submit' class="btn btn-success" value="SignIn" onClick={submit} />
             
    </form> 
            <br/>
            <p>OR</p>
            <Link to='/signup'>SignUp</Link>
    </div>
    
  </div>
</div>
        
</div>
    )
}
export default SignIn