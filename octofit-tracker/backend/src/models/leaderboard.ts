import mongoose, { Schema, type Types } from 'mongoose';

export interface LeaderboardDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  streakDays: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

const Leaderboard = mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;