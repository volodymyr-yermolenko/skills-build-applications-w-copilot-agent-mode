import { useApiResource } from '../hooks/useApiResource';

function Leaderboard() {
  const { records: entries, isLoading, error } = useApiResource('/api/leaderboard/');

  if (isLoading) {
    return <p>Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="text-danger">Failed to load leaderboard: {error}</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
            <th>Streak (days)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name}</td>
              <td>{entry.team?.name}</td>
              <td>{entry.points}</td>
              <td>{entry.streakDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
