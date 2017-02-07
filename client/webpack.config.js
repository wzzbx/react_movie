const path = require('path');


module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/src/components/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [
        {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    },
      
      {
      test: /\.jsx?$/,
      include: [path.join(__dirname, '/src/components'),path.join(__dirname, '/src/auth')],
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ["react", "es2015"],
        plugins: ["transform-class-properties","transform-runtime"]
      }
    }, 
    
    
     {
        test: /\.(eot|ttf|wav|mp3|woff2|woff|svg)$/,
        loader: 'file-loader',
      },
       {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      }]
 
     
 
},  postcss: () => {
    return [
      require('precss'),
      require('autoprefixer')
    ];
  }  
}