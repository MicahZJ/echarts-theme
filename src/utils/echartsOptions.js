import * as echarts from "echarts";
class EchartsOptions {
  constructor () {}
  
  changeOptions(options, value, charts) {// 切换图表颜色
    
    const {colorX, colorY, splitLineX, splitLineY, boxShadow, legendColor} = value;
    
    if (splitLineX) {
      this.formatSplitLineX(options, splitLineX);
    }
  
    if (splitLineY) {
      this.formatSplitLineY(options, splitLineY);
    }
  
    if (legendColor) {
      this.formatLegend(options, legendColor)
    }
  
    if (colorX) {
      this.formatX(options, colorX)
    }
  
    if (colorY) {
      this.formatY(options, colorY)
    }
  
    if (boxShadow) {
      this.formatShadow(options, boxShadow)
    }
  
    // if (formatterTextX) {
    //   this.formatTextX(options)
    // }
    //
    // if (formatterTextY) {
    //   this.formatTextY(options)
    // }
    
    this.formatTextX(options);
    this.formatTextY(options);
    
    charts.setOption(options, true)
  }
  
  formatX = (options, colorX) => { // x轴单位数值颜色
    options.xAxis && options.xAxis.axisLabel && options.xAxis.axisLabel.textStyle ?
      options.xAxis.axisLabel.textStyle.color = colorX: '';
  };
  
  formatY = (options, colorY) => { // y轴单位数值颜色
    options.yAxis && options.yAxis.axisLabel && options.yAxis.axisLabel.textStyle ?
      options.yAxis.axisLabel.textStyle.color = colorY: '';
  };
  
  formatTextX = (options) => { // x轴的刻度
    options.xAxis && options.xAxis.axisLabel && options.xAxis.axisLabel.formatter?
      options.xAxis.axisLabel.formatter = (v) => {
        let value;
        if (v >=1000) {
          value = v/1000 + 'k';
        }else if(v <1000){
          value = v;
        }
        return value
      }: '';
  };
  
  formatTextY = (options) => { // Y轴的刻度
    options.yAxis && options.yAxis.axisLabel && options.yAxis.axisLabel.formatter ?
      options.yAxis.axisLabel.formatter = (v) => {
        let value;
        if (v >= 1000) {
          value = v / 1000 + 'k';
        } else if (v < 1000) {
          value = v;
        }
        return value
      }: '';
  };
  
  formatLegend = (options, legendColor) => { // legend颜色
    options.legend && options.legend.textStyle ?
      options.legend.textStyle.color = legendColor: '';
  };
  
  formatSplitLineY = (options, splitLineY) => { // Y轴刻度线条颜色
    options.yAxis && options.yAxis.splitLine && options.yAxis.splitLine.lineStyle ?
      options.yAxis.splitLine.lineStyle.color = splitLineY: '';
  };
  
  formatSplitLineX = (options, splitLineX) => { // x轴刻度线条颜色
    options.xAxis && options.xAxis.splitLine && options.xAxis.splitLine.lineStyle ?
      options.xAxis.splitLine.lineStyle.color = splitLineX: '';
  };
  
  formatShadow = (options, boxShadow) => { // 折线图阴影效果
    if (boxShadow.length <= 1 && boxShadow.length > 0) {
      options.series[0].areaStyle = {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: boxShadow[0].top
        }, {
          offset: 1,
          color: boxShadow[0].bottom
        }])
      }
    } else if (boxShadow.length > 1) {
      options.series.map((item, index) => {
        item.areaStyle = {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: boxShadow[index].top
          }, {
            offset: 1,
            color: boxShadow[index].bottom
          }])
        }
      })
    }
  };
  
  // 阴影颜色
  formatColor(color) {
    if (store.state.modeFlag) {
       return color.wColor
    } else {
      return color.bColor
    }
  }
  // x轴，y轴颜色
  formatLineColor(color) {
    if (store.state.modeFlag) {
      return color.wColor
    } else {
      return color.bColor
    }
  }
  
  // 网格线
  formatSplitLineColor(color) {
    if (store.state.modeFlag) {
      return color.wColor
    } else {
      return color.bColor
    }
  }
  
  // legend
  formatLegendColor(color) {
    if (store.state.modeFlag) {
      return color.wColor
    } else {
      return color.bColor
    }
  }
  
  // 零数据
  formatZero(data) {
    if (data.length === 0) {
      return {
        text: '暂无数据',
          x: 'center',
          y: 'center'
      }
    }else {
        return {}
    }
  }
}
export default new EchartsOptions()