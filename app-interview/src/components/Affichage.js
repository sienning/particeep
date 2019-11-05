import React from "react";
import { Dropdown, Segment } from "semantic-ui-react";

const Affichage = ({ nbItems, listItems }) => {
  return (
    <div>
      <Segment inverted floated="left">
        Show me posts by{" "}
        <Dropdown key={listItems.value} inline options={listItems} defaultValue={nbItems} />
      </Segment>
    </div>
  );
};

export default Affichage;
