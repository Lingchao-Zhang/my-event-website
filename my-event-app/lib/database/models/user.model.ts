import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    clerkId: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true },
    avatar: { type: String, required: true },
    onboarded: {
        type: Boolean,
        default: false
    },
    organisedEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

const User = models.User || model("User", userSchema)

export default User