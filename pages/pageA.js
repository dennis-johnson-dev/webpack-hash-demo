import './styles/styleA';
import './styles/styleC';

import _ from 'lodash';
import moment from 'moment';

function main() {
  console.log('in main', moment().toISOString());
}

main();

console.log('pageA has loaded');
