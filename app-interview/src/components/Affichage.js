import React from "react";
import { Dropdown, Segment, Icon } from "semantic-ui-react";

const Affichage = ({ listItems, handleAffichage }) => {
  return (
      <Segment inverted>
        <Icon name="th" size="big"></Icon> {" "}
        <Dropdown inline name={listItems.value} onChange={handleAffichage} key={listItems.value} options={listItems} defaultValue={listItems[2].value}  />
      </Segment>
  );
};

export default Affichage;
