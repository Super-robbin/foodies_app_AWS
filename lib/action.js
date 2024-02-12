"use server";

export const shareMeal = async (formData) => {
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

  console.log(meal);
};
