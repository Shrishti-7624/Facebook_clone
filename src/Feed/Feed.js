import React, { useEffect, useState } from "react";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import "../FeedPost/FeedPost.css";
// import Json from "../cards.json";
import { Avatar } from "@material-ui/core";
import Comment from "../Comment/Comment";

function Feed() {
  const [allpost, setAllpost] = useState(
    JSON.parse(localStorage.getItem("allpost")) || []
  );
  const [userInputVal, setUserInputVal] = useState({ postText: "" ,postImage:null });
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
  const [comment, setComment] = useState();
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const prevData = JSON.parse(localStorage.getItem("allpost"));
  //   const newpostdata = {
  //     ...userInputVal,
  //     profileName: currentUser.firstName,
  //     id: Date.now(),
  //     like: [],
  //     comments: [],
  //   };
  //   localStorage.setItem("allpost", JSON.stringify([newpostdata, ...prevData]));

  //   setAllpost([newpostdata, ...allpost]);
  //   setUserInputVal({ postText: "" });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const reader = new FileReader();
    reader.readAsDataURL(userInputVal.postImage);
    reader.onload = () => {
      const prevData = JSON.parse(localStorage.getItem("allpost"));
      const newpostdata = {
        ...userInputVal,
        profileName: currentUser.firstName,
        id: Date.now(),
        like: [],
        comments: [],
        postImage: reader.result,
      };
      localStorage.setItem("allpost", JSON.stringify([newpostdata, ...prevData]));
      setAllpost([newpostdata, ...allpost]);
      setUserInputVal({ postText: "", postImage: " " });
    };
  };
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser"))) {
      navigate("/login");
    }
  }, []);

  const handleDelete = (id) => {
    const newUpdatedpost = allpost.filter((post) => {
      return post.id !== id;
    });
    setAllpost(newUpdatedpost);
    localStorage.setItem("allpost", JSON.stringify(newUpdatedpost));
  };

  const handleLike = (id) => {
    const newUpdatedpost = allpost.map((post) => {
      if (post.id === id) {
        const currentUser = JSON.parse(
          localStorage.getItem("loggedUser")
        ).firstName;
        if (!post.like.includes(currentUser)) {
          post.like.push(currentUser);
        } else {
          post.like = post.like.filter((name) => {
            return name !== currentUser;
          });
        }

        return post;
      } else {
        return post;
      }
    });
    setAllpost(newUpdatedpost);
    localStorage.setItem("allpost", JSON.stringify(newUpdatedpost));
  };
  const handleComment = (index) => {
  
    if (comment === index) {
      setComment("");
    } else {
      setComment(index);
    }
  };

  const handleCommentDel = (index, id) => {
    const currentPost = allpost.map((post) => {
      if (post.id === id) {
        const updatedComments = post.comments.filter((comment, ind) => {
          return ind !== index;
        });
        post.comments = updatedComments;
        return post;
      } else {
        return post;
      }
    });

    setAllpost(currentPost);
    localStorage.setItem("allpost", JSON.stringify(currentPost));
  };

  return (
    <>
      <Header />
      <div className="feed">
        <StoryReel />
        <MessageSender
          handleSubmit={handleSubmit}
          userInputVal={userInputVal}
          setUserInputVal={setUserInputVal}
        />
        <div className="postContainer">
          {allpost.map((card) => {
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
                      )}{" "}
             
                  </div>
                </div>
                <div className="feed">
                  <p className="feedText">{card.postText}</p>
                  <div className="postImageContainer">
                    <img className="postImage" src={card.postImage} alt="" />
                  </div>
                </div>
                <div className="button">
                  <button className="like" onClick={() => handleLike(card.id)}>
                    {card.like.length}
                  </button>
                  <button
                    className="comment"
                    onClick={() => handleComment(card.id)}
                  >
                    Comment
                  </button>
                </div>
                {comment === card.id && (
                  <Comment
                    allpost={allpost}
                    setAllpost={setAllpost}
                    id={card.id}
                  />
                )}
                {comment === card.id &&
                  card.comments.map((item, index) => {
                    return (
                      <>
                        <div className="commentDelete">
                          <h4>{item.userName}</h4>
                          <p> {item.comment}</p>
                          {currentUser.firstName === item.userName && (
                            <button
                              className="deleteComment"
                              onClick={() => handleCommentDel(index, card.id)}
                            >
                              X
                            </button>
                          )}
                        </div>
                      </>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Feed;
