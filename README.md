# echarts-theme
要求两种主题切换变色,这好做啊\
但是图表也要跟着变色,这就很烦了,所以只能封装一个包\
我只想摸鱼啊,可恶
## 支持图形
目前支持的有line，bar，pie，这三种类型，后面需求加了之后再增加其他图形
## 配置属性
属性名         | 描述  | 参考值 |
:------------:|:-----:|:-----:|
modeFlag      | 变色按钮 |  true/false |
echartsId     | 图表ID | 'demoEcharts' |
options       | echarts配置项 |  参照官网 |
optionW       | 颜色1变量定义 |  参照demoData |
optionB       | 颜色2变量定义 |  参照demoData |
legendColor   | legend颜色 |  '#FFFFFF' |
colorX        | x轴刻度标签文字的颜色 |  '#FFFFFF' |
colorY        | y轴刻度标签文字的颜色 |  '#FFFFFF' |
splitLineX    | x轴刻度线的颜色 |  '#283045' |
splitLineY    | Y轴刻度线的颜色 |  '#283045' |
boxShadow     | 折线图阴影效果,多条数据则数组多一项 |  参照demo |

DemoData:
```
options: {
     tooltip: {
       trigger: 'axis'
     },
     xAxis: {
       type: 'category',
       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
     },
     yAxis: {
       type: 'value'
     },
     series: [{
       data: [150, 230, 224, 218, 135, 147, 260],
       type: 'line'
     }]
},
colorX: '#71747E',
colorY: '#9CA5AC',
splitLineX: '#e0e6f1',
splitLineY: '#e0e6f1',
boxShadow:[{
 'bottom': '#FFFFFF',
 'top': '#dedcfd',
}]
optionsW:{
    colorX: '#71747E',
    colorY: '#9CA5AC',
    splitLineX: '#e0e6f1',
    splitLineY: '#e0e6f1',
    legendColor: '#834f63',
    boxShadow:[{
      'bottom': '#FFFFFF',
      'top': '#dedcfd',
    }]
},
optionsB:{
    colorX: '#4e06ff',
    colorY: '#23fffd',
    splitLineX: '#4df14c',
    splitLineY: '#f1224b',
    legendColor: '#7ffdff',
    boxShadow:[{
      'bottom': '#ff2df1',
      'top': '#0afdf3',
    }]
}
modeFlag: true
```
## 安装使用
### 下载
```
npm install echarts-theme
```
### 引入main.js
```
import EchartsTheme from 'echarts-theme'

app.use(EchartsTheme).mount('#app');
```
### 使用
在template中引入,注意一定要父级容器,这里我设置的是500*500的
```
<div style="width:500px;height:500px">
    <echarts-theme :echartsId="'searchEcharts'"
                    :eWidth="'100%'"
                    :eHeight="'100%'"
                    :theme="themeFlag"
                    :optionsW="optionsW"
                    :optionsB="optionsB"
                    :modeFlag="modeFlag"
                    :options="eOptions"/>
</div>
```


