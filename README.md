# 🎮 Movie Browser App

This is a responsive and feature-rich Movie Browser App built with **React** and styled using **Bootstrap**. It allows users to:

* Browse trending and popular movies
* Search for movies by title
* Filter by genre, release year, and rating
* Mark and view favorite movies
* Load more movies via infinite scroll

## 🚀 Live Demo

> (You can add your GitHub Pages/Netlify/Vercel link here once deployed)

---

## 🧪 Features

* 🔍 **Search**: Quickly search movies by title
* 🎞️ **Genre Filter**: Filter movies by genres like Action, Comedy, Horror, etc.
* 📆 **Year Filter**: Filter movies by release year
* ⭐ **Rating Filter**: Show movies with minimum rating
* ❤️ **Favorite System**: Save movies to your personal favorites (stored in localStorage)
* 📃 **Infinite Scroll**: Loads more movies as you scroll down
* 📱 **Responsive Design**: Works well on desktop and mobile

---

## 🧪 Tech Stack

* **React**
* **Bootstrap**
* **Axios**
* **The Movie Database (TMDB) API**

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-browser.git
cd movie-browser
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Your TMDB API Key

Edit `src/App.js` and replace the API key:

```js
const API_KEY = "your_tmdb_api_key_here";
```

### 4. Start the Development Server

```bash
npm start
```

The app will run at `http://localhost:3000`.

---

## 🗃️ Folder Structure

```
movie-browser/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## 📸 Screenshots

> *(Add screenshots here once the app is running)*

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* [TMDB API](https://www.themoviedb.org/documentation/api)
* [Bootstrap](https://getbootstrap.com/)
