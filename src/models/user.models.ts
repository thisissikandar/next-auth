import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be provided"],
      unique: true,
    },
    fullName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordToknExpirye: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
