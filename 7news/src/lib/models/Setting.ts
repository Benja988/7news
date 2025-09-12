import { Schema, model, models, Model } from "mongoose";

export interface ISetting {
  key: string;
  value: any;
  group: string;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    group: { type: String, required: true }, // e.g. "general", "email"
  },
  { timestamps: true }
);

const Setting =
  (models.Setting as Model<ISetting>) ||
  model<ISetting>("Setting", SettingSchema);

export default Setting;
