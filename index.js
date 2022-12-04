var phantom = require('phantom');   
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
let pdf = require("html-pdf");
let path = require("path");
var ejs = require('ejs');
const router = express.Router();
pdf = require('express-pdf');
const Student = require("./models/Students");
const fs = require('fs');

mongoose.connect("mongodb://localhost:27017/task3", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.json());
app.use(express.urlencoded());

const teacherRoutes = require("./routes/teacherlogin")
const studentRoutes = require("./routes/studentlogin");
const Students = require('./models/Students');
app.use("/teacher",teacherRoutes)
app.use("/student",studentRoutes)

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

//generating pdf

app.get("/generatepdf", (req, res) => {
  ejs.renderFile(path.join(__dirname,'./views/student/', "view.ejs"), {students:Student}, (err, data) => {
  if (err) {

        res.send(err);
  } else {
      let options = {
          "height": "11.25in",
          "width": "8.5in",
          "header": {
              "height": "20mm"
          },
          "footer": {
              "height": "20mm",
          },
      };
      pdf.create(data, options).toFile("report.pdf", function (err, data) {
          if (err) {
              res.send(err);
          } else {
            
              res.send("File created successfully");
          }
      });
  }
});
})

// phantom.create().then(function(ph) {
//     ph.createPage().then(function(page) {
//         page.open("view.ejs",Students).then(function(status) {
//             page.render('google.pdf').then(function() {
//                 console.log('Page Rendered');
//                 ph.exit();
//             });
//         });
//     });
// });
app.get('/generatepdf', function (req, res) {
  var filePath = "views/student/view.ejs";

  fs.readFile(__dirname + filePath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });
  
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
