import mongoose, { Schema, Types } from "mongoose";

export interface IExportRequest {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  finishedAt?: Date;
  status: "created" | "processing" | "finished";
  message?: string;
  filePath?: string;
}

export interface IExportRequestPayload {
  userId: Types.ObjectId;
  name: string;
  filter: object;
}

const ExportRequestSchema: Schema = new Schema<IExportRequest>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
  finishedAt: { type: Boolean },
  status: { type: String, required: true },
  message: { type: String },
  filePath: { type: String },
});

export default mongoose.model<IExportRequest>(
  "exportRequests",
  ExportRequestSchema
);
