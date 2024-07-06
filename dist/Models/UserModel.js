import mongoose from "mongoose";
// Define the Mongoose schema based on the IUser interface
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    loginTimestamps: {
        type: [Date],
        default: [],
    }
}, { timestamps: true });
// Create and export the User model
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
//# sourceMappingURL=UserModel.js.map