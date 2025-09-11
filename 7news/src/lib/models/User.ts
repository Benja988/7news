// models/User.ts
import { Schema, model, models, Types, Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "editor" | "writer" | "user";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "editor", "writer", "user"],
      index: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const doc = this as IUser;
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  doc.password = await bcrypt.hash(doc.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
