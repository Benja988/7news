import { Schema, model, models, Types, Model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import * as crypto from "crypto";

export type UserRole = "admin" | "editor" | "writer" | "user" | "moderator";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  profile: {
    bio?: string;
    avatar?: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  lastLogin?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  preferences: {
    notifications: {
      email: boolean;
      comments: boolean;
      updates: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
  generateResetToken(): string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email address"],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "writer", "user", "moderator"],
      default: "user",
      index: true,
    },
    isActive: { type: Boolean, default: true, index: true },
    profile: {
      bio: { type: String, maxlength: [500, "Bio cannot exceed 500 characters"] },
      avatar: { type: String, validate: [validator.isURL, "Invalid avatar URL"] },
      socialLinks: {
        twitter: { type: String, validate: [validator.isURL, "Invalid Twitter URL"] },
        linkedin: { type: String, validate: [validator.isURL, "Invalid LinkedIn URL"] },
        website: { type: String, validate: [validator.isURL, "Invalid website URL"] },
      },
    },
    lastLogin: { type: Date },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        comments: { type: Boolean, default: true },
        updates: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);

// Password hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison
UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// Generate password reset token
UserSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 3600 * 1000); // 1 hour expiry
  return token;
};

// Indexes for common queries
// UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, isActive: 1 });

const User: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;