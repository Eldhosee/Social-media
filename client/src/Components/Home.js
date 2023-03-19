import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Profilecard from './profilecard';
import Suggestedfriends from './suggestedfriends';
import Friends from './friends';

const Home = () => {
  const move = useNavigate()
  const [email, setEmail] = useState('')
  const [change,setChange]=useState([])
  const [change2,setChange2]=useState([])
  const location = useLocation()
  useEffect(() => {
    if (!location.state) {
      move('/')
    }
    else {
      setEmail(location.state.id)
      console.log(email)
    }

  }, [email])

  console.log(email)


  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("myForm").style.display = "none"

    const First = document.getElementById('First').value
    const Last = document.getElementById('Last').value
    const description = document.getElementById('des').value
    const profile = document.getElementById('Profile').files[0]
    const cover = document.getElementById('cover').files[0]
    document.getElementById('FirstName').innerText = First
    document.getElementById('description').innerText = description

    const image1 = [profile, cover];
    const urls = [];

    for (let i = 0; i < image1.length; i++) {
      const imageRef = ref(storage, `image${i}`);
      uploadBytes(imageRef, image1[i])
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              console.log(url);
              urls.push(url);
              if (urls.length === image1.length) {
                const profileimage = urls[0] // contains an array of URLs in the order they were uploaded
                const coverimage = urls[1]
                document.getElementById("myprofile").src = urls[0]
                document.getElementById("mycover").src = urls[1]
                try {
                  axios.post("http://localhost:8000/edit", {
                    First, Last, description, profileimage, coverimage, email
                  })
                    .then(response => {
                      console.log(response.data.user)

                    })
                } catch (error) {
                  console.log(error)
                }
              }
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }


  };
  const SignIn = () => {
    move('/')
  }

  return (
    <div className='Home'>
      <nav class="navbar bg-body-tertiary">
        <div class="container d-flex ">
          <h2>Social.com</h2>
        </div>
        <div>
          <button class="btn btn-danger me-4" onClick={SignIn}>Logout</button>
        </div>
      </nav>

      <div class="container-fluid text-center mt-3">
        <div class="row align-items-start">
          <div class="col-lg-3 ">
            <Profilecard email={email} />

            <Friends email={email} change={change} setChange={setChange} />
          </div>

          <div class="col-lg-6 col-md-9 col-sm-9 col-xs-9">
            <div id="myForm" class="card ">
              <div id="form" >
                <form onSubmit={handleSubmit}>
                  <h5>Profile Edit</h5>
                  <hr />
                  <div class="mb-3">
                    <label htmlFor="First" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="First" name="firstName" required />
                  </div>

                  <div class="mb-3">
                    <label htmlFor="Last" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="Last" name="lastName" required />
                  </div>
                  <div class="mb-3">
                    <label htmlFor="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="des" name="description" required />
                  </div>
                  <div class="mb-3">
                    <label htmlFor="cover" class="form-label">Cover image</label>
                    <input type="file" accept="image/*" class="form-control" id="cover" name="cover" required />
                  </div>
                  <div class="mb-3">
                    <label htmlFor="Profile" class="form-label">Profile image</label>
                    <input type="file" accept="image/*" class="form-control" id="Profile" name="Profile" required />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
            <h3>Posts</h3>
            <div class="card mb-3 h-50">
              <img src="https://source.unsplash.com/random/" class="card-img-top" id='post' alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          <Suggestedfriends email={email} setChange={setChange} change={change} />


        </div>
      </div>

    </div>
  )
}



export default Home