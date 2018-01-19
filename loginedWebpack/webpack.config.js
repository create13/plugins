module.exports = {
	entry:'./js/index.js',   //接入文件
	output:{
		path:__dirname+'/dist/',  //输出路径
		filename:'bundle.js'  //输出文件的js
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
				//加载css、style
			},
			{
				test: /\.(jpg|png|gif|svg|jpeg)$/,
				loader: 'url-loader?name=images/[hash:8].[name].[ext]',	
				//加载图片 并将文件名转码
			},
			{
        		test: /\.html$/,
        		loader: 'file-loader?name=[path][hash:8][name].[ext]!extract-loader!html-loader'
        		//html-loader 将解析 URL，并请求图片和你所期望的一切资源。
        		//extract-loader 会将 javascript 解析为合适的 html 文件，确保引用的图片指向正确的路径。
        		//file-loader 将结果写入 .html 文件。
      		}
		]
	}
}
