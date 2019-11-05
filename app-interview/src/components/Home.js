import React, { Component } from "react";
import { Container, Item, Divider } from "semantic-ui-react";
import ListeFilms from "./ListeFilms";
import "../Home.css";
import { movies$ as movies } from "../movies.js";
import LoaderDiv from "./LoaderDiv";
import FiltreFilms from "./FiltreFilms";
import PaginationDiv from "./PaginationDiv";
import Affichage from "./Affichage";

class Home extends Component {
  state = {
    data: [],
    filtre: [],
    isLoading: true,
    categories: [],
    checked: [],
    currentPage: 1,
    nbPages: 0,
    nbItems: 12,
    options: [
      {
        key: 4,
        text: "4",
        value: 4,
        content: "4"
      },
      {
        key: 8,
        text: "8",
        value: 8,
        content: "8"
      },
      {
        key: 12,
        text: "12",
        value: 12,
        content: "12"
      }
    ]
  };

  makeCategories = this.makeCategories.bind(this);
  countPages = this.countPages.bind(this);
  deletedMovie = this.deletedMovie.bind(this);
  likeMovie = this.likeMovie.bind(this);
  dislikeMovie = this.dislikeMovie.bind(this);
  handleFiltre = this.handleFiltre.bind(this);
  handleAffichage = this.handleAffichage.bind(this);

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      await movies.then(
        value => {
          this.setState({
            data: value,
            filtre: value,
            isLoading: false,
            categories: this.makeCategories(value),
            checked: this.makeCategories(value),
            nbPages : this.countPages(value),
          });
        },
        raison => {
          console.log(raison);
        }
      );
    } catch (err) {
      this.setState({ isLoading: true });
      console.log(err.msg);
      throw err;
    }
  }

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

  countPages(data) {
      console.log("countPages")
      console.log(Math.ceil(data.length/this.state.nbItems))
    return Math.ceil(data.length/this.state.nbItems);
  }
  

  deletedMovie(event) {
    let data = this.state.data;
    const index = event.currentTarget.name;
    let indexOfMovie = data.findIndex(i => i.id === index);
    data.splice(indexOfMovie, 1);
    this.setState({ data: data, categories: this.makeCategories(data), nbPages: this.countPages(data) });
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

  handleFiltre(event) {
    let data = this.state.checked;
    let cat = event.target.innerHTML;
    if (data.includes(cat)) {
      let indexOfCategory = data.findIndex(i => i === cat);
      data.splice(indexOfCategory, 1);
    } else {
      data.push(cat);
    }
    const sort = this.state.data.filter(movie => this.state.checked.includes(movie.category));
    this.setState({ checked: data, filter: sort, nbPages: this.countPages(sort) });
  }

  handleAffichage(event, { value }) {
    const val = value;
    this.setState({nbItems: val}, function () {
        this.setState({nbPages: this.countPages(this.state.filtre)})
    });
  }

  render() {
    const {
      data,
      isLoading,
      categories,
      checked,
      options,
      nbItems,
      nbPages,
    } = this.state;
    const filtre = data.filter(movie => checked.includes(movie.category));
    return (
      <div className="content-home">
        <Container>
          <h1>CinémApp</h1>
          {isLoading ? (
            <></>
          ) : (
            <FiltreFilms
              handleFiltre={this.handleFiltre}
              categories={categories}
            ></FiltreFilms>
          )}
          <Divider />
          {isLoading ? (
            <LoaderDiv />
          ) : (
            <ListeFilms
              films={filtre}
              deletedMovie={this.deletedMovie}
              likeMovie={this.likeMovie}
              dislikeMovie={this.dislikeMovie}
            />
          )}
        </Container>
        <Item className="footer">
          <Affichage
            listItems={options}
            nbItems={nbItems}
            handleAffichage={this.handleAffichage}
          />
          <PaginationDiv nbPages={nbPages} />
        </Item>
      </div>
    );
  }
}

export default Home;
