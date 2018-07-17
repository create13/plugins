<template>
    <div class="page-body disabled-tabbar">
        <x-header title="发起活动" @on-click-back="backhome()"></x-header>
        <div class="group-item">
            <group-title slot="title">
                <b>活动开始时间</b>
            </group-title>
            <flexbox :gutter="0">
                <flexbox-item>
                    <input type="text" v-model='startTime' readonly="readonly">
                </flexbox-item>
                <flexbox-item class="input-addon" style="position: relative">
                    <x-button mini type="warn">
                        <i class="iconfont dlb-icon-rili" ></i>
                    </x-button>
                    <group class="date-no-box">
                        <datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm" @on-change="change" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" ></datetime>
                    </group>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="group-item">
            <group-title slot="title">
                <b>活动结束时间</b>
            </group-title>
            <flexbox :gutter="0">
                <flexbox-item>
                    <input type="text"  v-model='endTime' readonly="readonly">
                </flexbox-item>
                <flexbox-item class="input-addon" style="position: relative">
                    <x-button mini type="warn">
                        <i class="iconfont dlb-icon-rili" ></i>
                    </x-button>
                    <group class="date-no-box">
                        <datetime v-model="hot" format="YYYY-MM-DD HH:mm" @on-change="change1" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" ></datetime>
                    </group>
                </flexbox-item>
            </flexbox>
        </div>

        <div class="group-item">
            <group-title slot="title">
                <b>活动类型</b>
            </group-title>
            <flexbox :gutter="0">
                <flexbox-item>
                    <input type="text" :value="activityType" readonly="readonly" >
                </flexbox-item>
                <flexbox-item class="input-addon">
                    <x-button mini type="warn" @click.native="handlePicker()">
                        <i class="iconfont dlb-icon-category" ></i>
                    </x-button>
                    
                    <transition name="fade">
                        <div class="picker-box" v-show="PickerVisible2" @click="PickerVisible2 = false">
                            <picker
                                :data="pickerList"
                                :column-width="[]"
                                :fixed-columns="1"
                                :columns="1"
                                v-model="pickerValue"
                                v-show="PickerVisible2"
                                @on-change="submit1()">·
                            </picker>
                        </div>
                    </transition>
                </flexbox-item>
            </flexbox>
        </div>

        <div class="group-item">
            <group-title slot="title">
                <b>活动名称</b>
            </group-title>
            <input type="text" v-model="activeTitle" maxlength="80">
        </div>
        <div class="group-item">
            <group-title slot="title">
                <b>活动地点</b>
            </group-title>
            <input type="text"  v-model='activePace' maxlength="150">
        </div>
        <div class="group-item">
            <group-title slot="title">
                <b>活动负责人</b>
            </group-title>
            <input type="text"  v-model='activePrincipalPeople' maxlength="20">
        </div>
        <div class="group-item">
            <group-title slot="title">
                <b>活动内容</b>
            </group-title>
            <textarea cols="30" rows="10"  maxlength="300" v-model='activeContext'></textarea>
        </div>
        <!-- <div class="group-item">
            <group-title slot="title">
                <b>添加海报</b>
            </group-title>
            <div class="photo-list cl">
                <ul style="margin-top:-.1rem;">
                    <li v-for="(item,index) in picList.list">
                        <div class="preview">
                            <img style="float:left;width:100%;height:100%;" :key="index" width="100" :src="item"  @touchend="clearLoop" @touchstart="showDeleteButton(index)">
                        </div>
                    </li>
                    <li>
                        <div class="preview addUpload" @click="chooseImage(picList)">
                            <span class="add-bg"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div> -->
        <div class="group-item" style="margin-bottom:0.2rem">
            <group-title slot="title"></group-title>
            <x-button type="warn" @click.native="submit()" style="height:0.4rem !important">
                生成活动二维码
            </x-button>
        </div>
        <div v-transfer-dom class="qrcode-dialog0">
          <x-dialog v-model="showQrcodeDialog" @on-hide="backRoute()" :hide-on-blur="true"  :dialog-style="{height:'350px',minHeight:'350px'}">
               <div class="title">
                    <label>活动名称:</label>
                    <div class="activeTitle">{{activeTitle}}</div>
                </div>
                <div class="qrcode">
                  <img id="fei" alt="">
                </div>
          </x-dialog>
        </div>
        <!-- <transition name="fade">
            <div class="picker-box" v-show="PickerVisible2" @click="PickerVisible2 = false">
                <popup-picker
                    :data="pickerList"
                    :column-width="[]"
                    :fixed-columns="2"
                    :columns="1"
                    v-model="pickerValue"
                    v-show="PickerVisible2"
                    @on-change="submit1()">·
                </popup-picker>
            </div>
        </transition> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import { XHeader, GroupTitle, Flexbox, Alert, FlexboxItem, XButton,DatetimePlugin,Datetime ,Group, Picker ,PopupPicker,XDialog,cookie, TransferDomDirective as TransferDom  } from 'vux';
    import wx from 'weixin-js-sdk';
    import weixin from '@/services/weixin';
    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            GroupTitle,
            Flexbox,
            FlexboxItem,
            XButton,
            DatetimePlugin,
            Datetime,
            Group,
            Picker,
            Alert,
            XDialog,
            PopupPicker
        },
        data() {
            return {
                userId : cookie.get("manageId"),
                value1: '',
                startTime:"",
                endTime:"",
                hourListValue:'',
                hot:'',
                activeType:'',
                activityName:'',
                activePace:'',
                activeTitle:'',
                activeCreatePeople:this.userId,
                activePrincipalPeople:'',
                activeContext:'',
                activeContent:'',
                activeStatus:0,
                activeProjectActive:'',
                PickerVisible1:false,
                // contents:{rights:'',title:'bbb'},
                pickerValue1:'请选择活动类型',
                years:'',
                year1: [''],
                list: [],
                pickerValue: [""],
                PickerVisible2:false,
                departmentid:this.$store.getters.user.departmentid,
                showQrcodeDialog: false,
                Qrcode:'',
                picList:{list:[],arr:[]}
            };
        },
        methods: {
            backRoute(){
                setTimeout(() => history.back(), 500);
            },
            openPicker() {
                this.$refs.picker.open();
            },
            handleConfirm(d) {
                this.startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + '';
            },
            handlePicker(){
                axios({
                    method: 'get',
                    url: 'pscoredetail/queryByJoinList'
                }).then((res)=> {
                    // let t = res.data;
                    // t.forEach((value)=>{
                    //     value.title = value.title.substring(0,4);
                    // })
                    // this.list = t;
                    this.PickerVisible2 = true;
                    this.list = res.data.map(item => Object.assign({}, item, { title: item.title.substring(0,4) }));
                }).catch(function (error) {
                    // console.log(error);
                });
            },
            onValuesChange(picker, values){
                this.pickerValue1=values[0];
                this.PickerVisible1=false
            },
            submit(){
                if(!this.startTime){

                    return this.$vux.toast.show({
                        text: '请填写开始时间',
                        type: 'text'
                    });
                }

                if(!this.endTime){
                    return this.$vux.toast.show({
                        text: '请填写结束时间',
                        type: 'text'
                    });
                }

                // if(!this.activityName){
                //     return this.$vux.toast.show({
                //         text: '选择活动类型',
                //         type: 'text'
                //     });
                // }
                
                
                if(!this.pickerValue){
                    return this.$vux.toast.show({
                        text: '请选择活动类型',
                        type: 'text'
                    });
                }
                if(!this.activeTitle){
                    return this.$vux.toast.show({
                        text: '请选择活动名称',
                        type: 'text'
                    });
                }
                if(!this.activePace){
                    return this.$vux.toast.show({
                        text: '请填写活动地点',
                        type: 'text'
                    });
                }

                if(!this.activePrincipalPeople){
                    return this.$vux.toast.show({
                        text: '请填写负责人',
                        type: 'text'
                    });
                }

                if(!this.activeContext){
                    return this.$vux.toast.show({
                        text: '请填写活动内容',
                        type: 'text'
                    });
                }


                var starttime = this.startTime.replace(new RegExp("-","gm"),"/");
                var starttimeHaoMiao = (new Date(starttime)).getTime();
                var endtime = this.endTime.replace(new RegExp("-","gm"),"/");
                var endtimeHaoMiao = (new Date(endtime)).getTime();


                if(starttimeHaoMiao<endtimeHaoMiao){
                    axios({
                        method: 'post',
                        url: 'active/create',
                        params: {
                            startTime:starttimeHaoMiao,
                            endTime:endtimeHaoMiao,
                            activeType:this.pickerValue[0],
                            activityProjectId:this.pickerValue[0],
                            activePace:this.activePace,
                            activeCreatePeople:this.userId,
                            activePrincipalPeople:this.activePrincipalPeople,
                            activeContext:this.activeContext,
                            activeName:this.activeTitle,
                            activeStatus:1,
                            departmentid:this.departmentid,
                            picids:this.picList.arr.join()
                        }
                    }) .then((res)=> {

                        this.$vux.toast.show({
                            text: '增加成功',
                            type: 'text'
                        });

                        this.showQR(res.data);

                    }).catch(function (error) {
                        console.log(error);
                    });
                }else {

                    this.$vux.toast.show({
                        text: '开始日期不能大于结束日期',
                        type: 'text'
                    });

                }
            },
            showQR(data){
                if (data) {
                    document.getElementById('fei').src = 'http://dj.dlbdata.cn/dangjian/active/showQrCode?activeId='+data;
                    this.showQrcodeDialog = true;
                }
            },
            submit1(it){
                // console.log('submit1 it:', it);
                // this.activeType=it.id;
                // this.activeProjectActive = it.projectId;
                // this.activityName = it.title;
                // this.PickerVisible2=false

            },
            getActivity(){
            },
            log (str1, str2 = '') {
                console.log(str1, str2)
            },
            showPlugin () {
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM-DD HH',
                    value: '2017-05-20 18',
                    onConfirm (val) {
                        console.log('plugin confirm', val)
                    },
                    onShow () {
                        console.log('plugin show')
                    },
                    onHide () {
                        console.log('plugin hide')
                    }
                })
            },
            toggleFormat () {
                this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
            },
            change (value) {
                this.startTime = value;
            },
            change1 (value) {
                this.endTime = value;
            },
            clearValue (value) {
                this.value6 = ''
            },
            clearValue8 (value) {
                this.value8 = ''
            },
            setToday (value) {
                let now = new Date();
                let cmonth = now.getMonth() + 1;
                let day = now.getDate();
                if (cmonth < 10) cmonth = '0' + cmonth;
                if (day < 10) day = '0' + day;
                this.value7 = now.getFullYear() + '-' + cmonth + '-' + day;
                console.log('set today ok')
            },
            backhome(){
                console.log("---")
                this.$router.push({
                    path:'/'
                })
            },
            chooseImage(it) {
                wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: res => {
                        let localIds = res.localIds || [];
                new Promise(resolve => {
                    let serverIds = [];
                let toUpload = localId =>
                wx.uploadImage({
                        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: res => {
                        serverIds.push(res.serverId);
                if (localIds.length) {
                    toUpload(localIds.shift());
                } else {
                    resolve(serverIds);
                }
            }
            })
                ;
                if (localIds.length) {
                    toUpload(localIds.shift());
                } else {
                    resolve(serverIds);
                }
            }).
                then(serverIds => {
                    let promiseList = [];
                serverIds.map(serverId =>
                promiseList.push(
                    this.$http.get('picture/upload', {
                        params: {
                            mediaId: serverId
                        }
                    })
                )
            )
                ;
                Promise.all(promiseList).then(result => {
                    let pictureIds = [];
                result.map(item => pictureIds.push(item.data)
            )
                ;
                it.list.push("http://dj.dlbdata.cn/dangjian/picture/showThumbnail?pictureId=" + pictureIds.join());
                it.arr.push(pictureIds.join());
            })
                ;
            })
                ;
            }
            })
                ;
            }
        },
        computed: {
            pickerList () {
                return this.list.map(item => ({
                    name: item.title,
                    value: `${item.id}`
                }));
            },
            activityType () {
                const value = this.pickerValue[0];
                if (value && this.pickerList.length) {
                    return this.pickerList.find(item => item.value === value).name;
                }
                return '';
            },
            ...mapGetters(['user'])
        },
        mounted() {
            weixin.init(['chooseImage', 'uploadImage']);
            this.getActivity();
            this.departmentid = this.user.departmentid;
        }
    };
