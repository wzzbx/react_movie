const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configDB = require('./config/database');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


// mongoose.connect(configDB.url);
uri = 'mongodb://nbrajnov84:sorrow12345@ds145669.mlab.com:45669/moviesdatabase';
mongoose.connect(uri);

const app = express();
app.use(cors());


const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)


app.use(webpackDevMiddleware(compiler, {
noInfo: true,
publicPath: config.output.path
}))
 



app.use(express.static('./client'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());



require('./config/passport')(passport);

// require('./middleware/auth-check'); app.use('/api', authCheckMiddleware);


const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port + ' or http://127.0.0.1:' + port);
});
