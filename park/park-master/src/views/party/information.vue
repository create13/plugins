<template>
    <div class="page-body party-information">
        <x-header>
            党员信息
        </x-header>
        <flexbox orient="vertical" align="initial">
            <view-box>
                <div class="header">
                    <div class="group-name">
                        <!-- 啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦 -->
                        {{departmentname}}
                    </div>
                    <flexbox :gutter="0">
                        <flexbox-item>支部书记:{{partyBranch}}</flexbox-item>
                        <flexbox-item>支部人数:{{people}}人</flexbox-item>
                    </flexbox>
                </div>
                <div class="points-table">
                    <flexbox :gutter="0" class="colors">
                        <flexbox-item>姓名</flexbox-item>
                        <flexbox-item>性别</flexbox-item>
                        <flexbox-item>年龄</flexbox-item>
                        <flexbox-item>积分</flexbox-item>
                    </flexbox>
                    <flexbox :gutter="0"  v-for="(item,index) in total" :key="index"   @click.native="submit(item)" class="diffrent">
                        <flexbox-item>{{item.name}}</flexbox-item>
                        <flexbox-item>{{item.sex}}</flexbox-item>
                        <flexbox-item>{{item.age}}</flexbox-item>
                        <flexbox-item>{{item.totalscore||0.0}}</flexbox-item>
                    </flexbox>
                </div>
            </view-box>
        </flexbox>

    </div>
</template>
<script>
    import axios from 'axios'
import { XHeader, Flexbox, FlexboxItem, ViewBox } from "vux";
export default {
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        ViewBox
    },
    data() {
        return {
            people:'',
            departmentname:'',
            partyBranch:'',
            total:'',
        };
    },
    methods: {
        submit(item){

            this.$router.push({
                path: '/party/partyPointDetail/:userid/:partyBranch',
                name: 'partyPointDetail',

                params: {
                    userid:item.id
                }
            })


        },
        getParams() {

           let departmentId = this.$route.params.departmentid;


            axios({
                method: 'get',
                url: 'pdepartment/queryById',
                params: {
                    departmentid:departmentId
                }


            }) .then((res)=> {
               this.departmentname=res.data.departmentname;
                this.partyBranch=res.data.partyBranch;
                this.people=res.data.people;

            }).catch(function (error) {
                console.log(error);
            })


        },
        getParams1() {

            let departmentId = this.$route.params.departmentid;
            axios({
                method: 'get',
                url: 'ppartymember/queryByDepartmentId',
                params: {
                    departmentid:departmentId
                }

            }) .then((res)=> {
                this.total=res.data

            }).catch(function (error) {
                console.log(error);
            })
        }
    },mounted() {
        this.getParams();
        this.getParams1()
    }


};
</script>
<style lang="less">
.vux-flex-row{
    margin-bottom:.1rem;
}
.page-body.party-information {
    background: #f4f4f4;
    #vux_view_box_body {
        padding: 10px 20px;
        .header {
            box-sizing: border-box;
            border-radius: 5px;
            height: 100px;
            width: 100%;
            margin: 10px 0 20px;
            padding: 10px;
             box-shadow: 0px 3px 8px 6px rgba(0,0,0,0.01);
            background: url(../../assets/images/party-info-bg.jpg) 100% / cover
                no-repeat;
            color: #fff;
            .group-name {
                text-align: center;
                font-size: 16px;
                height: .48rem;
                line-height: .48rem;
                color: #fff;
                font-weight: 600;
                margin-top: .06rem;
            }
            .vux-flexbox {
                .vux-flexbox-item {
                    text-align: center;
                    font-size:.14rem;
                }
            }
        }
        .points-table {
            box-sizing: border-box;
            border-radius: 5px;
            margin: 5px 0 30px;
            padding: 10px;
            font-size:.12rem;
            color: #000;
            background: #fff;
            text-align: center;
             box-shadow: 0px 3px 8px 6px rgba(0,0,0,0.01);
            .vux-flexbox {
                &:first-child {
                    margin-bottom: 10px;
                    color: #cb2f00!important;
                }
                .vux-flexbox-item {
                    text-align: center;
                }
            }
        }
    }
}
.diffrent .vux-flexbox-item:last-child{color:#b93647;}
</style>
