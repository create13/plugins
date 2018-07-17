<template>
    <router-view></router-view>
    
</template>

<script>
export default {};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/dlbicon/iconfont.css';
</style>
<style lang="less">
html,
body {
    font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    color: #3c3c3c;
    width:100%;
    height:100%;
    overflow-x:hidden;

}
body {
    font-size: 0.16rem;
}
.vux-header {
        height: .46rem;
        background: linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));
		background: -webkit-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));
        background: -o-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));
        background: -moz-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));
        background: -mos-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));}
input[type=button], input[type=submit], input[type=file], button { cursor: pointer; -webkit-appearance: none;
    .vux-header-left a,
    .vux-header-left button,
    .vux-header-right a,
    .vux-header-right button {
        color: #fff!important;
    }
}
.disabled-tabbar + .weui-tabbar {
    display: none !important;
}
.fixed-tabbar + .weui-tabbar {
    position: fixed !important;
    left:0;
    right:0;
    bottom:0;
}
.vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {
  float: left;
  margin-right: 8px;
  color: #fff!important;
}
.page-body {
    flex: 1;
    overflow: auto;
    background-color: #fff;
}
.vux-header .vux-header-left .left-arrow:before{
    border:1px solid #fff!important;
        border-width: 1px 0 0 1px!important;
}

</style>
