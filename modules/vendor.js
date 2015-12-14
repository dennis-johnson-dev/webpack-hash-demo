require.ensure(['./c.js'], function(require) {
    var moduleB = ('./c.js');
    console.log('c has loaded');
}, 'mobulec');

module.exports = 'yolou';
