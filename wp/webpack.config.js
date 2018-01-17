module.exports = {
	entry:'./src/js/index.js',
	output:{
		path:__dirname+'/dist',
		filename:'bundle.js'
	},
	module:{
		loaders:[
		{
			test:/\.css$/,
			loader:'style-loader!css-loader'
		},
		{test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']}/*解析图片*/
		]
	},
/*	devServer:{
		port:8081
	}*/
}
