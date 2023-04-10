import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";
import "./Styles/Add.css";


const Add = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try{
    console.log(data);
    await addReview(data);
    }catch(err){
      console.log(err);
    }
    
  };

  const addReview = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/reviews", data);
      const newReview = response.data;
      props.setReviews([...props.reviews, newReview]);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
<>
  <div className="reviewform">
    <h1> Add a review</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
  <input type="text" placeholder="Book Title" name="book_title" {...register("book_title", { required: true, maxLength: 100 })} />
  <input type="text" placeholder="Review" name="book_review" {...register("book_review",{required:true, maxLength: 400})}/>
  <input type="number" placeholder="Rating" name="book_rating" {...register("book_rating",{required:true, max:5, min:0})}/>
  <input id="btn" type="submit" />
</form>

  </div>
</>);
};

export default Add;
