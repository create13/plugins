<template>
  <div>
      <div class="bar-out">
        <el-row>
          <el-col :span="4" :offset="1"><p class="font-set">{{textCon}}</p></el-col>
          <el-col :span="3">
            <el-select v-model="value" placeholder="2017年">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
           <el-col :span="2" :offset="1"><el-radio v-model="radio" label="1">所有门店</el-radio></el-col>
           <el-col :span="1"><el-radio v-model="radio" label=""></el-radio></el-col>
           <el-col :span="3"><el-input placeholder="请输入指定的店仓编码" v-model="input10" clearable>
</el-input></el-col>
           <el-col :span="4" :offset="1"><el-button>查 询</el-button></el-col>
        </el-row>

 <el-row>
          <el-col :span="8" :offset="2">
            <el-radio-group v-model="radio3">
              <el-radio-button label="按客户计算"></el-radio-button>
              <el-radio-button label="按客户计算 "></el-radio-button>
           </el-radio-group>
          </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>



          <div id="echartsMain"></div>
      </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: '',
  data () {
    return {
      textCon: '会员复购率分析',
       radio: '1',
       radios: '',
       radio3: '按客户计算',
       input10: '',
      options: [{
        value: '选项1',
        label: '2017年'
      },
      {
        value: '选项2',
        label: '2018年'
      }],
      value: ''
    }
  },
  components: {},

  computed: {

  },
  methods: {
    drawsEcharts () {
      let myCharts = echarts.init(document.getElementById("echartsMain"));
      let option = {
        color: ['#2185c5'],   //柱形图颜色
    legend: {
        data: ['订单总数', '2单及以上订单数','复购率'],
        icon: 'circle',
        right: 56,
        textStyle: {
            color: '#000',
        }
    },
        tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          borderColor: '#D7E0E6',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
              lineStyle: {    //x轴线宽度以及颜色
                type: 'solid',
                color:'#748292',
                width:'2'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLine: {
              lineStyle: {   //y轴线宽度以及颜色
                type: 'solid',
                color:'#748292',
                width:'2'
              }
            },
            axisTick: {    //不显示轴线刻度
              show: false
            },
           axisLabel: {
              color: '#748292',
              fontFamily: 'PingFangSC-Regular',
              fontSize: 7
            },
          },
          {
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value} %'   //右侧轴线
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color:'#748292',
                width:'2'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            }
}
        ],
        series: [
          {
            name: '复购率',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            z: 15,
            symbolSize: 15,
            lineStyle: {
              color: {
                type: 'line',
                x: 0.5,
                y: 0.5,
                r: 0.5,
    colorStops: [{
        offset: 0, color: '#ff8497' // 0% 处的颜色
    }, {
        offset: 1, color: '#ff8497' // 100% 处的颜色
    }],
              }
            },
            itemStyle: {
              color: {
    type: 'radial',
    x: 1,
    y: 1,
    r: 1,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }],
            }},
            data: [['1月',130], ['2月',60], ['3月',120], ['4月',95], ['5月',80], ['6月',90], ['7月',120], ['8月',30], ['9月',80], ['10月',55], ['11月',60], ['12月',100]]
          }, 
          {
        name: '2单及以上订单数',
        type: 'bar',
        itemStyle: {
            normal: {
                color: '#BFEBFF'
            }
        },
        silent: true,
        barWidth: 40,
        barGap: '-100%', // Make series be overlap
        barCategoryGap:[13, 18, 18],
        data: [230, 160, 200, 140, 130, 130, 160, 130, 160, 130, 160, 230]
    }, {
        name: '订单总数',
        type: 'bar',
        barWidth: 40,
        z: 10,
        data: [130, 60, 120, 95, 80, 90, 120, 30, 80, 55, 60, 100]
    }]
      };
      myCharts.setOption(option);
    }
  },
  mounted () {
    this.drawsEcharts();
  }


}
</script>

<style lang="less" scoped>
.bar-out {
    width: 100%;
    height: 100%;
    border-radius: .1rem;
    border: 1px solid #eee;
    #echartsMain {
      width: 90%;
      margin-left: 5%;
      height: 7rem;
    }
    .font-set {
    font-size: .52rem;
    top: 0;
  }
  .el-input__inner {
    background-color: #f7f8fa;
    color: #c8cdd4;
  }
  .el-button {
    background: #4db6ac;
    color: #fff;
    padding: 12px 30px;
  }
  
}

</style>
