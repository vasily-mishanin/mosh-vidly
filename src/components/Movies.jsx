import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import Pagination from "./Pagination";
import { paginate } from "../utilities/pagination.js";
import ListGroup from "./ListGroup";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    currentGenre: null,
    searchQuery: "",
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  // Just to See Lifecycle HOOKS
  constructor() {
    super();
    console.log("Construction..");
  }
  //MOUNTING and setting the State
  componentDidMount() {
    console.log("Movies - Mounted");
    let genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      currentGenre: genres[0],
    });
  }
  componentDidUpdate() {
    console.log("Movies-Updated");
  }
  componentWillUnmount() {
    console.log("Movies-Unmounted");
  }

  // handeling events
  handleDelete = (movieToDelete) => {
    const updatedMovies = this.state.movies.filter(function (movie) {
      return movie._id !== movieToDelete._id;
    });
    this.setState({
      movies: updatedMovies,
    });
  };

  handleLike = (likedMovie) => {
    let newMovies = [...this.state.movies];
    let index = newMovies.indexOf(likedMovie);
    newMovies[index].liked = !newMovies[index].liked; // !undefined = true, !true = false
    this.setState({
      movies: newMovies,
    });
  };

  // arrow => functions are not rebind "this"
  handlePageChange = (page) => {
    console.log(page);
    this.setState({
      currentPage: page,
    });
  };

  handleGenreChange = (genre) => {
    //alert(genre.name);
    this.setState({
      searchQuery: "",
      currentGenre: genre,
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  //Filtering->Sorting->Paginating
  getPagedData = () => {
    const {
      movies: allMovies,
      currentGenre,
      searchQuery,
      currentPage,
      sortColumn,
      pageSize,
    } = this.state;
    console.log(allMovies.length);
    //FILTERING
    //if it is no query, genre and genre._id  then all movies
    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currentGenre && currentGenre._id) {
      filteredMovies = allMovies.filter(
        (movie) => movie.genre._id === currentGenre._id
      );
    }
    console.log(filteredMovies.length);

    //SORTING
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    console.log(sortedMovies.length);

    //PAGINATION of movies TO SHOW on current page
    const movies = paginate(sortedMovies, currentPage, pageSize);
    console.log(movies.length);
    return { movies, count: filteredMovies.length };
  };

  //RENDER (each time when the state is changing)
  render() {
    //alert(this.state.currentGenre);
    console.log("Movies-Rendered");
    //destructuring of "state" object
    let { length: count } = this.state.movies; // count = [movies].length (movies=[]={,,,,length:,})
    const {
      genres: allGenres,
      pageSize,
      currentPage,
      currentGenre,
      searchQuery,
      sortColumn,
    } = this.state;
    //console.log(movies);
    // if there is no movies
    if (count === 0) return <h3> There is no movies in database </h3>;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={allGenres}
              selectedItem={currentGenre}
              onItemChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary btn-lg btn-new-movie">
              New Movie
            </Link>

            <h3>
              Showing <strong> {this.getPagedData().count} </strong> movies from
              the database
            </h3>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <MoviesTable
              movies={this.getPagedData().movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={this.getPagedData().count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
