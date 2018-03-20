<template>
		 <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期" :picker-options='options' size="large">
   </el-date-picker>
</template>

<script>
	export default{
		data(){
			return {
				value:'',
				options:{
					 disabledDate(time) {
            return time.getTime() < Date.now();
         },
         firstDayOfWeek:1
				}
			}
		}
	}
</script>