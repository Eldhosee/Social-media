import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import img2 from './assets/signup.jpeg'
import './signin.css'
import axios from 'axios';
const SignUp = () => {
    const [FirstName,setFirstName]=useState("")
    const [LastName,setLastName]=useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const move=useNavigate()
    async function submit(e)
    {
        
        e.preventDefault();
        if(FirstName==''||LastName==''||email==''||password==''||confirm==''){
            alert("please fill all field")
        }
        else if(password===confirm){
        try {
            await axios.post("http://localhost:8000/signup",{
                FirstName,LastName,email,password,confirm
            })
            .then(response=>{
                
                if(response.data=='exists'){
                    alert("User already exists")
                }
                else if(response.data.message=="created")
                {
                    move('/')
                }
            })
        } 
        
        catch (e) {

            console.log(e)
            
        }
    }
    else{
        alert("password and confirm password should be same")
    }
    }

    return (
<div className='container1'>


<div class="container text-center">
  <div class="row align-items-center">
    <div class="col" id='col1'>
    <img src={img2} class="card-img-top" id='post' alt="..." />
    </div>
    <div class="col" id='col2'>
    <h4>SignUp</h4>
    <form method='POST'>
    <input type="text" placeholder='FirstName' class="form-control"onChange={(e) => setFirstName(e.target.value)} required  />
    <br/>
                <input type="text"  class="form-control" placeholder='LastName' onChange={(e) => setLastName(e.target.value)} />
                <br/>
                <input type="email" class="form-control" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <input type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <input type="password" class="form-control" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
                <br/>
                <input type='submit' class="btn btn-success" value="Submit"  onClick={submit}/>
                <br/>
                </form>
            <br/>
            <p>OR</p>
            <Link to='/'>SignIn</Link>
    </div>
    
  </div>
</div>
        
</div>
    )
}

export default SignUp