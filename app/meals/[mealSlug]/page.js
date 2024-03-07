import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
import sql from "better-sqlite3";

// Make sure to use this name because NextJS will look for this function.
// If it doesn't find any other metadata, it's checking whether there is such a function.
// Here we also get an object with a PARAMS key, and that of course allows us to get the meal
// for which the metadata should be generated by simply const meal = getMeal(params.mealSlug)

export const generateMetadata = async ({ params }) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}; // Dynamically generated metadata

const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
    // Calling this function will stop this component from executing
    // and will show the closest not-found or error page.
    // Without a not-found inside the meals folder, it will show the one in the app root folder,
    // since we have one generic there.
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://robquadraccia-nextjs-foodies-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* 
        The instructions that are stored for every meal should actually be output as HTML code,
        which can be achieved in React by targeting the dangerouslySetInnerHTML prop on an element.
        It's called like this because you open yourself up to cross-site scripting attacks
        when outputting content as HTML content, at least if you're not validating it.
        Now this prop then wants an object as a value, and that object should have an __html property,
        which then contains the actual HTML code that should be output on the screen.
        Now we'll get that code later from that meal once we fetched it,
        but that's how we'll output it on the screen.
         */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  // Open SQLite database
  const db = sql("meals.db");

  // Fetch data from SQLite
  const results = db.prepare('SELECT slug FROM your_table').all();

  // Close the database connection
  db.close();

  // Generate paths based on fetched data
  const paths = results.map(result => ({
    params: { slug: result.slug }
  }));

  return { paths, fallback: 'blocking' };
}

export default MealDetailsPage;
