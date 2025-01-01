import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [8, "Password must be at least 8 characters long!"],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"],
        select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    verfied: { type: Boolean, default: false },
},
    { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;