import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Friends = (props) => {
  const move=useNavigate()
  const [friends, setFriends] = useState([]);
  const [update, setUpdate] = useState([]);
  const [loading, setLoading] = useState(true);
  const email=props.email
  useEffect(() => {
    let email = props.email;
    console.log(props.email)
    async function Fetch(){ 
    try {
      await axios.post("http://localhost:8000/findfriends", {
        email,
      }).then((response) => {
        console.log(response.data.friends);
        setFriends(response.data.friends);
        
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  }
  Fetch();
}, [loading,update,props.change]);




  const unFriend=(userId)=>{

    try{
        axios.post("http://localhost:8000/removefriend",{
            email,userId
        })
        .then(response=>{
            setUpdate(response.data.user.friends)
            props.setChange(update)
        })
    }

    catch(e){
        console.log(e)
    }
  }
  const View=(userId)=>{
      move('/view',{state:{id:email,friend:userId }})
  }

  

  return (
    <>
      <h3 class="m-3">Firends</h3>
      {loading? (
        <div>Loading...</div>
      ) : friends && friends.length > 0 ? (
        friends.map((users) => (
         <>


         <div class="card  h-50 m-3">
            <div class="card-body d-flex">
              <div class="circular-image2 mr-3">
                <img
                  src={users.profile ? users.profile : "https://source.unsplash.com/random/"}
                  class="img2"
                  alt="..."
                />
              </div>
              <p class="card-text m-2  ">{users.FirstName}</p>
              <button className="btn btn-primary" onClick={() => unFriend(users._id)}>Unfriend</button>
              <button className="btn btn-primary" onClick={() => View(users._id)}>View</button>
            </div>
          </div>
          </>
        ))
      ) : (
        <>
          <br />
          <p>Not Found</p>
        </>
      )}
    </>
  );
};

export default Friends;
