import mongoose, { Schema, type Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  city: string;
  motto: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);

export default Team;