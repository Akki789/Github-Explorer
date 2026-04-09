import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="user-card"
      onClick={() => navigate(`/user/${user.login}`)}
    >
      <img src={user.avatar_url} alt={user.login} />
      <p>{user.login}</p>
    </div>
  );
}

export default UserCard;