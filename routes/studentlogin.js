var express = require("express");
const router = express.Router();
const Student = require("../models/Students");

let pdf = require("html-pdf");
let path = require("path");
const Students = require("../models/Students");
router.get("/login", (req, res) => {
  res.render("student/login");
});
router.post("/login", async (req, res) => {

    const Stuname = req.body.name;
    const individualStudent = await Student.findOne({name : Stuname});
    if(!individualStudent){
      res.render("student/login", {
        error : "Login with correct user name"
      })
    }
    res.render("student/view", { one : individualStudent})
});


// router.get("/student/login/generatepdf", (req, res) => {
//   ejs.renderFile(path.join(__dirname, './views/student/view.ejs'), {Students}, (err, data) => {
//   if (err) {
//         res.send(err);
//   } else {
//       let options = {
//           "height": "11.25in",
//           "width": "8.5in",
//           "header": {
//               "height": "20mm"
//           },
//           "footer": {
//               "height": "20mm",
//           },
//       };
//       pdf.create(data, options).toFile("report.pdf", function (err, data) {
//           if (err) {
//               res.send(err);
//           } else {
//               res.send("File created successfully");
//           }
//       });
//   }
// });
// })

module.exports = router;
