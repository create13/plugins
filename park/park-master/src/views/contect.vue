<template>
    <div class="page-body"> 
        <x-header>联系工作人员</x-header>
        <div class="contect">
            <div class="contectMain">
                <div class="top-content">
                    <span>管理者</span>
                    <p>陆家嘴金领驿站超级管理员</p>
                    <div class="bottom">
                        <span>联系方式</span>
                        <!-- <span>QQ：123456789</span> -->
                        <span>电话：021-58562559</span>
                    </div>
                </div>
            </div>
            <div class="title">
                <div class="attention">
                    <p>金领驿站工作时间：9:00-16:00</p>
                </div>
            </div>
        </div>

        <div class="contect" style="padding-top: 0rem;">
            <div class="contectMain">
                <div class="top-content">
                    <span>开发者</span>
                    <p>上海市东链博数据科技有限公司</p>
                    <div class="bottom">
                        <span>联系方式</span>
                        <!-- <span>QQ：123456789</span> -->
                        <span>电话：021-58562559</span>
                    </div>
                </div>
            </div>
            <div class="title">
                <div class="attention">
                    <p>东链博工作时间：10:00-18:00</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 import { XHeader} from 'vux';
 export default {
    components: {
        XHeader
    }
 }
</script>
<style lang="less" scoped>
.contect{
    padding:.2rem;
    .contectMain{
        display: block;
        width: 100%;
        // height: ;
        font-size: .14rem;
        padding: .2rem;
        margin-top: .1rem;
        margin-bottom: .1rem;
        outline: 0;
        background-color: transparent;
        box-sizing: border-box;
        box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.1);
        color: #999;
        border:0;
        border-radius: .04rem;
        span{
            display: block;
            font-size:.14rem;
            font-family:PingFangSC-Medium;
            color:rgba(153,153,153,1);
            margin-top:.1rem;
        }
        p{
            margin-top: .2rem;
            font-size:.2rem;
            font-family:PingFangSC-Medium;
            color:rgba(102,102,102,1);
        }
        .bottom{
            margin-top: .35rem;
        }
    }
    .title{
        font-size: .12rem;
        color: #ccc;
    }
}

</style>
