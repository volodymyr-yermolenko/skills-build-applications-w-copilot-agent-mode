import mongoose, { Schema, type Types } from 'mongoose';

export interface ActivityDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: 'run' | 'cycle' | 'strength' | 'yoga' | 'swim';
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);

export default Activity;