import React from "react";
import { Form, Checkbox, Segment } from "semantic-ui-react";

const FiltreFilms = ({ handleFiltre, categories }) => {
  return (
      <Segment compact>
        <Form>
          <Form.Group inline>
            <label>Catégories :</label>
            {categories.map((i, index) => (
              <Form.Field
                defaultChecked
                control={Checkbox}
                className="checkbox-filtre"
                value={i}
                label={i}
                onChange={handleFiltre}
                key={"id" + index}
              />
            ))}
          </Form.Group>
        </Form>
      </Segment>
  );
};

export default FiltreFilms;
