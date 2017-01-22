import './styles/styleB';
import './styles/styleC';

import moment from 'moment';

function hai() {
  return moment().toISOString();
}

console.log('here in page B', hai());
