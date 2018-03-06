<template>
  <div class="map" id="container">
  
  </div>
</template>

<script>
import bikeLogo from '../assets/bike.png'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods:{
  		// 编写自定义函数,创建标注
	addMarker(map,point){
		var myIcon = new BMap.Icon(bikeLogo,new BMap.Size(32,32),{
			anchor: new BMap.Size(10,25)
		});
		//创建标注对象并添加到地图
		var marker = new BMap.Marker(point,{icon:myIcon});
		map.addOverlay(marker);
	}
  },
  mounted() {
  	var map = new BMap.Map("container");  //创建地图实例
		var point = new BMap.Point(116.404, 39.915); //创建点坐标
		map.enableScrollWheelZoom(true);
  	//定位
  	var self = this;
		var geolocation = new BMap.Geolocation();
		
		
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			/*alert('您的位置：'+r.point.lng+','+r.point.lat);*/
			point = new BMap.Point(r.point.lng, r.point.lat);
		}
		else {
			alert('failed'+this.getStatus());
		}
		//初始化地图，设置中心点坐标和地图级别
			map.centerAndZoom(point, 16);
		//取得数据
		fetch('/api/broken-bikes?lat='+r.point.lat+'&lng='+r.point.lng).then( res => {
			return res.json();
		}).then( json => {
			for(var i=0;i<json.length;i++){
				var point1 = new BMap.Point(json[i].lng, json[i].lat);
				self.addMarker(map,point1);
			}


		})
	},{enableHighAccuracy: true})
  }
}
</script>
<style>
html,body{
	height:100%;
}
#container{
	width:100%;
	height:800px;
}
.BMap_Marker img{width:100%;}
</style>
