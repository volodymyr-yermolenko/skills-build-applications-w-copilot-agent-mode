import { connectToDatabase } from '../config/database.js';
import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectToDatabase();

    await Promise.all([
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@octofit.test',
        fitnessLevel: 'advanced',
        city: 'Seattle',
        weeklyGoal: 5,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@octofit.test',
        fitnessLevel: 'intermediate',
        city: 'Austin',
        weeklyGoal: 4,
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.test',
        fitnessLevel: 'advanced',
        city: 'Boston',
        weeklyGoal: 6,
      },
      {
        name: 'Jordan Rivera',
        email: 'jordan.rivera@octofit.test',
        fitnessLevel: 'beginner',
        city: 'Denver',
        weeklyGoal: 3,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Sprinters',
        city: 'Seattle',
        motto: 'Own the uphill.',
        members: [users[0]._id, users[3]._id],
      },
      {
        name: 'River City Riders',
        city: 'Austin',
        motto: 'Strong miles, steady minds.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 610,
        completedAt: new Date('2026-09-25T06:45:00.000Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'cycle',
        durationMinutes: 68,
        caloriesBurned: 740,
        completedAt: new Date('2026-09-24T12:15:00.000Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 45,
        caloriesBurned: 430,
        completedAt: new Date('2026-09-23T17:30:00.000Z'),
      },
      {
        user: users[3]._id,
        team: teams[0]._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        completedAt: new Date('2026-09-22T07:00:00.000Z'),
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'swim',
        durationMinutes: 40,
        caloriesBurned: 390,
        completedAt: new Date('2026-09-21T08:20:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        points: 1280,
        rank: 1,
        streakDays: 18,
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        points: 1170,
        rank: 2,
        streakDays: 14,
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        points: 980,
        rank: 3,
        streakDays: 10,
      },
      {
        user: users[3]._id,
        team: teams[0]._id,
        points: 620,
        rank: 4,
        streakDays: 6,
      },
    ]);

    await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Tempo Run Intervals',
        focusArea: 'Endurance',
        difficulty: 'advanced',
        scheduledFor: new Date('2026-09-28T06:30:00.000Z'),
        durationMinutes: 50,
      },
      {
        user: users[1]._id,
        title: 'Hill Ride Builder',
        focusArea: 'Cycling Power',
        difficulty: 'intermediate',
        scheduledFor: new Date('2026-09-28T13:00:00.000Z'),
        durationMinutes: 60,
      },
      {
        user: users[2]._id,
        title: 'Upper Body Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'advanced',
        scheduledFor: new Date('2026-09-29T18:00:00.000Z'),
        durationMinutes: 45,
      },
      {
        user: users[3]._id,
        title: 'Mobility and Core Reset',
        focusArea: 'Recovery',
        difficulty: 'beginner',
        scheduledFor: new Date('2026-09-29T07:15:00.000Z'),
        durationMinutes: 30,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
