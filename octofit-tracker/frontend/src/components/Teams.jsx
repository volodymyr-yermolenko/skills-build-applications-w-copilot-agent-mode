import { useApiResource } from '../hooks/useApiResource';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
// Falls back to localhost when VITE_CODESPACE_NAME is unset to avoid `https://undefined-8000...`
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const { records: teams, isLoading, error } = useApiResource(teamsEndpoint);

  if (isLoading) {
    return <p>Loading teams…</p>;
  }

  if (error) {
    return <p className="text-danger">Failed to load teams: {error}</p>;
  }

  return (
    <div>
      <h1>Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Motto</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.city}</td>
              <td>{team.motto}</td>
              <td>{team.members?.map((member) => member.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
