require("dotenv").config({path:__dirname+'/.env'}); // read the contents of the .env file
const express = require("express"); // load the node.js webserver
const app = express();

const cors = require("cors"); // load the cross-origin resource sharing management tool
app.use(cors())

app.use(express.json()); // configure the webserver to convert all incoming and outgoing data to json format
app.use("/api", require("./routes/survey")); // load our routes file for api calls

// for production we must serve the HTML page that holds the code that runs in the browser
if (process.env.NODE_ENV==='PROD'){ 
  let path = require('path');
  app.use(express.static(__dirname + '/public'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
  });
}

// all else goes to 'page not found'
app.all("*", (req, res) => {
  res.sendStatus(404);
});

// start the server
app.listen(process.env.NODE_PORT, () =>
  console.log(`Server (${process.env.NODE_ENV}) running on port ${process.env.NODE_PORT}`)
);