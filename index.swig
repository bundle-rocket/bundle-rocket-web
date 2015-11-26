<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>bundle rocket</title>
    <link rel="stylesheet" href="{{feRoot}}/src/main.styl">
</head>
<body>
<div id="main"></div>
<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-8/esl.js"></script>
<script>
require.config({
    baseUrl: '{{feRoot}}/src',
    paths: {
        'react': '../dep/react/react',
        'react-dom': '../dep/react/react-dom',
        'numen': '../dep/numen/dist',
        'underscore': '../dep/underscore/underscore',
        'melon': '../dep/melon/dist',
        'es6-promise': '../dep/es6-promise/promise',
        'react-motion': '../dep/react-motion/build/react-motion',
        'jshashes': '../dep/jshashes/hashes'
    },
    packages: [{
        name: 'ei',
        location: '../dep/ei/dist',
        main: 'main'
    }],
    waitSeconds: 2
});
require(['main'], function (main) {
    main.init();
});
</script>
</body>
</html>
