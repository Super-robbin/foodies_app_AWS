import { S3 } from '@aws-sdk/client-s3';
// import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: 'eu-west-2'
});
const db = sql("meals.db");

// I'll import SQL from this better SQLite three package and I'll then establish the database connection,
// by executing SQL as a function and then passing the name of the database here as a string to that function.
// Then we can work on this DB object to perform actions on that database.

// Now I'll add a new exported function here getMeals, which should do what the name implies.
// It should get all the meals from that database. For that we can now use this DB object
// and then prepare a new statement, a new SQL statement that should be executed.
// I want to SELECT * (all) columns from the meals table.
// Then we just have to run this though, we use all() and not run()
// RUN would be used if you were inserting data, for example if you were changing data,
// ALL is used if you are fetching data and you want to get back all the rows
// that are fetched by that statement. If you were looking for a single row, you could use GET instead.
// Then we just have to return this result.

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug) => {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export const saveMeal = async (meal) => {
  // Step 1 - npm i slugify xss and import at the top
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // sanitise harmful content from instructions

  // Step 2 - start by getting the image extension (i.e. png), call the split on the dot
  // and the pop the last element, which will be the extension. We then generate a fileName
  // that uses meal.slug and then the extension
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // Step 3 - Now we need to write that to a file in that public folder.
  // We can do that with help of an API provided by node JS. The file system API (fs).
  // I'll import fs from node:fs. We can then use this fs module to call createWriteStream,
  // which will create a stream that allows us to write data to a certain file.
  // Now createWriteStream then needs a path to default, which you wanna write.
  // it'll then return a stream object which you can then use to write to that path.
  // In this case, we pass `public/images/${fileName}` and store it in a const stream
  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer(); // this returns a Promise (await)

  s3.putObject({
    Bucket: 'robquadraccia-nextjs-foodies-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  // IMPORTANT: all the code commented below was initially used to store images into
  // the public folder, therefore it was replaced with above code to save them on AWS.

  // Step 4 - We can now write to that stream using .write() to which we have to pass a chunk.
  // For this we have to create a bufferedImage like above.
  // Since .write() wants a regular Buffer and not an array, we have to write it as below.
  // The second argument is a function to be executed after finishing writing,
  // where we get an error argument which will hold info if something went wrong.
  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error("Saving image failed!");
  //   }
  // });

  // Step 5 - Now we just need to store the overall data in the database.
  // I'll start by overriding the image that's stored in my meal object with a path to the image
  // where we stored it, because I don't wanna store the image file itself
  // in a database instead I just wanna store the path.
  // I'll overwride the image object in my meal with that path here `images/${fileName}`
  // (remove this public segment because all requests for images will be sent
  // to the public folder automatically anyways.)
  // meal.image = `/images/${fileName}`;
  meal.image = fileName;

  // Step 6 - We use db.prepare and INSERT INTO as SQL statement. We also used @ instead of ?
  // to select the values. Finally, we call .run on the statement and pass the meal object to it.
  // IMPORTANT: the order must be the same between meals and VALUES to pass and remember to call
  // saveMeal(meal) inside shareMeal() in the actions.js.
  db.prepare(
    `INSERT INTO meals 
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
      )
      `
  ).run(meal);
};
