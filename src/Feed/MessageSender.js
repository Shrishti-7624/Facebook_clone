import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './MessageSender.css'


function MessageSender({handleSubmit,userInputVal,setUserInputVal}) {
 

  // const getData = (e) => {
  //   const { value, name } = e.target;
  //   setUserInputVal(() => {
  //     return {
  //       ...userInputVal,
  //       [name]: value,
  //     };
  //   });
  // }; 
  const getData = (e)=>{
    const { name, value, files } = e.target;
  if (name === "postImage") {
    setUserInputVal(() => {
      return {
        ...userInputVal,
        [name]: files[0],
      };
    });
  } else {
    setUserInputVal(() => {
      return {
        ...userInputVal,
        [name]: value,
      };
    });
  }
  }
 

  return (
    <div className='messageSender'>
      <div className='messageSender_top'>
        <Avatar />
       {JSON.parse(localStorage.getItem("loggedUser")) && <h4 className='fName'>{JSON.parse(localStorage.getItem("loggedUser")).firstName}</h4>}
        <form  onSubmit={handleSubmit}>
          <input type='text' name='postText' value={userInputVal.postText}  className='messageSender_input'
            placeholder={'Whats in your mind'} onChange={getData} required/>
            <label htmlFor='img'>Upload</label>
          {/* <input 
onChange={getData} name="postImage"
            placeholder='image Url (optional)' /> */}
            <input type='file' id='img' name='postImage' onChange={getData}/>
      
          <button className='submit-btn'  type='submit'>Post</button>
        </form>
      </div>
    </div>
  )
}

export default MessageSender