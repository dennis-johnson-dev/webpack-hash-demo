require.ensure(['./modules/a.js'], function(require) {
    var moduleB = ('./modules/a.js');
    console.log('a has loaded')
}, 'mobule-a');

require.ensure(['./modules/b.js'], function(require) {
    var moduleB = ('./modules/b.js');
    console.log('b has loaded');
}, 'mobule-b');

module.exports = 'yo dawg';
