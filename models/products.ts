import mongoose, { Schema, model, Types } from "mongoose";


const ProductsSchema = new Schema({

    uid: {
        type: String
    },


    name: {
        type: String,
        require: [ true, 'El nombre del producto es obligatorio' ],
        default: ''
    },

    price: {
        type: Number,
        require: [ true, 'Se debe especificar un precio' ],
        default: 0
    },

    exists: {
        type: Number,
        require: [ true, 'Se debe colocar las existencias' ],
        default: 0
    },

    description: {
        type: String,
        default: 'Sin descripción'
    },

    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Categories',
        default: ''
    },

    enabled: {
        type: Boolean,
        default: true
    },

    car:{
        type: Number,
        default: 0
    }

}); 

ProductsSchema.methods.toJSON = function(){

    const { __v, _id, enabled, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

const Products = model( 'Products', ProductsSchema );

export default Products;