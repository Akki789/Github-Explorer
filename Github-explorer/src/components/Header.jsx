import { useNavigate } from "react-router-dom";

function Header({ dark, setDark }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* LEFT */}
      <h1 className="logo" onClick={() => navigate("/")}>
        Github Explorer
      </h1>

      {/* RIGHT */}
      <div className="header-right">
        <button onClick={() => navigate("/")}>
          Home
        </button>

        <button onClick={() => navigate("/bookmarks")}>
          ⭐ Bookmarks
        </button>

        <button onClick={() => setDark(!dark)}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;