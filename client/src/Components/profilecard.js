import React, { useState,useEffect } from 'react';
import axios from 'axios';
function Profilecard(props) {
    const [user,setUser]=useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       async function Fetch(){ 
        const email=props.email
        console.log(email)

        try {

            await axios.post("http://localhost:8000/find",{
             email
           })
           .then(response=>{
             console.log(response.data)
             setUser(response.data.user)
             setLoading(false)
           })
       }
       catch(e){
         console.log(e)
       }
      }
      Fetch();
   
      
    }, [loading])
    
  return (
    
    <div class="card w-100">
        {user &&
        <>
    <img src={user.profile?user.profile:"https://source.unsplash.com/random/"} class="card-img-top" id="myprofile" alt="..." />
    <div class="circular-image">
      <img src={user.cover?user.cover:"https://source.unsplash.com/random/"} class='img' id="mycover" alt="..." />
    </div>
    <div class="card-body">
      <h5 class="card-title" id="FirstName">{user.FirstName?user.FirstName:"FirstName"}</h5>
      <hr />
      <p class="card-text" id="description">{user.description?user.description:"description"}</p>
      <hr />
      <button type="button" class="btn btn-primary" onClick={() => document.getElementById("myForm").style.display = "block"}><p>Edit my Profile</p></button>
    </div>
    </>
}
  </div>
  )
}

export default Profilecard


