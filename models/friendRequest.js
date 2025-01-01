import mongoose, {Schema} from "mongoose";

const requestSchema = Schema(
    {
        requestFrom: { type: Schema.Types.ObjectId, ref: "Users" },
        requestTo: { type: Schema.Types.ObjectId, ref: "Users" },
        requestStatus: { type: String, default: "pending" },
    },
    { timestamps: true }
)

const FriendRequest = mongoose.model("FriendRequests", requestSchema);

export default FriendRequest;