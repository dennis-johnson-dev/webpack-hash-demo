import './styles/styleB';
import './styles/styleC';

import _ from 'lodash';
import moment from 'moment';

function hai() {
  return moment().toISOString();
}

console.log('here in page B', hai());
