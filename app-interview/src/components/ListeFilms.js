import React from 'react';
import Film from './Film';
import { Card } from 'semantic-ui-react';



const ListeFilms = ({ films, deletedMovie, likeMovie, dislikeMovie }) => {
    return (
        <Card.Group doubling itemsPerRow={3} stackable >
                
            {
                films.map((i, index) =>
                    <Film center key={'i' + index} {...i} deleteMovie={deletedMovie} likeMovie={likeMovie} dislikeMovie={dislikeMovie}>}</Film>
                )
            }
        </Card.Group>
    );
};

export default ListeFilms;
