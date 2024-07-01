
const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    price : Number,
    description : String,
    category : String,
    category : String
})
const Product = mongoose.model("Product", productSchema)
// export default Product;
module.exports = Product