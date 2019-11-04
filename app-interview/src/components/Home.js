import React, { Component } from 'react';
// import Filtre from './Filtre';
import { Container } from 'semantic-ui-react';
import ListeFilms from './ListeFilms';
import '../Home.css';
import { movies$ as movies } from '../movies.js';
import LoaderDiv from './LoaderDiv';
import FiltreFilms from './FiltreFilms';


class Home extends Component {
    state = {
        data: [],
        isLoading: true,
        categories: [],
    }

    makeCategories(data){
        const newData = [];
        data.map((i, index) => {
            if(!newData.includes(i.category)){
                newData.push(i.category);
                return true;
            }
            else
                return false;
        });
        console.log(newData);
        return newData;
    }

    async componentDidMount() {
        this.setState({ isLoading: true })

        try {
            await movies.then((value) => {
                
                this.setState({ data: value, isLoading: false, categories: this.makeCategories(value) });
            }, (raison) => {
                console.log(raison); // Erreur !
            });
        }
        catch (err) {
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
        this.setState({ data : data })
    }

    likeMovie(event) {
        let data = this.state.data;
        const index = event.currentTarget.id;
        console.log(index);

        let indexOfMovie = data.findIndex(i => i.id === index);
        data[indexOfMovie]['likes']++;

        this.setState({ data : data })
    }
    
    dislikeMovie(event) {
        let data = this.state.data;
        const index = event.currentTarget.id;
        console.log(index);

        let indexOfMovie = data.findIndex(i => i.id === index);
        data[indexOfMovie]['dislikes']++;

        this.setState({ data : data })
    }

    handleFilter(event){
        console.log("change")
    }


    render() {
        const { data, isLoading, categories } = this.state;

        return (
            <Container>
                <h1>CinemApp</h1>
                {/* {isLoading ? <LoaderDiv></LoaderDiv> : console.log(categories)} */}
                {isLoading ? <LoaderDiv></LoaderDiv> : <FiltreFilms handleFilter={this.handleFilter} categories={categories} ></FiltreFilms>}
                {isLoading ? <LoaderDiv></LoaderDiv> : <ListeFilms films={data} deletedMovie={this.deletedMovie} likeMovie={this.likeMovie} dislikeMovie={this.dislikeMovie}/>}


            </Container>
        );
    }
}

export default Home;