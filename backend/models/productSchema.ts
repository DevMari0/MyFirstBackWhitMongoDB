import mongoose from "mongoose"

const { Schema, model} = mongoose

const Product = new Schema({

    name : { type : String, required : true},
    quantity : { type : Number, required : true },
    price : {type : Number, required : true},
    category : {type : String, required : true },
    disponibility : {type : Boolean , required : true },
    timestamp: { type: Date, default: Date.now, required: true, },

})

const Products = model("products", Product)
//console.log("Schema creato", Product )

export default Products;