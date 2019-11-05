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
  affichagePage = this.affichagePage.bind(this);
  handlePageChange = this.handlePageChange.bind(this);

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      await movies.then(
        value => {
          this.setState({
            data: value,
            filtre: this.affichagePage(value),
            isLoading: false,
            categories: this.makeCategories(value),
            checked: this.makeCategories(value),
            nbPages: this.countPages(value)
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
    return Math.ceil(data.length / this.state.nbItems);
  }

  affichagePage(data){
    const indexOfLastItem = this.state.currentPage * this.state.nbItems;
    const indexOfFirstItem = indexOfLastItem - this.state.nbItems;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems;
  }

  deletedMovie(event) {
    let data = this.state.data;
    const index = event.currentTarget.name;
    let indexOfMovie = data.findIndex(i => i.id === index);
    data.splice(indexOfMovie, 1);
    this.setState({
      data: data,
      categories: this.makeCategories(data),
      nbPages: this.countPages(data)
    });
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
    const sort = this.state.data.filter(movie =>
      this.state.checked.includes(movie.category)
    );
    this.setState({
      checked: data,
      filter: sort,
      nbPages: this.countPages(sort)
    });
  }

  handleAffichage(event, { value }) {
    const val = value;
    this.setState({ nbItems: val }, function() {
      this.setState({ nbPages: this.countPages(this.state.filtre) });
    });
  }

  handlePageChange(event, { activePage }) {
    const val = activePage;
    this.setState({ currentPage: val });
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
      currentPage,
    } = this.state;

    const filtre = this.affichagePage(data.filter(movie => checked.includes(movie.category)));

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
          <PaginationDiv nbPages={nbPages} currentPage={currentPage} handlePageChange={this.handlePageChange} />
        </Item>
      </div>
    );
  }
}

export default Home;
