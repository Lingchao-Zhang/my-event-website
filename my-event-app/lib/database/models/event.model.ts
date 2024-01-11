import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now()},
    imageUrl: { type: String, required: true },
    startTime: { type: Date, default: Date.now()},
    endTime: { type: Date, default: Date.now()},
    price: { type: String },
    isFree: { type: Boolean, default: false },
    eventUrl: { type: String },
    catergory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Event = models.Event || model("Event", eventSchema)

export default Event