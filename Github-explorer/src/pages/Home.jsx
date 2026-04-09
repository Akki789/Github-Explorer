import { useState, useEffect } from "react";
import { searchUsers } from "../services/githubApi";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

function Home() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await searchUsers(debouncedQuery);
        setUsers(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return (
    <div className="container">
      <SearchBar value={query} onChange={setQuery} />

      {/* EMPTY STATE (only when no search yet) */}
      {!query && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Find Developers</h3>
          <p>Search GitHub users and explore their repositories</p>
        </div>
      )}

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* ERROR */}
      {error && <p>{error}</p>}

      {/* NO RESULTS */}
      {!loading && users.length === 0 && query && (
        <p>No users found</p>
      )}

      {/* RESULTS */}
      {users.length > 0 && (
        <div className="grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;