</script>
<style lang="less">
    .addPic{height:.17rem; 	font-size:.14rem;font-family:PingFangSC-Medium;color:#464646;font-weight: 600;line-height:.17rem;
    }
    .photo-list{padding:0.1rem 0 0;}
    .photo-list.border0{border-bottom:0;padding-bottom: 0;}
    .photo-list ul{font-size:0;list-style:none;}
    .photo-list ul li{
        font-size:0;
        display:inline-block;
        margin-right:.2rem;
        position:relative;
        vertical-align:top;
        width:.9rem;
        height:.9rem;
        overflow:hidden;
        margin-bottom:.2rem;
        }
    .photo-list ul li:first-child{margin-left:0;}
    .photo-list .operate{display:none;background:rgba(33,33,33,.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#b2404040, endColorstr=#b2404040);z-index:5;position:absolute;bottom:0;left:0;right:0;height:12px;padding-bottom:7px;font-size:12px;color:#fff;text-align: center}
    .photo-list .info{line-height:.6rem;text-align:center}
    .photo-list .preview{
        width: 0.9rem!important;
        height:.9rem!important;
        z-index:4;
        line-height:.6rem;
        font-family:arial;
        background-color: #dbdbdb;
        background-repeat:no-repeat;
        position:absolute;
        bottom:0;
        left:0;
        text-align:center;
        right:0;
        cursor: pointer;
        border:1px solid #fff;
        box-sizing: border-box;
        }
    .photo-list .preview.addUpload{
        background-color:#f4f4f4!important;
        border: 1px solid #e4e4e4!important;
        }
    .photo-list .preview img{max-height:.9rem!important;max-width:.9rem!important;vertical-align:middle;}
    .photo-list .photo-primary-text{color:#ffA500;font-size:12px;}
    .photo-list .add-bg{
        width: 0.2rem;
        height: 0.2rem;
        margin-left: .34rem;
        margin-top: .32rem;
        display: block;
        background: url(../../assets/images/add_icon_bg1.png) no-repeat;
        background-size: contain;
        background-position: center;
    }
    .photo-list ul li:hover .operate{display:block;}
    .photo-list ul .operate a{color:#fff;cursor:pointer;text-decoration:none}
    .photo-list ul li.no-operate:hover .operate{display:none;}
    .photo-list .upload-file-input{opacity: 0;position: absolute;z-index: 99;top: 0;right: 0;left: 0;width: .6rem;bottom: 0;}
    
    .qrcode-dialog0 {
        .weui-dialog {
            padding: 20px;
            display: flex;
            flex-direction: column;
            .title {
                text-align: left;
                word-break: break-all;
                label{
                color: #999;
                }
                .activeTitle {
                    color: #000;
                }
            }
            .qrcode {
                flex: 1;
                img {
                    margin-top: 10px;
                    width: 100%;
                }
            }
        }
    }
    .picker-box {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        .vux-picker {
            position: fixed;
            bottom: 0;
            width: 100%;
            border-top: 1px solid #333;
            background: #fff;
        }
    }
    // 淡入淡出
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .picker-box {
        z-index: 1000;
    }
</style>
<style lang="less" scoped>
    .page-body{
        -webkit-overflow-scrolling: touch;
    }
    ul,li{list-style: none}
    .group-item {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        &:last-child {
            margin-bottom: 0.2rem;
        }
    input,
    textarea {
        display: block;
        width: 100%;
        padding: 0.06rem 0.08rem;
        border-radius: 0px;
        border: 1px solid #e4e4e4;
        background-color: #f4f4f4;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 0.14rem;
    }
    input {
        height: 0.32rem;
    }
    .vux-flexbox-item input {
        border-right-width: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .input-addon {
        flex: 0 0 auto;
        width: auto;
    }
    .weui-btn_mini {
        height: 0.32rem;
        line-height: 1;
        padding: 0 0.16rem;
        font-size: 0.14rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        &::after {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
}
.weui-cells__title {
    margin-top: 0.2rem;
    padding-left: 0;
    padding-right: 0;
    color: #464646;
}
.active-type-list{
    margin: .1rem auto;
    width: 92%;
    position: relative;
    li{
        background: #FFF5E6;
        height: 0.3rem;
        text-indent: 0.2rem;
        line-height: .3rem;
        color: #CB2F00;
        font-size: .15rem;
    }
}
    .srcw{
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 8px solid #FFF5E6;
        position: absolute;
        right:.3rem;
        top:-.07rem;
        z-index:999;
    }
</style>
<style>
    .date-no-box{position: absolute;top:0px;left: 0;right: 0;bottom: 0;height: 0.32rem;overflow: hidden;opacity: 0}
    .date-no-box .vux-no-group-title{margin-top:0!important;}
    .date-no-box .weui-cell{
        padding: 10px 15px;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 0.32rem;
        padding: 0;
    }
    .weui-toast_text .weui-toast__content {
        padding-left: 10px;
        padding-right: 10px;

    }
    .weui-toast.weui-toast_text{
        width: 8em !important;
        min-width: 7.6em;
    }
    .weui-btn_warn {
        background-color: #b93647!important;
        width: .51rem!important;
        height: .32rem!important;
        border: 0px!important;
    }
    .weui-btn{
        width: 100%!important;
        /* bottom: .1rem!important; */
    }
</style>
