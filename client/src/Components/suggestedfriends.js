import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Suggestedfriends(props) {
    const move=useNavigate()
    const [suggested, setSuggested] = useState([]);
    const [search, setSearch] = useState("")
    const [email, setEmail] = useState("")
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(props.email)
    useEffect(() => {
        async function Fetch(){ 
        if (props.email) {
            const email = props.email
            setEmail(props.email)
            try {
                await axios.post("http://localhost:8000/sfriends", {
                        email,
                    })
                    .then((response) => {
                        console.log(response.data.suggestedFriends);
                        setSuggested(response.data.suggestedFriends);
                        setLoading(false);
                        
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }
    Fetch();
    },[friends,props.email,props.change])


    const handleSearch = async (event) => {
        event.preventDefault();
        let value = document.getElementById('search').value
        setSearch(value);
        console.log(value)

        try {
            const response = await axios.post("http://localhost:8000/search", {
                search
            })
            console.log(response.data.user);
            setSuggested(response.data.user);
            
        }
        catch (e) {
            console.log(e)
        }
    }

    const makeFriend = async (userId) => {

        try {
            await axios.post("http://localhost:8000/addfriend", {
                id: userId,
                email
            })
                .then(response => {
                    console.log(response.data.friends);
                    setFriends(response.data.friends)
                    console.log(friends)
                    props.setChange(friends)
                });


        } catch (e) {
            console.log(e);
        }
    }
    const View=(userId)=>{
        move('/view',{state:{id:email,friend:userId }})
    }


    return (
        <>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <h3>Suggested Firends</h3>
                <br />
                <form class="d-flex" role="search" onSubmit={handleSearch}>
                    <input
                        class="form-control me-2"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        id="search"
                    />

                    <button class="btn btn-outline-success" type="submit" >Search</button>
                </form>
                {suggested && suggested.length > 0 ? (
                    suggested.map(users => (
                        <div class="card  h-50 m-3">
                            <div class="card-body d-flex">
                                <div class="circular-image2 mr-3">
                                    <img src={users.profile ? users.profile : "https://source.unsplash.com/random/"} class='img2' alt="..." />
                                </div>
                                <p class="card-text m-2  ">{users.FirstName}</p>
                                <button className="btn btn-primary " onClick={() => makeFriend(users._id)}>Friend</button>
                                <button className="btn btn-primary" onClick={() => View(users._id)}>View</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <br /><p>Not Found</p>
                    </>
                )}

            </div>
        </>
    )
}

export default Suggestedfriends