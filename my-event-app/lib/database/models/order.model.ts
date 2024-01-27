import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    orderId: {
        type: String,
        require: true,
        unique: true
    },
    ticketAmount: {
        type: String,
        require: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event" 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = models.Order || model("Order", orderSchema)

export default Order