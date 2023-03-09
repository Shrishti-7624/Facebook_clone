// import React,{useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Profile.css'

// function Profile({  }) {
//     const navigate = useNavigate()
//     const dataLocal = JSON.parse(localStorage.getItem("loggedUser"))
//     useEffect(() => {
//         if (!JSON.parse(localStorage.getItem("loggedUser"))) {
//           navigate('/login')
//         }
//       }, [])
//     return (
//         <div className="userprofileCard">
//             <img src="https://tse4.mm.bing.net/th/id/OIP.SrAO_FhAeAWE95TAnRAyiQHaEc?pid=ImgDet&rs=1" alt="" />
//             {dataLocal &&  <h2><strong>Name:</strong> { dataLocal.firstName} { dataLocal.lastName}</h2>}
//             {dataLocal&&  <p><strong>Email:</strong> { dataLocal.email} </p>}
//             {dataLocal &&  <p><strong>Gender:</strong> { dataLocal.gender} </p>}

//         </div>
//     )
// }

// export default Profile

import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";


function Profile() {
  const navigate = useNavigate();
  const [currentUserPost, setCurrentUserPost] = useState([]);

  const allpost = JSON.parse(localStorage.getItem("allpost"));
  const currentUser = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser"))) {
      navigate("/login");
    }

    const posts = allpost.filter((post) => {
      return post.profileName === currentUser.firstName;
    });
    setCurrentUserPost(posts);
  }, []);
  const handleDelete = (id) => {
    const allpost = JSON.parse(localStorage.getItem("allpost"));
    const updatedPost = allpost.filter((post) => {
      return post.id !== id;
    });
    const newUpdatedpost = currentUserPost.filter((post) => {
      return post.id !== id;
    });
    setCurrentUserPost(newUpdatedpost);
    localStorage.setItem("allpost", JSON.stringify(updatedPost));
  };
  return (
    <>
      <div className="userprofileCard">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.SrAO_FhAeAWE95TAnRAyiQHaEc?pid=ImgDet&rs=1"
          alt=""
        />
        {currentUser && (
          <h2>
            <strong>Name:</strong> {currentUser.firstName}{" "}
            {currentUser.lastName}
          </h2>
        )}
        {currentUser && (
          <p>
            <strong>Email:</strong> {currentUser.email}{" "}
          </p>
        )}
        {currentUser && (
          <p>
            <strong>Gender:</strong> {currentUser.gender}{" "}
          </p>
        )}
      </div>
      <div className="postContainer">
        {currentUserPost.map((card) => {
          return (
            <div className="profileContainer" key={card.id}>
              <div className="profile">
                <div className="profileCont">
                  {card.profileImage ? (
                    <img
                      className="profileImage"
                      src={card.profileImage}
                      alt=""
                    />
                  ) : (
                    <Avatar />
                  )}

                  <h3 className="profileName">{card.profileName}</h3>
                </div>
                <div className="buttons-right">
                  {JSON.parse(localStorage.getItem("loggedUser")) &&
                    card.profileName === currentUser.firstName && (
                      <button
                        className="delete"
                        onClick={() => handleDelete(card.id)}
                      >
                        Delete Post
                      </button>
                    )}
                </div>
              </div>
              <div className="feed">
                <p className="feedText">{card.postText}</p>
                <div className="postImageContainer">
                  <img className="postImage" src={card.postImage} alt="" />
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Profile;
