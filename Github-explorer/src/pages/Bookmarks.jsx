import { useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";

function Bookmarks() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setRepos(saved);
  }, []);

  return (
    <div className="container">
      <h2>Bookmarked Repositories</h2>

      {repos.length === 0 && <p>No bookmarks yet</p>}

      <div className="grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;