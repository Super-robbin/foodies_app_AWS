import sql from "better-sqlite3";

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
  return db.prepare("SELECT * FROM meals").all();
};
