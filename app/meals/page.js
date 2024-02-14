import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

// Instead of using loading.js, we create the Meals component below which is responsible
// for returning the MealsGrid. So we will cut the MealsGrid from the MealsPage component
// and return it here inside Meals, we then use Meals inside MealsPage.
// We can now wrap Meals with the Suspense built-in React component that allows you to handle
// loading states and show fallback content until some data or resource has been loaded.

const Meals = async () => {
  console.log('Fetching meals')
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
