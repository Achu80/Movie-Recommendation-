# Movie Recommendation System 🎬

A modern, responsive, and dynamic Movie Recommendation Web Application built with React and Vite. It features a premium Beige & Maroon glassmorphism aesthetic and allows users to interactively discover new movies, find similar recommendations, and build their own custom local movie collection.

## ✨ Features

- **Discover Movies:** Filter movies dynamically by Genre, Industry, and Actor.
- **Find Similar Matches:** Search for a movie you love to instantly get a curated list of similar movies based on intersecting genres and shared cast members.
- **Custom Movie Collection:** Add your own favorite movies to the database via an intuitive form. Custom movies persist locally in your browser!
- **Real TMDB Posters:** Automatically fetches real-life high-quality movie posters from The Movie Database (TMDB) via their API.
- **Stylized Fallbacks:** For movies lacking poster URLs or offline custom movies, beautifully generated gradient thumbnails represent the movie title.

## 🛠️ Technologies Used

- **Frontend Framework:** React (via Vite)
- **Routing:** React Router v6
- **Data Parsing:** PapaParse (for handling massive, local `movies.csv` databases dynamically)
- **Styling:** Vanilla CSS (Glassmorphism design, CSS variables, CSS grid/flexbox)
- **Icons:** Lucide React

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- NPM or regular package manager

### 2. Clone and Install
Clone the repository and install all dependencies:
```bash
git clone https://github.com/Achu80/Movie-Recommendation-.git
cd Movie-Recommendation-
npm install
```

### 3. Environment Variables (API Key)
To enable real movie poster fetching, you need a free API Key from [TMDB](https://www.themoviedb.org/). 
Create a file named `.env` in the root directory and add your key:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```
*(If you don't provide an API key, the app gracefully falls back to dynamic colored thumbnails!)*

### 4. Data Source
Ensure you have the `movies.csv` dataset placed inside the `public/` directory. The application parses this asynchronously when you load the app.

### 5. Run the Application!
Start the local Vite development server:
```bash
npm run dev
```
Open your browser to `http://localhost:5173/` and enjoy!

## 🤝 Contributing
Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and free to use.
