"use client";

import { useFormStatus } from "react-dom";

// The useFormStatus() gives you a status object, which has a pending property,
// that is true if there is an ongoing request and false otherwise.
// Therefore, we can actually use object destructuring here
// to pull out that one property I am interested in here, that's the pending property.
// Then meals-form-submit should return a button.
// I wanna output some conditional content here and check if pending is truthy, in which case I want
// to output "Submitting...", otherwise I'll output "Share Meal".
// In addition, I want to disable the button if we are submitting, so we will set disabled={pending}.

const MealFormSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
};

export default MealFormSubmit;
