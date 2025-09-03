import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "editor" | "writer" | "user";

export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["admin", "editor", "writer", "user"], index: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  const doc = this as any;
  if (!doc.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  doc.password = await bcrypt.hash(doc.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.index({ email: 1 });

export default models.User || model<IUser>("User", UserSchema);
