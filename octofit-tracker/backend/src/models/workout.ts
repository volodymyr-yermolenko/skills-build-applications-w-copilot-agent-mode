import mongoose, { Schema, type Types } from 'mongoose';

export interface WorkoutDocument {
  user: Types.ObjectId;
  title: string;
  focusArea: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scheduledFor: Date;
  durationMinutes: number;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    scheduledFor: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
  },
);

const Workout = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;