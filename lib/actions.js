"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

// We will need prevState to use shareMeal inside the useFormState in the page.js
export const shareMeal = async (prevState, formData) => {
  // This creates a Server Action which is a function that is guaranteed
  // to execute on the server, and only there.
  // In addition, to really turn this into a so-called Server Action,
  // you also must add the "async" keyword in front of it.
  // We now assign shareMeal as a value on the action prop on the form.
  // IMPORTANT: this would only work if this is not a client component ('use client' at the top)
  // "use server";

  // UPDATE: We created action.js and moved the server action function here.
  // We then imported the shareMeal function inside the page.js in share and use it there.
  // We also removed 'use server' inside the function because we placed it
  // at the top of the page.

  // formData is the data entered in the form, we can now destructure it with .get()

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  } // server side input validation

  await saveMeal(meal); // It will return a Promise so use await
  // revalidatePath() tells NextJS to revalidate the cache that belongs to a certain route path.
  // IMPORTANT: The default second argument is PAGE, which means that simply this one page
  // for this one path will be revalidated.
  // If you set it to LAYOUT, it's the layout that will be revalidated,
  // which also wraps nested pages, and therefore all nested pages would be revalidated as well.
  // Hence, revalidate means that NextJS throws away the cache that is associated with those pages.
  revalidatePath("/meals"); // in this case '/meals' is enough, we don't need 'layout'
  redirect("/meals");
};
