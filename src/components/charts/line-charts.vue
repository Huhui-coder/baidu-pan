<template>
  <div class="l-chart">
    <div class="line-top clearfix">
      <p style="padding-bottom: 10px;">{{ title }}</p>
      <div class="line-title clearfix">
        <span style="padding-right: 10px">时间:</span>
        <el-radio-group v-model="time" size="small" @change="handleTimeChange">
          <el-radio-button :label="'1'">上传</el-radio-button>
          <el-radio-button :label="'2'">下载</el-radio-button>
          <el-radio-button :label="'3'">删除</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <v-chart v-loading="loading" :options="options" style="width: 100%;height: 80%;" autoresize />
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/theme/light'
import 'echarts/lib/component/dataZoom'

export default {
  components: {
    'v-chart': ECharts
  },
  props: {
    title: {
      type: String,
      default: () => '平台注册数'
    },
    type: {
      type: String,
      default: () => 'App'
    },
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      options: '',
      time: 'day'
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.getOption(newValue)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleTimeChange(val) {
      this.$emit('handleTimeChange', { type: val })
    },
    getOption(val) {
      const names = Object.keys(val.data || {})
      const data = []
      for (const i in val.data) {
        data.push(val.data[i].count)
      }
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#099BFF'
            }
          },
          textStyle: {
            color: '#666'
          },
          borderWidth: 1,
          borderColor: '#e6e6e6',
          backgroundColor: 'rgba(255, 255, 255, .92)',
          padding: 18,
          formatter: params => {
            return `<p style="padding-bottom: 18px;">${params[0].name}</p>
             <i style="display: inline-block;
                margin-right: 5px;
                vertical-align: middle;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                border: 2px solid rgba(9, 155, 255,1);"></i>数量：${params[0].value}<br>`
          }
        },
        grid: {
          left: 20,
          right: 20,
          top: 40,
          bottom: 40,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: names.length < 10,
          data: names.reverse(),
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            color: '#666',
            interval: 0,
            rotate: names.length > 10 ? -40 : 0
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ddd'],
              width: 1,
              type: 'dash'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: 'line',
            data: data.reverse(),
            symbol: 'circle',
            showSymbol: true,
            symbolSize: 7,
            hoverAnimation: true,
            animation: true,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#fff',
                borderType: 'solid',
                borderColor: '#099BFF',
                borderWidth: 2,
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: '#099BFF'
                }
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear', // 设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(9, 155, 255, 0.15)'
                  }, {
                    offset: 1,
                    color: 'rgba(9, 155, 255, 0)'
                  }],
                  globalCoord: false
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$transition: all ease-in-out 0.25s;
$color-secondary: #666666;

.el-select {
  width: 150px;
  margin-right: 20px;
  /deep/ .el-input {
    width: 100%;
  }
}
.el-select-dropdown__item {
  font-size: 12px;
}
/deep/ .el-radio-button--small .el-radio-button__inner {
  padding: 9px 24px;
}
/deep/ .el-input__inner {
  height: 32px;
  line-height: 32px;
}
/deep/ .el-date-editor .el-range__close-icon {
  line-height: 26px;
}
.tabs {
  span {
    display: inline-block;
    padding-bottom: 10px;
    padding-right: 27px;
    color: $color-secondary;
    cursor: pointer;
    transition: $transition;
    &:hover {
      color: #0a9bff;
    }
  }
  .active {
    color: #0a9bff;
  }
  .tabs-border {
    width: 36px;
    height: 2px;
    background-color: #0a9bff;
    transition: $transition;
  }
}
.l-chart {
  width: 100%;
  height: 390px;
  .l-top {
    position: relative;
  }
  .line-top {
    padding-top: 10px;
    padding-bottom: 40px;
    .line-title {
      float: left;
      padding-right: 10px;
    }
    .date {
      width: 300px;
    }
  }
  .line-item {
    float: left;
    padding: 0 20px;
    border-right: 1px solid #e5e5e5;
    span {
      color: #666;
      font-size: 12px;
    }
    .card-panel-num {
      padding-left: 15px;
      font-size: 18px;
      color: #333;
    }
  }
}
</style>
