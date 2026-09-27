import { useApiResource } from '../hooks/useApiResource';

function Activities() {
  const { records: activities, isLoading, error } = useApiResource('activities');

  if (isLoading) {
    return <p>Loading activities…</p>;
  }

  if (error) {
    return <p className="text-danger">Failed to load activities: {error}</p>;
  }

  return (
    <div>
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Team</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Completed At</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name}</td>
              <td>{activity.team?.name}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{new Date(activity.completedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
