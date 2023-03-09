import React, { useState } from 'react'
import { Avatar } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
import './Comment.css'

function Comment({ allpost, setAllpost, id }) {
    const currentLogedUser = JSON.parse(localStorage.getItem("loggedUser"))

    const [userInputVal, setUserInputVal] = useState({


    });

    const getData = (e) => {
        const { value, name } = e.target;
        setUserInputVal(() => {
            return {
                ...userInputVal,
                [name]: value,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const newPost = { ...userInputVal, userName: JSON.parse(localStorage.getItem('loggedUser')).firstName }
        const updatedpost = allpost.map(post => {

            if (post.id === id) {
                post.comments = [...post.comments, newPost]
                return post
            } else {
                return post
            }
        })
        setAllpost(updatedpost)
        localStorage.setItem('allpost', JSON.stringify(updatedpost))
       
    }
    return (
        <>
            <div className="commentContainer" >
                <div className="avtar">
                    <Avatar />
                    <h4 className='fName'>{currentLogedUser.firstName}</h4>
                </div>
                <form className='commentForm'  onSubmit={handleSubmit}>
                    <input className='commentInput' type="text" name="comment" onChange={getData} id="" placeholder='Comment' />
                    <button className='commentButton' type="submit"><ArrowRight fontSize="large" /></button>
                </form>
            </div>
        </>
    )
}

export default Comment