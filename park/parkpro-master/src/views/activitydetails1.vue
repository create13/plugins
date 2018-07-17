<template>
  <div>
    <dlbheader :header-title="headerTitle"></dlbheader>
   <dlbmain :phototitle="phototitle" :data="data" :photocontent="photocontent"></dlbmain>

    <dlbmain :phototitle="phototitle" :data="data" :photocontent="photocontent"></dlbmain>

  </div>
</template>

<script>
  import { Cell,Group,Previewer, TransferDom } from 'vux'
  import header from '../components/layout/header.vue'
  import photomain from '../components/layout/photomain.vue'
  export default {
    directives: {
      TransferDom,

    },
    components: {
      Previewer,
      Cell,Group,
      "dlbheader":header,
      "dlbmain":photomain
    },
    methods: {
      logIndexChange (arg) {
        console.log(arg)
      },
      show (index) {
        this.$refs.previewer.show(index)
      }
    },
    data () {
      return {
        headerTitle:'历史参与活动',
        phototitle:'汇丰银行一支部',
        data:'3月2日',
        photocontent:'这个活动非常有意义',



      }
    }
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
