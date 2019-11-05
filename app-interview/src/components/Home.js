import React, { Component } from "react";
// import Filtre from './Filtre';
import { Container } from "semantic-ui-react";
import ListeFilms from "./ListeFilms";
import "../Home.css";
import { movies$ as movies } from "../movies.js";
import LoaderDiv from "./LoaderDiv";
import FiltreFilms from "./FiltreFilms";

class Home extends Component {
  state = {
    data: [],
    isLoading: true,
    categories: [],
    checked: []
  };

  makeCategories(data) {
    const newData = [];
    data.map((i, index) => {
      if (!newData.includes(i.category)) {
        newData.push(i.category);
        return true;
      } else return false;
    });
    return newData;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      await movies.then(
        value => {
          this.setState({
            data: value,
            isLoading: false,
            categories: this.makeCategories(value),
            checked: this.makeCategories(value),
          });
        },
        raison => {
          console.log(raison); // Erreur !
        }
      );
    } catch (err) {
      this.setState({ isLoading: true });
      console.log(err.msg);
      throw err;
    }
  }

  deletedMovie = this.deletedMovie.bind(this);
  likeMovie = this.likeMovie.bind(this);
  dislikeMovie = this.dislikeMovie.bind(this);
  handleFilter = this.handleFilter.bind(this);

  deletedMovie(event) {
    let data = this.state.data;
    const index = event.currentTarget.name;
    let indexOfMovie = data.findIndex(i => i.id === index);

    data.splice(indexOfMovie, 1);

    this.setState({ data: data, categories: this.makeCategories(data) });
  }

  likeMovie(event) {
    let data = this.state.data;
    const index = event.currentTarget.id;

    let indexOfMovie = data.findIndex(i => i.id === index);
    data[indexOfMovie]["likes"]++;

    this.setState({ data: data });
  }

  dislikeMovie(event) {
    let data = this.state.data;
    const index = event.currentTarget.id;

    let indexOfMovie = data.findIndex(i => i.id === index);
    data[indexOfMovie]["dislikes"]++;

    this.setState({ data: data });
  }

  handleFilter(event) {
    let data = this.state.checked;
    let cat = event.target.innerHTML;

    if (data.includes(cat)) {
      let indexOfCategory = data.findIndex(i => i === cat);
      data.splice(indexOfCategory, 1);
    } else {
      data.push(cat);
    }
    this.setState({ checked: data });
  }

  render() {
    const { data, isLoading, categories, checked } = this.state;

    return (
      <Container>
        <h1>CinemApp</h1>
        {isLoading ? (
          <LoaderDiv></LoaderDiv>
        ) : (
          console.log(checked)
        )}
        {isLoading ? (
          <LoaderDiv></LoaderDiv>
        ) : (
          <FiltreFilms
            handleFilter={this.handleFilter}
            categories={categories}
          ></FiltreFilms>
        )}
        {isLoading ? (
          <LoaderDiv></LoaderDiv>
        ) : (
          <ListeFilms
            films={data}
            deletedMovie={this.deletedMovie}
            likeMovie={this.likeMovie}
            dislikeMovie={this.dislikeMovie}
          />
        )}
      </Container>
    );
  }
}

export default Home;
