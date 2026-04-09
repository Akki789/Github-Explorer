import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRepos } from "../services/githubApi";
import RepoCard from "../components/RepoCard";

function UserRepos() {
  const { username } = useParams();

  const [repos, setRepos] = useState([]);
  const [sort, setSort] = useState("stars");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      const data = await getUserRepos(username);
      setRepos(data);
    };

    fetchRepos();
  }, [username]);

  // 🔥 SORT
  const sortedRepos = [...repos].sort((a, b) => {
    if (sort === "stars") return b.stargazers_count - a.stargazers_count;
    if (sort === "forks") return b.forks_count - a.forks_count;
    return 0;
  });

  // 🔥 FILTER
  const filteredRepos = sortedRepos.filter((repo) => {
    if (!language) return true;

    return repo.language
      ?.toLowerCase()
      .includes(language.toLowerCase());
  });

  // 🔥 UNIQUE LANGUAGES
  const languages = [
    ...new Set(repos.map((r) => r.language).filter(Boolean)),
  ];

  return (
    <div className="container">
      <h2>{username}'s Repositories</h2>

      {/* CONTROLS */}
      <div className="controls">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
        </select>

        {/* 🔥 LANGUAGE DROPDOWN */}
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* REPOS */}
      <div className="grid">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default UserRepos;