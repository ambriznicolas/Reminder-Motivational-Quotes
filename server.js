const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


let defaultClient = 

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  ""

let apiInstance = new SibApiV3Sdk.ContactsApi();

let createContact = new SibApiV3Sdk.CreateContact();
createContact.listIds = [2];

const app = express();
//This lets us server static assets like javascript or css
app.use(express.static("public"));
app.use(express.static("css"));

app.set("views", "views");
app.set("view engine", "ejs");

//This line makes it easier to parse the the request by placing the information in the request body.
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/email", (req, res) => {
  let fn = req.body.firstName;
  let ls = req.body.lastName;
  let email = req.body.email;

  //Object Prepared for SendInBlue
  const subscribingUser = {
    firstName: fn,
    lastName: ls,
    email: email
  };
  

  createContact.email = subscribingUser.email;
  
  createContact.attributes = {
    LASTNAME: subscribingUser.lastName,
    FIRSTNAME: subscribingUser.firstName,
    
  };

  apiInstance.createContact(createContact).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
      res.render("success");
    },
    function (error) {
      res.render("failure");
      app.post("/failure", (req, res) => {
        res.redirect("/");
      });
      console.error(error);
    }
  );
});


app.listen(3000, () => {
  console.log("Listening on port 3000;");
});
