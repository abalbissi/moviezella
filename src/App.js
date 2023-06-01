import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setpageCount] = useState(0)
  const getAllMovie = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=5bdb980a1b1ffa25a192d782abaa874e&language=ar"
    );
    setMovies(res.data.results);
    setpageCount(res.data.total_pages)
  };

  //get current page
  const getPage = async (page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5bdb980a1b1ffa25a192d782abaa874e&language=ar&page=${page}`)
    setMovies(res.data.results)
    setpageCount(res.data.total_pages)

  }

  useEffect(() => {
    getAllMovie();
    console.log(movies);
  }, []);

  const search = async (word) => {
    if (word === "") {
      getAllMovie();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5bdb980a1b1ffa25a192d782abaa874e&query=${word}&language=ar`
      );
      setMovies(res.data.results);
      setpageCount(res.data.total_pages)
    }
  };

  return (
    <div className="font color-body ">
      <NavBar search={search}/>
      <Container>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />} />

            <Route path="/movie/:id" element={<MovieDetails />} />

          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
