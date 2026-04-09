import { useEffect, useState } from "react";

function RepoCard({ repo }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(saved.some((r) => r.id === repo.id));
  }, [repo.id]);

  const toggleBookmark = () => {
    let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarked) {
      saved = saved.filter((r) => r.id !== repo.id);
    } else {
      saved.push(repo);
    }

    localStorage.setItem("bookmarks", JSON.stringify(saved));
    setBookmarked(!bookmarked);
  };

  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>

      <div className="repo-stats">
        ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
      </div>

      <button onClick={toggleBookmark}>
        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
    </div>
  );
}

export default RepoCard;