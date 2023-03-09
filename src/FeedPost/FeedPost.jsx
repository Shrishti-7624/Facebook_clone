// import React from 'react'
// import Json from "../cards.json"
// import './FeedPost.css'


// function Feedpost() {
//     return (
//         <>
//             <section>
//                 <div className="postContainer">
//                     {Json.feedPost.map((card) => {
//                         return (
//                             <div className="profileContainer" key={card.id}>
//                                 <div className="profile">
//                                     <div className='profileCont'>
//                                         <img className='profileImage' src={card.profileImage} alt="" />
//                                         <h3 className='profileName'>{card.profileName}</h3>
//                                     </div>
//                                     <div className="buttons-right">
//                                         <button className='edit' disabled
//                                         //  onClick={()=>{
//                                         // alert("not disabled")}}
//                                         >Edit Post</button>
//                                         <button className='delete' disabled>Delete Post</button>
//                                     </div>
//                                 </div>
//                                 <div className="feed">
//                                     <p className='feedText'>{card.postText}</p>
//                                     <div className="postImageContainer">
//                                         <img className='postImage' src={card.postImage} alt="" /></div>
                                    
//                                 </div>
//                                 <div className="button">
//                                 <button className='like'>{card.like}</button>
//                                     <button className='comment' >Comment</button>

//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Feedpost