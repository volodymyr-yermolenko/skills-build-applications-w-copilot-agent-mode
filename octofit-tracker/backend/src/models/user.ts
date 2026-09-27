import mongoose, { Schema } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  city: string;
  weeklyGoal: number;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    city: { type: String, required: true, trim: true },
    weeklyGoal: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;