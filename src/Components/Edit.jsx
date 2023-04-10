import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const Edit = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    data["id"] = props.id;

    await updateReview(data);
  };

  const updateReview = async (data) => {
    try {
      await axios.put(" http://localhost:3000/reviews", data);

      props.setReviews(
        props.reviews.map((item) => {
          return item.id === props.id
            ? {
                id: item.id,
                book_title: item.book_title,
                book_review: item.book_review,
                book_rating: item.book_rating,
                key: item.id,
              }
            : {
                ...item,
                key: item.id,
              };
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="reviewform">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Book Title"
            name="book_title"
            {...register("book_title", { required: true, maxLength: 100 })}
          />
          <input
            type="text"
            placeholder="Review"
            name="book_review"
            {...register("book_review", { required: true, maxLength: 400 })}
          />
          <input
            type="number"
            placeholder="Rating"
            name="book_rating"
            {...register("book_rating", { required: true, max: 5, min: 0 })}
          />
          <input id="btn" type="submit" />
        </form>
      </div>
    </>
  );
};

export default Edit;
