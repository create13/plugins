## flex
1.display:flex;
2.flex-direction 默认是row 改变主轴方向 主轴原本方向是从左至右 主轴和侧轴永远都是垂直的
row,row-reverse,column,column-reverse
3.flex-wrap 改变侧轴的方向 默认值 no-wrap 可设定值 wrap wrap-reverse 设定wrap之后，自动换行
4.flex-direction和flex-wrap的缩写方式
flex-flow:<'flex-direction'>||<'flex-wrap'>
5.order order的值越大 flex item的块越靠后
6.justify-content 控制伸缩项在主轴的展现方式 默认是flex-start 在主轴开始的位置展现 取值flex-end 在主轴结束的位置展现 取值 center  space-between 空隙均匀分配 除了第一个最后一个 space-around 空隙均匀分配 剩余空隙给第一第四个分配
7.align-items 控制伸缩项在侧轴的展现方式 默认值是stretch stretch的意思是拉伸伸缩行 不设置高度的时候可以看到 取值是flex-start 侧重起始位置 flex-end 侧重结束位置 center垂直居中 baseline
8.align-self 控制指定伸缩项在侧轴的展现方式 取值 stretch flex-start flex-end baseline
9.align-content 控制伸缩项所组成的行(列)在侧轴的展现方式 取值stretch flex-start flex-end center space-between space-around
10.flex-grow 控制伸缩项在伸缩行的伸展程度 取值是整数
11.flex-shrink控制伸缩项在伸缩行的收缩程度
12.flex-basis定义伸缩项伸缩前的尺寸 取值auto 或者是像素百分比等，设置了grow或shrink的伸缩项将以这个尺寸为基准进行伸缩
13.flex flex-grow,flex-shrink,flex-basis的缩写形式
flex:none|[<'flex-grow'><'flex-shrink'><'flex-basis'>]
如果flex是none 相当于 0 0 auto
使用flex简写形式时，如果某个属性不写,那么它们的默认值是:
flex-grow:1
flex-shrink:1
flex-basis:0