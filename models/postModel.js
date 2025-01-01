import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    description: { type: String, required: [true, "Description is required!"] },
    image: { type: String },
    likes: [{typeof: String}],
    comments: [{type: Schema.Types.ObjectId, ref: "Comments" }],
},
    { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;