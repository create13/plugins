<template>

  <div class="photomain">
    <div class="photoleft">
      <img style="width:0.5rem;height: 0.5rem;display: block;position: absolute;top:0.5rem;" src="../../../src/assets/images/icon-head.png">
    </div>
    <div class="photoright">
      <p class="title">{{phototitle}}</p>
      <p class="data">{{data}}</p>
      <p class="content">{{photocontent}}</p>
      <div style="width:3rem; display: inline-block;" >
        <img  class="previewer-demo-img" style="margin-right: 0.1rem;border-radius:0.2rem;width:0.75rem;height:0.75rem;" v-for="(item, index) in list" :src="item.src"  @click="show(index)">
        <div v-transfer-dom>
          <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Cell,Group,Previewer, TransferDom } from 'vux'

export default {
  props: [
    'phototitle',
    'data',
    'photocontent'
  ],


	data(){
		return {
      list: [{
        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        w: 800,
        h: 400
      },
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          w: 1200,
          h: 900
        }, {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
        }],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
    }



		}
	},
	components:{
    Previewer,
    Cell,Group,

	},methods: {
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    }
  },
}
</script>
<style scoped>
  .photomain{margin-left: 0.2rem}
  .photomain .photoleft {width:0.5rem;display: inline-block;}
  .photomain .photoright {width:2rem;display: inline-block;margin-left: -0.1rem}
  .photomain .photoright .title{font-size: 0.25rem}
  .photomain .photoright .data{font-size: 0.15rem}
  .photomain .photoright .content{font-size: 0.2rem}

</style>
