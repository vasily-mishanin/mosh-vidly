import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Table from "./common/table";

class MoviesTable extends Component {
  // path means how to get to exact property value inside movies
  // each column is an object which contains a path to certain property of movie object
  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      path: "liked",
      key: "like",
      content: (movie) => (
        <Like movie={movie} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
