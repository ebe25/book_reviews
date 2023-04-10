/* eslint-disable react/jsx-no-undef */
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Add from './Components/Add.jsx';
import Edit from './Components/Edit.jsx';
import Delete from './Components/Delete.jsx';



function App() {
      const [reviews, setReviews] = useState([]);
      const getReviews=async ()=>{
        try{
         const response=await axios.get("http://localhost:3000/reviews");
         setReviews(response.data);
      }catch(err){
          console.log(err);
      }
  }
  useEffect(() => {
   getReviews();
    
  }, [reviews])
  return (
      <>
        <Add reviews={reviews} setReviews={setReviews}/>
     <div className="reviews" >
       {
        reviews.map((item)=>{
         return(
           <div className="review" key={item.id}>
             <h3>Title: {item.book_title}</h3>
             <h3>Review: {item.book_review}</h3>
             <h3>Rating: {item.book_rating}</h3>
             <Edit id={item.id} reviews={reviews} setReviews={setReviews}/>
             <Delete id={item.id} reviews={reviews} setReviews={setReviews} />
           </div>
         );
        })
  
  
       }
       </div>
     
     
      </>
    );

    
  
}

export default App;
