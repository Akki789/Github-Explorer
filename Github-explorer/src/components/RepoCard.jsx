import { useEffect, useState } from "react";

function RepoCard({ repo }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(saved.some((r) => r.id === repo.id));
  }, [repo.id]);

  const toggleBookmark = (e) => {
    e.stopPropagation(); // IMPORTANT (prevents card click)

    let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarked) {
      saved = saved.filter((r) => r.id !== repo.id);
    } else {
      saved.push(repo);
    }

    localStorage.setItem("bookmarks", JSON.stringify(saved));
    setBookmarked(!bookmarked);
  };

  // OPEN REPO ON CLICK
  const openRepo = () => {
    window.open(repo.html_url, "_blank");
  };

  return (
    <div className="repo-card" onClick={openRepo}>
      <h3>{repo.name}</h3>

      <p>{repo.description || "No description available"}</p>

      {/* LANGUAGE BADGE */}
      {repo.language && (
        <span className="language-badge">{repo.language}</span>
      )}

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