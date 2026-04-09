# Github Explorer 🔍

Github Explorer is a modern tool built with React that allows users to search developers, explore their repositories, and bookmark useful projects — all with a clean UI and smooth user experience.

---

## 🚀 Features

### 🔎 Search Developers

* Search GitHub users in real-time
* Debounced input to optimize API calls

### 📦 Explore Repositories

* View repositories of selected users
* Displays:

  * Repository name
  * Description
  * Stars ⭐
  * Forks 🍴
  * Language 🧩

### ⭐ Bookmarks

* Save favorite repositories
* Stored using localStorage
* Dedicated bookmarks page

### 🎯 Advanced Functionality

* 🔄 Infinite scrolling for repositories
* 🔃 Sort by stars or forks
* 🔍 Filter by programming language

### 🌙 UI / UX Enhancements

* Dark / Light mode toggle
* Skeleton loading states
* Empty states for better guidance
* Responsive and clean design

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Hooks & Functional Components)
* **Routing:** React Router DOM
* **State Management:** useState, useEffect
* **Custom Hooks:** useDebounce
* **API:** GitHub REST API
* **Storage:** localStorage

---

## 📁 Folder Structure

```
src/
 ├── components/
 │     ├── Header.jsx
 │     ├── SearchBar.jsx
 │     ├── UserCard.jsx
 │     ├── RepoCard.jsx
 │
 ├── hooks/
 │     └── useDebounce.js
 │
 ├── pages/
 │     ├── Home.jsx
 │     ├── UserRepos.jsx
 │     └── Bookmarks.jsx
 │
 ├── services/
 │     └── githubApi.js
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Akki789/Github-Explorer.git

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🌐 API Endpoints Used

* Search Users
  https://api.github.com/search/users?q={query}

* User Repositories
  https://api.github.com/users/{username}/repos

---

## 🧠 Key Concepts Implemented

* Debouncing for efficient API usage
* Conditional rendering for UI states
* Infinite scrolling for improved UX
* LocalStorage for persistence (bookmarks & theme)
* Component-based architecture

---

## 🙌 Author

Built by **Akash Kumar**

---

## ⭐ Show your support

If you found this project useful, consider giving it a ⭐ on GitHub
