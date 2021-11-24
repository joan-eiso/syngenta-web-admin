const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 8000;
const path = require("path");

const API_AUTH_ENDPOINT = "https://6vc5bahvj9.execute-api.us-east-2.amazonaws.com/stage_syngenta_pdn/unregistred-user"; 
const API_SESSION_ENDPOINT = "https://xtdb9nxmja.execute-api.us-east-2.amazonaws.com/stage_syngenta_pdn_logged/syngenta-logged-pdn"; 

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(morgan("tiny"));

app.post("/api/auth", async (req, res) => {
  const response = await axios.request({
    method: "POST",
    url: API_AUTH_ENDPOINT,
    data: {
      "method": req.body.method,
      data: req.body.data,
    },
  });
  const { data } = response;
  res.send(data);
});

app.post("/api/session", async (req, res) => {
  const response = await axios.request({
    method: "POST",
    url: API_SESSION_ENDPOINT,
    data: {
      "method": req.body.method,
      data: req.body.data,
    },
  });
  const { data } = response;
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});