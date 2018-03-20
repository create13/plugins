import Home from './components/home.vue'
import News from './components/news.vue'

export default{
	routes:[
		{
			path:'/home',
			component:Home
		},
		{
			path:'/news',
			component:News
		}
	]
}
