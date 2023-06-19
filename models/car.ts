
import { Schema, model } from "mongoose";


const CarSchema: Schema = new Schema({

    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    products: []
});

CarSchema.methods.toJSON = function(){

    const { __v, _id, enabled,...car } = this.toObject();
    car.uid = _id;
    return car;
}

const Car = model( 'Car', CarSchema );
export default Car;