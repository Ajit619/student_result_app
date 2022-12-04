const mongoose = require("mongoose")
const { Schema } = mongoose;

const studentSchema = new Schema({
  name:  {
    type : String,
    unique : true
  },
  roll: Number,
  math:   String,
  english: String,
  science: String,
  ss: String,
  lang: String,
  status : String
});
module.exports = mongoose.model("Student", studentSchema)

// const adder = async ()=>{
//   const ss = new Student({
//     name: "ajit",
//     roll:3,
//     matn:23,
//     english:23,
//     science:45,
//     ss:45,
//     lang:eng
//   })
//   await ss.save();
// }
// adder();