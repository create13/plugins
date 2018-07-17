<template>
  <div>
    <dlbheader></dlbheader>
    <div class="main">
      <div class="title">
        <span class="title">活动时间</span><br>
        <span class="title2">{{time1}}
           <mt-datetime-picker
              ref="picker"
              type="datetime"
              :startDate="startDate"
              @confirm="handleConfirm">
           </mt-datetime-picker>
          <a @click="openPicker()" class="btn1" style="background: url(../../src/assets/images/iconw-calendar.png) center no-repeat;background-color:#B93647;"></a></span>
      </div>
      <div class="title">
        <span class="title" >活动类型</span><br>
        <span class="title2" >{{pickerValue1}} <a href="#" @click="handlePicker()" class="btn1" style="background: url(../../src/assets/images/iconw-picker.png) center no-repeat;background-color:#B93647;"></a></span></span><br>
        <mt-picker :slots="slots"  @change="onValuesChange" v-model="pickerValue1" v-show="PickerVisible1"></mt-picker>
      </div>
      <div class="title">
        <span  class="title">活动名称</span><br>
        <input type="text" /><br>
      </div>
      <div class="title">
        <span  class="title">活动地点</span><br>
        <input type="text" /><br>
      </div>
      <div class="title">
        <span  class="title">活动发起人</span><br>
        <input type="text" /><br>
      </div>
      <div class="title">
        <span  class="title">活动负责人</span><br>
        <input type="text" /><br>
      </div>
      <mt-button style="width: 96%;background-color:#B93647 ;color: #FFFFFF" >确认并提交</mt-button>







    </div>

  </div>


</template>
<script>
  import header from '../components/layout/header.vue'
  export default {
    data(){
      return {
        PickerVisible1:false,
        pickerValue1:'请选择活动类型',
        PickerVisible:'',
        time1:'请选择活动时间',

        slots: [
          {
            flex: 1,
            values: ['请选择活动类型','党课', '组织生活会'],
            className: 'slot1',
            textAlign: 'center'
          }]
      }

    },methods: {
      openPicker() {
        this.$refs.picker.open();
      },handleConfirm(value){
        var d= value;
        console.log(d);
        var youWant=d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + d.getHours() + '时' + d.getMinutes() +'分';
        this.time1=youWant
      },handlePicker(){
        this.PickerVisible1=true
      },onValuesChange(picker, values){

        this.pickerValue1=values[0],
          this.PickerVisible1=false


      }
    },




    components:{
      'dlbheader':header,


    }}

</script>
<style scoped>
  .main{margin-left: 0.2rem}

  .title{font-size: 0.15rem;margin-top: 0.1rem; }
  .main input{width:95%;height: 0.3rem;margin-top: 0.2rem}
  .main .title1 input{width:95%;height: 1.5rem}
  .main .title1 a span{display:block;margin-top: -0.15rem;font-size:0.4rem ;color: #9B0A1A}
  .main .title2{display:block;border: 0.01rem solid silver;width:96% ;height: 0.3rem}
  .btn1{display:block;width: 0.4rem;height:0.3rem;float: right;}
</style>
