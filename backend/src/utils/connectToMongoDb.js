const mongoose = require("mongoose")



const connectDB = () =>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName : "roxilous"
    }).then(()=>console.log("Connected to DB"))
    .catch((error)=>console.log(error))
}
// export default connectDB;
module.exports = connectDB