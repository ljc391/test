var express = require("express");
var app = express();
var nunjucks = require('nunjucks');
var routes = require('./routes');
var routesUsers = require('./routes/users');
var routesPosts = require('./routes/posts')
var models = require('./models');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
var env = nunjucks.configure('views', { noCache: true });



app.use('/', routes);
app.use('/users', routesUsers);
app.use('/posts', routesPosts)
app.use(function(err, req, res, next){
    var status = err.status||500;
    console.log("error status"+ status);
})


models.User.sync({})
.then(function(){
    models.Post.sync({});
})
.then(function(){
    app.listen(3000,function(){
     console.log('Server is listening on port 3000!');
    });
});
