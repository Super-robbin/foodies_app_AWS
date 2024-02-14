"use client";
import { useFormState } from "react-dom";

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealFormSubmit from "@/components/meals/meals-form-submit";

const ShareMealPage = () => {
  // useFormState is responsible for managing the state of this page or of this component,
  // which uses a form that will be submitted with help of Server Actions.
  // useFormState needs two arguments, the first argument is the actual Server Action
  // that should be triggered when the form is submitted (shareMeal()).
  // The second argument you pass to useFormState is the initial state of this component,
  // the initial value that should be returned by useFormState
  // before this action has been triggered and yielded a response.
  // So the initial value that should be used if we haven't received a response
  // from this action yet, and that could be anything you want.
  // So our initial value here could be the same shape
  // but null as a value for the message {message: null}.
  // Then useFormState will give you an array with exactly two elements, [state, formAction]
  // here the two elements we get here are kind of similar to the two elements we get from useState.
  // formAction we should actually set as a value for the action prop on the form now.
  // So instead of setting share meal as a value for action down here, I'm now setting formAction,
  // which I'm getting back from useFormState as a value for the action down there.

  // IMPORTANT: the state will either be {message: 'Invalid input'} or {message: null}
  // so we will output the error message conditionally below

  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
};
export default ShareMealPage;
