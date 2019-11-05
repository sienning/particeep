import React from 'react';
import { Form, Checkbox, Segment } from 'semantic-ui-react';



const FiltreFilms = ({ handleFilter, categories }) => {
    return (
        <Segment compact>
            <Form>
                <Form.Group inline>
                    <label>Catégories :</label>
                    {
                        categories.map((i, index) =>
                            <Form.Field defaultChecked control={Checkbox} className="checkbox-filtre" value={i} label={i} onChange={handleFilter} key={'id' + index} ></Form.Field>
                        )
                    }
                </Form.Group>
            </Form>
        </Segment>
    );
}

export default FiltreFilms;