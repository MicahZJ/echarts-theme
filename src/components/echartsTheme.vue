<template>
  <div class="echarts-box">
    <div :id="echartsId" :style="{ width: eWidth, height: eHeight }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ref, watch, nextTick } from 'vue'
import { onUnmounted } from "@vue/runtime-core";
import elementResizeDetectorMaker from 'element-resize-detector'
import EchartsOptions from "../utils/echartsOptions";

export default {
  name: 'echartsTheme',
  components: {},
  props: [
    'echartsId',
    'eWidth',
    'eHeight',
    'theme',
    'options',
    'modeFlag',
    'optionsW',
    'optionsB'
  ],
  watch: {
    modeFlag:{
      handler:function (val){
        if(document.getElementById(this.echartsId)) {
          if (val) { // 切换白色
            this.optionsW ?  this.beWhite() : ''
          } else { // 切换黑色
            this.optionsB ? this.beBlack(): ''
          }
        }
      },
      deep:true,
      immediate:true,
    },
  },
  setup(props) {
    /// 声明定义一下echart
    let echart = echarts;
    let docEcharts = ref();
    
    onUnmounted(() => {
      echart.dispose;
    });
  
    const divListen = (div, chart) => {
      // let that = this
      return new Promise(() => {
        let erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById(div), debounce(async () => {
          // that.$nextTick(function () {
          //使echarts尺寸重置
          // console.log('3333')
          await nextTick()
          chart.resize();
          // })
        }));
      })
    }
  
    //防抖
    const debounce = (fn, t = 100) => {
      let lastTime;
      return function () {
        clearTimeout (lastTime);
        const [that, args] = [this, arguments];
        lastTime = setTimeout (() => {
          fn.apply (that, args);
        }, t);
      }
    }
    
    // 基础配置一下Echarts
    const initChart = () => {
      nextTick(() => {
        const chart = echart.init(document.getElementById(props.echartsId), props.theme);
        docEcharts.value = chart
        divListen(props.echartsId, chart, this)
        // 把配置和数据放这里
        chart && chart.clear();
        if (props.modeFlag) {
          props.optionsW ? EchartsOptions.changeOptions(props.options, props.optionsW, docEcharts.value): '';
        } else {
          props.optionsB ? EchartsOptions.changeOptions(props.options, props.optionsB, docEcharts.value): ''
        }
        props.options && chart.setOption(props.options, true);
        // 重置数据
        watch(props.options,
          () => {
            chart && chart.clear();
            props.options && chart.setOption(props.options, true)
          },{
            deep: true,
            immediate: true
          }
        )
      })
    }
    
    return {
      docEcharts,
      initChart
    }
  },
  methods: {
    beWhite() {
      EchartsOptions.changeOptions(this.options, this.optionsW, this.docEcharts);
    },
  
    beBlack() {
      EchartsOptions.changeOptions(this.options, this.optionsB, this.docEcharts)
    }
  },
  mounted () {
    this.initChart();
  }
}
</script>

<style>
.echarts-box{
  width: 100%;
  height: 100%;
}
</style>
