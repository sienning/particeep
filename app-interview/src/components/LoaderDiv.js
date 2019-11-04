import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import '../LoaderDiv.css';
import 'semantic-ui-css/semantic.min.css';

import React from 'react';

const LoaderDiv = () => (
    <Segment inverted>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>
  )
  
export default LoaderDiv;