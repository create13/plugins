module.exports = {
	entry:'./js/index.js',
	output:{
		path:__dirname+'/dist/',
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'

			},
			{
				test: /\.(jpg|png|gif|svg|jpeg)$/,
				/*loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',*/
				loader: 'url-loader?name=images/[name].[ext]',
				//options:{
					/*outputPath:'../'*/
				//	publicPath:'/'
				//}

					
				
			},
		//	{
				/*test: /\.(jpg|png|gif|svg)$/,*/
		//		test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				/*loader: 'file-loader?limit=8192&name=images/[hash:8].[name].[ext]',*/
		//		loader: 'file-loader?name=images/[name].[ext]',
				
		//		options:{
					/*outputPath:'../'*/
		//			publicPath:'/'
		//		}
				
		//	},
			{
        		test: /\.html$/,
        		loader: 'file-loader?name=[path][hash:8][name].[ext]!extract-loader!html-loader'
        		/*loader: "html-loader"*/
      		}
		]
	}
}
