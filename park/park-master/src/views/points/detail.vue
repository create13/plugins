<template>
	<div class="intro">
		<x-header class="xheader">评分说明</x-header>
		<div class="part-one">
			<div>
				<table class="table-title">
					<tr>
						<td style="width: 20%;vertical-align:middle!important;">项目指标</td>
						<td style="width: 30%;vertical-align:middle!important;">具体内容</td>
						<td style="width: 20%;vertical-align:middle!important;padding-left:0.35rem!important">分值</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="2">政治学习<br>（10分）</td>
						<td class="table-content-text">党员根据综合党委工作提示和各级党组织的学习要求，参加学习教育活动</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0 0">2.5分/次<br/>（2次）</td>
					</tr>
					<tr>
						<td class="table-content-text">党员自学或参加其他党组织组织的学习教育活动，经所属党支部书记确认后加分</td>
						<td class="table-content-score" style="border-radius: 0 0 0.1rem 0">2.5分/次<br/>（2次）</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="2">组织生活<br>（20分）</td>
						<td class="table-content-text">党员按时参加本支部的组织生活</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0 0">2分/次<br/>（5次）</td>
					</tr>
					<tr>
						<td class="table-content-text">党员在金领驿站参加政治活动，或“双报到”参加居民区党组织组织的党日活动，经所属党支部书记确认后加分</td>
						<td class="table-content-score" style="border-radius: 0 0 0.1rem 0">2分/次<br/>（5次）</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="2">党费缴纳<br>（15分）</td>
						<td class="table-content-text">党员按时足额缴纳党费</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0.1rem 0">1.25分/次<br/>（12次）</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="2">思想汇报<br>（10分）</td>
						<td class="table-content-text">党员每上半年口头向支部书记汇报一次</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0 0">5分</td>
					</tr>
					<tr>
						<td class="table-content-text">党员每下半年书面向支部汇报一次</td>
						<td class="table-content-score" style="border-radius: 0 0 0.1rem 0">5分</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="3">先锋作用<br>（15分）</td>
						<td class="table-content-text">党员年内获得综合党委以上荣誉的</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0 0">5分</td>
					</tr>
					<tr>
						<td class="table-content-text">党员先锋作用突出，年内受到公司、行业表彰奖励的</td>
						<td class="table-content-score">5分</td>
					</tr>
					<tr>
						<td class="table-content-text">党员受社区和有关党群组织表彰的，经所属党支部确认后</td>
						<td class="table-content-score" style="border-radius: 0 0 0.1rem 0">5分</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="2">遵章守纪<br>（20分）</td>
						<td class="table-content-text">党员在支部民主评议党员活动中，被评定为“不合格党员”或受限期改正等组织处置的扣20分</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0.1rem 0">默认20分</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-label" rowspan="2">公益服务<br>（10分）</td>
						<td class="table-content-text">党员积极参加公益活动</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0.1rem 0">3分/次<br/>（最高不超过10分）</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="part-two">
			<div>
				<table class="table-title">
					<tr>
						<td style="vertical-align:middle!important;">分值</td>
						<td style="vertical-align:middle!important;">评级</td>
					</tr>
				</table>
			</div>

			<div>
				<table class="table-content">
					<tr>
						<td class="table-content-score" style="border-radius: 0.1rem 0 0 0">≥100</td>
						<td class="table-content-score" style="border-radius: 0 0.1rem 0 0">先锋党员</td>
					</tr>
					<tr>
						<td class="table-content-score">90-99</td>
						<td class="table-content-score">优秀党员</td>
					</tr>
					<tr>
						<td class="table-content-score">80-89</td>
						<td class="table-content-score">合格党员</td>
					</tr>
					<tr>
						<td class="table-content-score">60-79</td>
						<td class="table-content-score">基本合格党员</td>
					</tr>
					<tr>
						<td class="table-content-score" style="border-radius: 0 0 0 0.1rem">0-59</td>
						<td class="table-content-score" style="border-radius: 0 0 0.1rem 0">不合格党员</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {XHeader} from 'vux';

	export default {
		components: {
   			XHeader,
		},
		mounted () {
			this.$emit('updateFooterState', false);
		},
		beforeDestroy () {
			this.$emit('updateFooterState', true);
		}
	}
</script>
<style scoped>
	.intro {
		width: 100%;
		margin: .2rem auto;
		padding-top:0.3rem;
	}
	
	table {
		width: 90%;
		max-width: 750px;
		font-size: 0.14rem;
		margin: 0 auto;
		font-family: "Microsoft YaHei", "微软雅黑", "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
	}
	
	.table-title {
		border: 2px solid #B93647;
		border-radius: 0.1rem;
		text-align: center;
		color: #B93647;
		height: 0.4rem;
		/* vertical-align: middle; */
	}
	
	.table-content {
		margin-top: 0.1rem;
		border-collapse: collapse;
	}
	
	.table-content-label {
		width: 20%;
		color: #6D6D6D;
		border: 2px solid #E4E4E4;
		font-weight: bold;
		border-radius: 0.1rem 0 0 0.1rem;
		text-align: center;
		vertical-align: middle;
	}
	
	.table-content-text {
		width: 60%;
		color: #666666;
		padding: 0.2rem;
		border: 2px solid #E4E4E4;
	}
	
	.table-content-score {
		width: 20%;
		color: #666666;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		text-align: center;
		border: 2px solid #E4E4E4;
	}
	
	.part-two {
		margin-top: 0.3rem;
	}
	.xheader{
		margin-bottom:0.1rem;
		margin-top:-0.52rem;
	}
	
	

</style>

<style scoped>
	html {
		-webkit-text-size-adjust: none;
	}
	
	html,
	body {
		width: 100%;
		max-width: 750px;
		margin: 0 auto;
		background: #fff;
	}
	
	.img {
		width: 100%;
	}
	
	.intro {
		padding-bottom: 0.1rem;
	}
	
	.intro h6 {
		text-align: center;
		font-size: 0.16rem;
		color: #444343;
		margin-top: .4rem;
	}
	
	.intro h3 {
		text-align: center;
		font-size: 0.38rem;
		margin-bottom: .4rem;
	}
	
	.intro p.title {
		text-align: center;
		font-size: 0.22rem;
		line-height: 1.5;
		color: #7a7979;
	}
	
	.flow {
		margin-top: .37rem
	}
	
	.shifu {
		margin-top: .35rem
	}

</style>