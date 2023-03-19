import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom';
import './view.css'
function View() {
  const move = useNavigate()
  const location = useLocation();
  const [email, setEmail] = useState('')
  const [friend, setFriend] = useState([])
  const [mutual, setMutual] = useState([])

  useEffect(() => {
  
    if (!location.state) {
      move('/')
    }
    else {
      const email = location.state.id
      const friend = location.state.friend
      setEmail(email)
      
      try {
        axios.post("http://localhost:8000/mutual", {
          email, friend
        })
          .then(response => {
            console.log(response.data.mutualFriends)
            setMutual(response.data.mutualFriends)
          })

      } catch (error) {
        console.log(error)

      }
      try{
        axios.post("http://localhost:8000/find", {
           friend
        })
        .then(response=>{
          console.log(response.data.user)
          setFriend(response.data.user)
        })
      }
      catch(e){
        console.log(e)
      }

    }

  }, [location.state])

  const SignIn=()=>{
    move('/')
}
const Home=()=>{
  move('/home' ,{state:{id:email }})
}
  return (
    <>
    <nav class="navbar bg-body-tertiary ">
        <div class="container d-flex ">
          <h2>Social.com</h2>
        </div>
        <div>
          <button class="btn btn-danger me-4" onClick={SignIn}>Logout</button>
        </div>
        <div>
          <button class="btn btn-primary me-4" onClick={Home}>Back</button>
        </div>
      </nav>
    {friend?
    <>
      <div>
        <img src={friend.cover?friend.cover:"https://source.unsplash.com/random/"} class="card-img-top" id="viewprofile" alt="..." />
      </div>
      <div class='circular'>
        <img src={friend.profile?friend.profile:"https://source.unsplash.com/random/id-1"} class="card-img-top" id="profile" alt="..." />
      </div>
      </>
      :<></>}
      
          <div class="container-fluid text-center mt-5">
        <div class="row align-items-start">
          <div class="col-lg-3 " id='left'>
         
            <h5>Know me</h5>
            <br/>
            <p>FirstName:{friend.FirstName}</p>
            <p>LastName:{friend.LastName}</p>
            <p>Description:{friend.description?friend.description:'No description'}</p>
         
          </div>

          <div class="col-lg-6 col-md-9 col-sm-9 col-xs-9 mt-3">
            
            <h3 class="mt-5">Posts</h3>
            <div class="card mb-3 h-50">
              <img src="https://source.unsplash.com/random/id-2" class="card-img-top" id='post' alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <h3>Mutal Firends</h3>
        {mutual.length > 0 ?(
        mutual.map(user=>(
          <div class="card  h-50 mt-4">
            <div class="card-body d-flex">
              <div class="circular-image2 mr-3">
                <img src="https://source.unsplash.com/random/" class='img2' alt="..." />
              </div>
              <p class="card-text m-2  ">{user.FirstName} {user.LastName}</p>
            </div>
          </div>
        )))
          : <><br /><p>No Mutual friends</p></>}
          
        </div>
        </div>
      

    </div>

    </>
  )
}

export default View