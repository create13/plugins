<template>
    <div>
    <div class="card" >
        <div class="delete-button" :class="{'delete-button-show': isDeleting}" v-for="(floor,index) in items"
             @touchend="clearLoop" @touchstart="showDeleteButton(index)" >{{floor.text}}</div>
    </div></div>
</template>

<script>
export default {
    data(){
        return{
            isDeleting:false,
        items:[
            {text:"第一组"},
{text:"第二组"},

{text:"第三组"},
]
}},
    methods:{
        showDeleteButton(it) {
            clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器

            var This = this;
            this.Loop = setTimeout(function(){
               alert(it)

            },1000);
        },
        clearLoop() {
            clearInterval(this.Loop);
        },
    }
};
</script>

<style scoped>
    .delete-button-show {background-color:red}

</style>
