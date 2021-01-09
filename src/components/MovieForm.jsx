import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Number in Stock"),
  };

  //populate form
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id; //read it from props of Route wrapper (wraps MovieForm)
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.replace("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text", true)}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {/* validate() => if no errors => disabled=(null) i.e. false, else disabled={errors} i.e. true */}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
