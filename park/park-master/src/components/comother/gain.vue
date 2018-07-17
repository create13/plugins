<template>
		<div class="detail">
			<div class="allLine" v-for="(context,index) in list" :key="index">
			    <div>
                    <span class="colorL">时间：</span>
                    <span class="colorW">{{dataPick(context.scoreTime)}}</span>
				</div>
				<div>
				<span class="colorL">积分类型：</span>
				<span class="colorW">{{context.detailTitle}}</span>
				</div>
                <div>
				<span class="colorL">积分变动：</span>
				<span class="colorW" :class="[context.score >= 0?'colored':'colorGreen']">{{context.score}}</span>
				</div>
                <div>
				<span class="colorL">审核人：</span>
				<span class="colorW">{{context.approvedName}}</span>
                </div>
			</div>
		</div>
</template>
<script>
	export default {
		data(){
			return {
			}
		},
		components:{

		},
		mounted(){



		},
		methods:{
		dataPick(s){
        	Date.prototype.toLocaleString = function(){
        		return this.getFullYear() +'年'+ (this.getMonth()+1)+'月'+this.getDate()+'日'
        	}
        	return new Date(s).toLocaleString();
    	}
		},
		props:['list']
	}
</script>

<style scoped>
.detail{
	width:100%;
	height:auto;
}


.allLine {
        width: 90%;
        overflow: hidden;
        margin: 0.1rem auto;
        border-bottom: 1px solid #EFEFEF;
    }

    .allLine {
        padding-top: .1rem;
        padding-bottom: .08rem
    }

    .allLine span {
        display: table-cell;
        line-height: 1.44
    }

    .colorL {
        width: .74rem;
        height: .3rem;
        font-size: .14rem;
        font-family: PingFangSC-Regular;
        color: rgba(153, 153, 153, 1);
        line-height: .3rem;
        margin-left: 5.3%;
    }

    .colorW {
        height: .3rem;
        font-size: .14rem;
        font-family: PingFangSC-Medium;
        color: rgba(102, 102, 102, 1);
        line-height: .3rem;
        margin-left: .1rem;
    }

.line-bottom{height:.2rem;width:100%;border-bottom:1px solid #EFEFEF;}
.colorGreen{color:rgba(24,193,25,1);}
.colored{color:rgba(185,54,71,1);}
</style>
