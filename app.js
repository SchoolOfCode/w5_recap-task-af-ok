import express from "express";
import logger from "morgan";
import getTable from "./db/scripts/getTable.js";

const PORT = process.env.PORT || "3000";
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));

/** DO NOT CHANGE THIS ROUTE - it serves our front-end */
app.get("/", function (req, res) {
  res.render("index", { title: "Cats" });
});

export let cats = await getTable();

// export const cats = [
//   {
//     id: 1,
//     name: "Tony",
//     human: "Liz.K",
//     hobby: "cling",
//   },
//   {
//     id: 2,
//     name: "Poppy",
//     human: "Tim",
//     hobby: "screm",
//   },
//   {
//     id: 3,
//     name: "Narla",
//     human: "Mell",
//     hobby: "obstruct",
//   },
// ];
// class declaration for the standard response object sent by the API
class ResObject {
  constructor(payload) {
    this.success = true;
    this.payload = payload;
  }
}

/* Your tasks for part 1: 🔻 
- 👉 Add request handlers/routes for your API that will handle requests to the path "/api/cats" for all the 
cats, providing the data in the cats array in this file. Test this in your browser.

- 👉 Add code to also handle requests for a cat by id using params, and cats by name using a query. 
Test this in your browser.
- 👉 Test the form on the front-end here: http://localhost:3000
*/

// returns either the full cats array or if there is a search param e.g. http://localhost:3000/api/cats/?catname=Poppy returns the cat element or an error message.
app.get("/api/cats", (req, res) => {
  const catName = req.query.catname;

  let payload = cats;
  if (catName) {
    payload =
      cats.filter(
        (element) => element.name.toLowerCase() === catName.toLowerCase()
      )[0] || "This cat could not be found please try a different name";
    console.log(payload);
  }
  res.json(new ResObject(payload));
});

//returns specific cat by its given id
app.get("/api/cats/:id", (req, res) => {
  const bodyId = Number(req.params.id);
  const payload = cats.find((element) => element.id === bodyId);
  res.json(new ResObject(payload));
});

app.listen(PORT, function () {
  console.log(`Server listening on port: ${PORT}`);
});
