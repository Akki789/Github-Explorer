import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRepos } from "../services/githubApi";
import RepoCard from "../components/RepoCard";

function UserRepos() {
  const { username } = useParams();

  const [repos, setRepos] = useState([]);
  const [visibleRepos, setVisibleRepos] = useState([]);
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState("");
  const [language, setLanguage] = useState("");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchRepos = async () => {
      const data = await getUserRepos(username);
      setRepos(data);
    };

    fetchRepos();
  }, [username]);

  useEffect(() => {
    let filtered = [...repos];

    // FILTER
    if (language) {
      filtered = filtered.filter(
        (repo) =>
          repo.language &&
          repo.language.toLowerCase().includes(language.toLowerCase())
      );
    }

    // SORT
    if (sort === "stars") {
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sort === "forks") {
      filtered.sort((a, b) => b.forks_count - a.forks_count);
    }

    setVisibleRepos(filtered.slice(0, page * ITEMS_PER_PAGE));
  }, [repos, sort, language, page]);

  // INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <h2>{username}'s Repositories</h2>

      {/* CONTROLS */}
      <div className="controls">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>

        <input
          placeholder="Filter by language..."
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>

      <div className="grid">
        {visibleRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default UserRepos;