import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

const MealItem = ({ title, slug, image, summary, creator }) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* 
        fill below tells NextJS that it should fill the available space with the image,
        as defined by its parent components
        */}
          <Image
            src={`https://robquadraccia-nextjs-foodies-users-image.s3.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
