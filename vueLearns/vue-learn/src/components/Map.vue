<template>
  <div class="map" id="container">
  
  </div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
    }
  },
  mounted() {
  	var map = new BMap.Map("container");
		// 创建地图实例  
		var point = new BMap.Point(116.404, 39.915);

		//定位
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){ 
		if(this.getStatus() == BMAP_STATUS_SUCCESS){ 
		alert('您的位置：'+r.point.lng+','+r.point.lat);
		point = new BMap.Point(r.point.lng,r.point.lat);
		}
		else {
		alert('failed'+this.getStatus());
		}
		map.centerAndZoom(point, 15);
		// 初始化地图，设置中心点坐标和地图级别  
		}, { enableHighAccuracy:true })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{
	height:100%;
}
</style>
