import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';



const FiltreFilms = ({ handleFilter, categories }) => {
    return (
        <Form>
            <Form.Group inline>
            <h1>Filtrer </h1>
            {
                categories.map((i, index) =>
                    <Form.Field defaultChecked control={Checkbox} value={i} label={i} onChange={handleFilter} key={'i' + index} >}</Form.Field>
                )
            }
        </Form.Group>
        </Form>
        
    );
}

export default FiltreFilms;