<template>
    <div class="page-body party-information">
        <x-header>
            党员信息
        </x-header>
        <flexbox orient="vertical" align="initial">
            <view-box>
                <div class="header">
                    <div class="group-name">
                        {{departmentname}}
                    </div>
                    <flexbox :gutter="0">
                        <flexbox-item>支部人数:{{person}}人</flexbox-item>
                    </flexbox>
                </div>
                <div class="points-table">
                    <flexbox :gutter="0" class="colors">
                        <flexbox-item>姓名</flexbox-item>
                        <flexbox-item>性别</flexbox-item>
                        <flexbox-item>年龄</flexbox-item>
                        <flexbox-item>积分</flexbox-item>
                    </flexbox>
                    <flexbox :gutter="0"  v-for="(listinfo,index) in contents" :key="index"   @click.native="sub(listinfo)" class="diffrent">
                        <flexbox-item>{{listinfo.name}}</flexbox-item>
                        <flexbox-item>{{listinfo.sex}}</flexbox-item>
                        <flexbox-item>{{listinfo.age}}</flexbox-item>
                        <flexbox-item>{{listinfo.totalscore || 0.0}}</flexbox-item>
                    </flexbox>
                </div>
            </view-box>
        </flexbox>

    </div>
</template>
<script>
import axios from 'axios'
import { XHeader, Flexbox, FlexboxItem, ViewBox,cookie} from "vux";
export default {
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        ViewBox
    },
    data() {
        return {
            contents: [],
            navName: {},
            years: new Date().getFullYear(),
            select: {infos: '党员信息', acin: false},
            userId: cookie.get('userId'),
            departmentname:'',
            person:0,
            partyBranch:''
        };
    },
    methods: {
        sub(item){

            this.$router.push({
                path: '/party/partyPointDetail',
                name: 'partyPointDetail',
                params: {
                    userid:item.id
                }
            })
            /*this.$router.push({
                path: '/active/detailPack3',
                name: 'detailPack3',
                params:{
                    userId:item.id,
                    departmentid:item.departmentid
                }
            });*/
        },
        infor() {
            axios.get('ppartymember/queryByDepartmentId', {
                    params: {
                        departmentid: this.$store.getters.user.departmentid
                    }
                }).then(res => {
                    this.contents = res.data;
                    this.departmentname = this.contents[0].departmentname;
                }).catch(err => {
                    console.log('fail' + err);
                })

            },
            nav() {
                axios.get('pdepartment/queryById', {
                    params: {
                        departmentid: this.$store.getters.user.departmentid
                    }
                }).then(res => {
                    this.navName = res.data;
                    this.person = res.data.people;
                }).catch(err => {
                    console.log('fail' + err);
                })
            },
            judge(event) {
                if (event === '1') {
                    return event = '男'
                } else {
                    return event = '女'
                }
            }
    },mounted() {
        this.infor();
        this.nav();
        this.judge();
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
