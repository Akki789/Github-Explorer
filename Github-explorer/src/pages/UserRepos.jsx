import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRepos } from "../services/githubApi";
import RepoCard from "../components/RepoCard";

function UserRepos() {
  const { username } = useParams();

  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("stars");
  const [language, setLanguage] = useState("");

  // RESET when user changes
  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [username]);

  // FETCH REPOS
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);

        const data = await getUserRepos(username, page);

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setRepos((prev) => [...prev, ...data]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page, username]);

  //  infinite SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // SORT
  const sortedRepos = [...repos].sort((a, b) => {
    if (sort === "stars") return b.stargazers_count - a.stargazers_count;
    if (sort === "forks") return b.forks_count - a.forks_count;
    return 0;
  });

  // FILTER
  const filteredRepos = sortedRepos.filter((repo) => {
    if (!language) return true;

    return repo.language
      ?.toLowerCase()
      .includes(language.toLowerCase());
  });

  //LANGUAGES filter
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

        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* REPO LIST */}
      <div className="grid">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* LOADING / END */}
      {loading && <p>Loading more...</p>}
      {!hasMore && <p>No more repositories</p>}
    </div>
  );
}

export default UserRepos;