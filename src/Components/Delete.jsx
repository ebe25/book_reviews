import React from 'react';
import axios from "axios";
const Delete = (props) => {

    const deleteReview=async()=>{
        try{
            await axios.delete(`http://localhost:3000/reviews/${props.id}`);
            
            // eslint-disable-next-line array-callback-return
            //use the filter meth since it returns a new array that pass the test inside the filter method
            props.setReviews(props.reviews.filter((item)=>{
                return item.id!==props.id;
            }))
          
        }catch(err){
            console.log(err.message);
        }

    }

    
  return (
    <>
        <button className='del-btn' onClick={deleteReview}>Delete Review</button>
    </>
  )
}

export default Delete