
import { Schema, model } from "mongoose";


const ShopSchema: Schema = new Schema({

    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    date: {
        type: String,
        default: new Date().toString()
    },

    products: []
});

ShopSchema.methods.toJSON = function(){

    const { __v, _id, enabled, user,...shop } = this.toObject();
    shop.uid = _id;
    return shop;
}

const Shop = model( 'Shop', ShopSchema );
export default Shop;