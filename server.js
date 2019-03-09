import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import users from "./routes/user";
import CONFIG from "./config";

mongoose.Promise = global.Promise;

const app = express();
const port = 8080;

// configure body-Parser
app.use(bodyParser.json());

app.use("/api/users", users);

// configure mongodb
mongoose.connect(CONFIG.MONGODB_URI, { useNewUrlParser: true }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Connected to MongoDB");
      
    }
  }
);

app.get("/*", (req, res) => res.send("This is backend"));

app.listen(port, () => console.log(`Server running on port: ${port}!`));
