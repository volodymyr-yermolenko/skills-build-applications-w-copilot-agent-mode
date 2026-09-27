import { useApiResource } from '../hooks/useApiResource';

function Workouts() {
  const { records: workouts, isLoading, error } = useApiResource('workouts');

  if (isLoading) {
    return <p>Loading workouts…</p>;
  }

  if (error) {
    return <p className="text-danger">Failed to load workouts: {error}</p>;
  }

  return (
    <div>
      <h1>Workouts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>Focus Area</th>
            <th>Difficulty</th>
            <th>Scheduled For</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.user?.name}</td>
              <td>{workout.title}</td>
              <td>{workout.focusArea}</td>
              <td>{workout.difficulty}</td>
              <td>{new Date(workout.scheduledFor).toLocaleString()}</td>
              <td>{workout.durationMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
