import React from 'react';
import { Card, Progress, Button, Icon, Label } from 'semantic-ui-react';
import '../Film.css'

const Film = ({ id, title, category, likes, dislikes, deleteMovie, likeMovie, dislikeMovie }) => {
    return (
        <Card className="film-card">
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>{category}</Card.Meta>
                <Card.Description>
                    <Progress percent={100 * likes / (likes + dislikes)} color='green' size='small'></Progress>
                </Card.Description>

                <Button as='div' labelPosition='right' id={id} onClick={likeMovie}>
                    <Button color='green'>
                        <Icon name='thumbs up' />
                    </Button>
                    <Label as='a' basic color='green' pointing='left'>
                        {likes}
                    </Label>
                </Button>
                
                <Button as='div' labelPosition='right' id={id} onClick={dislikeMovie}>
                    <Button color='red'>
                        <Icon name='thumbs down' />
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        {dislikes}
                    </Label>
                </Button>

                <Button floated='right' onClick={deleteMovie} name={id}>Delete</Button>
            </Card.Content>
        </Card>



    );
}

export default Film;