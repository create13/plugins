<template>
  <div>
      <x-header class="project_header" style="background-color:#fff;"><span class="themeTitle themeColor">项目首页</span></x-header>
      <grid :cols="4">
        <grid-item link="#">
          <img slot="icon" src="../assets/images/xiangmugailan.png">
          <span slot="label" class="secondTitle">项目概览</span>
        </grid-item>
        <grid-item :link="{ path: '#'}">
          <img slot="icon" src="../assets/images/shigongjindu.png">
          <span slot="label" class="secondTitle">施工进度</span>
        </grid-item>
        <grid-item link="#" @on-item-click="">
          <img slot="icon" src="../assets/images/ziliaochakan.png">
          <span slot="label" class="secondTitle">重大危险源</span>
        </grid-item>
        <grid-item link="#">
          <img slot="icon" src="../assets/images/ziliaochakan.png">
          <span slot="label" class="secondTitle">施组方案</span>
        </grid-item>
        <grid-item :link="{ path: 'initiateIssue'}">
          <img slot="icon" src="../assets/images/ziliaochakan.png">
          <span slot="label" class="secondTitle">发起整改单</span>
        </grid-item>
        <grid-item :link="{ path: 'dealWithList'}">
          <img slot="icon" src="../assets/images/ziliaochakan.png">
          <span slot="label" class="secondTitle">整改单处理</span>
        </grid-item>
        <grid-item link="#" @on-item-click="">
          <img slot="icon" src="../assets/images/ziliaochakan.png">
          <span slot="label" class="secondTitle">资料查看</span>
        </grid-item>
        <grid-item link="#" @on-item-click="">
          <img slot="icon" src="../assets/images/moreandmore.png">
          <span slot="label" class="secondTitle">更多</span>
        </grid-item>
      </grid>
      <p class="line"></p>
      <group class="list_top">
        <cell
          title="工作列表"
          is-link
          :border-intent="false"
          :arrow-direction="showContent001 ? 'up' : 'down'"
          @click.native="showContent001 = !showContent001">
          <x-icon slot="icon" type="navicon" size="30" style="fill:#000;position:relative;top:2px;"></x-icon>
        </cell>
        <template v-if="showContent001">
          <group-title class="line_gray"> 2018.01.24 星期三 </group-title>
          <cell  title="质量问题" :border-intent="false" class="sub-item" is-link>
              <img class="icon_css" src="../assets/images/zhiliangwentiicon.png" alt="icon" slot="icon">
          </cell>
          <cell title="安全问题" class="sub-item" is-link>
              <img class="icon_css"  src="../assets/images/anquanwentiicon.png" alt="icon" slot="icon">
          </cell>
          <cell title="查看整改单" class="sub-item" is-link>
              <img class="icon_css"  src="../assets/images/chakanzhenggaidanicon.png" alt="icon" slot="icon">
          </cell>
        </template>
      </group>
      <tabbar>
        <tabbar-item @on-item-click="">
          <img slot="icon" src="../assets/images/home.png">
          <img slot="icon-active" src="../assets/images/homeh.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item @on-item-click="">
          <img slot="icon" src="../assets/images/massage.png">
          <img slot="icon-active" src="../assets/images/massageh.png">
          <span slot="label" badge="2">消息</span>
        </tabbar-item>
        <tabbar-item icon-class="xinjianIcon" @on-item-click="">
          <img slot="icon" src="../assets/images/add.png">
        </tabbar-item>
        <tabbar-item @on-item-click="">
          <img slot="icon" src="../assets/images/vr.png">
          <img slot="icon-active" src="../assets/images/vrh.png">
          <span slot="label">VR助手</span>
        </tabbar-item>
        <tabbar-item show-dot @on-item-click="">
          <img slot="icon" src="../assets/images/mine.png">
          <img slot="icon-active" src="../assets/images/mineh.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false,
        showContent001: false
      }
    },
    mounted () {
    }
  }
</script>
<style>
  @font-face {
    font-family: PingFang;
    src:url("../assets/font/PingFangFont/PingFangRegular.ttf");
  }
  *{
    padding: 0;
    margin: 0;
    font-family: PingFang;
    text-decoration: none;
  }
  .themeColor{
    color:#D05354;
  }
  .themeTitle{
    font-weight: 600;
  }
  .xinjianIcon{
    width: 40px!important;
    height: 40px!important;
  }
  .line_gray{
    background-color: #ececec;
    color: #999;
    margin-top: 0!important;
    margin-bottom: 0!important;
  }
  .line{
    width: 100%;
    height: 5px;
    background-color: #ececec;
  }
  .icon_css{
    width: 20px;
    height: 20px;
    position: relative;
    top:4px;
    margin-right: 5px;
  }

  .project_header .vux-header-left .vux-header-back , .project_header .vux-header-right a{
    color:#D05354!important;
    font-weight: 600;
   }
  .project_header .vux-header-left .left-arrow:before{
      border:1px solid #D05354!important;
      border-width: 1px 0 0 1px!important;
  }
  .list_top .weui-cells, .list_top .vux-no-group-title{
        margin-top: 0;
  }
  /*覆盖原有样式*/
  .weui-cells{
    font-size: 16px!important;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #D05354!important;
  }
  .vux-header .vux-header-left, .vux-header .vux-header-right{
    font-size: 16px!important;
  }
  .secondTitle{
    font-size: 16px;
  }
</style>
