import { useApiResource } from '../hooks/useApiResource';

function Users() {
  const { records: users, isLoading, error } = useApiResource('/api/users/');

  if (isLoading) {
    return <p>Loading users…</p>;
  }

  if (error) {
    return <p className="text-danger">Failed to load users: {error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Fitness Level</th>
            <th>City</th>
            <th>Weekly Goal</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.fitnessLevel}</td>
              <td>{user.city}</td>
              <td>{user.weeklyGoal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
