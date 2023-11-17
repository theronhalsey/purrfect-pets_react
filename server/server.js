// Dependencies
// =============================================================
import express from 'express';
import cors from 'cors';
import router from './controller.js';

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(cors());
app.use(express.json());
app.use(router);

// Static directory to be served
app.use(express.static("dist"));

// LISTENER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

