<template>
  <div>
      <dlbheader></dlbheader>
      <div class="main">
      <div class="avatar">
          <div class="img1">
          <img src="../../src/assets/images/icon-head.png">
          </div>
          <div class="point1">
            <span class="title1">积分周期：</span>
            <span class="pointdata1" >{{pointdata}}</span>
          </div>

      </div>
      <div class="card">
        <div class="card1">
          <span class="card1name">{{card1name}}</span>
          <span class="card1point">{{card1point}}</span>
        </div>
        <div class="card2">
          <span class="card2name">{{card2name}}</span>
          <span class="card2point">{{card2point}}</span>
        </div>
      </div>
      <div class="table1" style="overflow: scroll">
        <tab>
          <tab-item selected @on-item-click="onItemClick1()">积分进度</tab-item>
          <tab-item @on-item-click="onItemClick1()">获取明细</tab-item>
        </tab>
        <div v-show="table1">
          <mt-cell title="标题文字"></mt-cell>
          <mt-progress :value="20" :bar-height="20"></mt-progress>
        </div>
        <div v-show="table2">
          <mt-field label="获取时间" :placeholder="time"	readonly="ture" ></mt-field>
          <mt-field label="积分类型" :placeholder="content"	readonly="ture"></mt-field>
          <mt-field label="审核人" :placeholder="people" readonly="ture"></mt-field>
          <mt-field label="积分变动" :placeholder="point" readonly="ture"></mt-field>

        </div>
        </div>









      </div>
    <dlbfooter></dlbfooter>
  </div>


</template>
<script>
  import { Tab,CellBox ,XProgress, Box, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import header from '../components/layout/header.vue'
  import footer from '../components/layout/footer.vue'
export default {
	data(){
		return {
		  pointdata:"2018年1月1日-12月31日",
      card1name:"现党员积分",
      card1point:"22",
      card2name:"年度党员评分",
      card2point:"暂无",
      time:'2018.05.26',
      content:'党费',
      people:'people',
      point:'+5分',
      table1:'',
      table2:'true'







      }

		}
	,
	components:{
   'dlbheader':header,
    'dlbfooter':footer,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem


	},methods:{
    onItemClick1(){
      this.table1=!this.table1;
      this.table2=!this.table2;

    }
  }
  }

</script>
<style scoped>

  .main .avatar { margin-left: 0.2rem;display: inline-block}
  .main .avatar .img1 {width: 1rem;float: left}
  .main .avatar .point1{width:4rem; }
  .main .avatar .point1 span{display: block;}
  .main .avatar .point1 .title1 {font-size: 0.2rem ;color: #888888;margin-top: 0.2rem}
  .main .avatar .point1 .pointdata1 {font-size: 0.2rem;margin-top: 0.3rem}
  .main .card {display: inline-block}
  .main .card .card1{background-color:#F6F6F6 ;margin-left: 0.2rem;float: left;text-align: center}
  .main .card .card2{background-color:#F6F6F6;margin-left: 0.3rem;float: left;text-align: center}
  .main .card .card1 .card1name{display:block;width: 1.5rem;font-size: 0.25rem}
  .main .card .card1 .card1point{display:block;width: 1.5rem;font-size: 0.4rem;color: #FA7A00}
  .main .card .card2 .card2name{display:block;width: 1.5rem;font-size: 0.25rem}
  .main .card .card2 .card2point{display:block;width: 1.5rem;font-size: 0.4rem;color: #FA7A00}
  .main .table1{}
</style>
