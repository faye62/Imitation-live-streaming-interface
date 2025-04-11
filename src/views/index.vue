<template>
  <div id="app">
    <page-head></page-head>
    <!-- 主要内容区域 -->
    <div class="main-content">

      <!-- 左侧直播和聊天区域 -->
      <live-chat-container></live-chat-container>
      <!-- 右侧 -->
      <div class="right-box">
        <!-- 右侧上部分 -->
        <div style="display: flex;">
          <!-- 中间数据统计区域 -->
          <!-- 数据展示区域 -->
          <div class="ob-box p20 shop">
            <div class="f">
              <div class="f1">
                <div class="ob-box-name f fc">
                  {{ dataMode === 'ecommerce' ? '下单 GMV' : '当前观看人数' }}
                  <i class="el-icon ml6 cp el-tooltip__trigger el-tooltip__trigger">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
                          fill="currentColor"></path>
                    </svg>
                  </i>
                </div>
                <div class="ob-box-online peple">
                  {{ dataMode === 'ecommerce' ? dynamicData.ecommerce.gmv.toFixed(1) : dynamicData.general.viewers }}
                </div>
              </div>
              <div>
                <div class="f fc">
        <span class="arco-radio-group-button arco-radio-group-size-medium arco-radio-group-direction-horizontal">
          <label
              :class="{ 'arco-radio-checked': dataMode === 'general' }"
              class="arco-radio-button"
              @click="dataMode = 'general'"
          >
            <input :checked="dataMode === 'general'" class="arco-radio-target" type="radio" value="general">
            <span class="arco-radio-button-content">通用数据</span>
          </label>
          <label
              :class="{ 'arco-radio-checked': dataMode === 'ecommerce' }"
              class="arco-radio-button"
              @click="dataMode = 'ecommerce'"
          >
            <input :checked="dataMode === 'ecommerce'" class="arco-radio-target" type="radio" value="ecommerce">
            <span class="arco-radio-button-content">电商数据</span>
          </label>
        </span>
                </div>
              </div>
            </div>

            <div class="arco-divider arco-divider-horizontal" role="separator"></div>

            <div class="arco-row arco-row-align-start arco-row-justify-start data-item"
                 style="margin-top: -12px; margin-bottom: -12px;">
              <template v-if="dataMode === 'ecommerce'">
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">销量</div>
                    <div class="data-value">{{ dynamicData.ecommerce.sales }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">成交人数</div>
                    <div class="data-value">{{ dynamicData.ecommerce.buyers }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">客单价(元)</div>
                    <div class="data-value">￥{{ dynamicData.ecommerce.avgPrice.toFixed(1) }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">累计观看人数</div>
                    <div class="data-value">{{ dynamicData.ecommerce.viewers }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">成交转化率</div>
                    <div class="data-value">{{ dynamicData.ecommerce.conversion.toFixed(2) }}%</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name" style="white-space: nowrap;">直播成交金额(元)</div>
                    <div class="data-value">￥{{ dynamicData.ecommerce.liveSales.toFixed(1) }}</div>
                  </section>
                </div>
              </template>

              <template v-else>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">评论次数</div>
                    <div class="data-value">{{ dynamicData.general.comments }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">评论人数</div>
                    <div class="data-value">{{ dynamicData.general.commenters }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">互动率</div>
                    <div class="data-value">{{ dynamicData.general.interactionRate.toFixed(1) }}%</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">点赞数</div>
                    <div class="data-value">{{ dynamicData.general.likes }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">直播时长</div>
                    <div class="data-value">{{ dynamicData.general.duration }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">打赏次数</div>
                    <div class="data-value">{{ dynamicData.general.rewards }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">打赏人数</div>
                    <div class="data-value">{{ dynamicData.general.rewarders }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">报名人数</div>
                    <div class="data-value">{{ dynamicData.general.signups }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">签到人数</div>
                    <div class="data-value">{{ dynamicData.general.checkins }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">发送红包金额(元)</div>
                    <div class="data-value">￥{{ dynamicData.general.redpacket }}</div>
                  </section>
                </div>
              </template>
            </div>
          </div>
          <div class="chart-area">
            <div class="chart-tabs">
              <span class="tab active">实时数据</span>
              <span class="tab">互动人数</span>
              <span class="tab">评论数</span>
            </div>
            <div ref="chartRef" class="chart-container"></div>
          </div>
        </div>
        <!-- 右侧下部分聊天记录区域 -->
        <char-area></char-area>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import * as echarts from 'echarts';
import PageHead from "@/views/page-head.vue";
import LiveChatContainer from "@/views/live-chat-container.vue";
import CharArea from "@/views/char-area.vue";


const active = ref('customer');
const chartRef = ref(null);
let chart = null;

// 数据模式状态
const dataMode = ref('ecommerce') // 'general' 或 'ecommerce'

// 模拟动态数据
const dynamicData = ref({
  ecommerce: {
    gmv: 7175.4,
    sales: 47,
    buyers: 31,
    avgPrice: 124.0,
    viewers: 1337,
    conversion: 2.31,
    liveSales: 5827.8
  },
  general: {
    viewers: 0,
    comments: 0,
    commenters: 0,
    interactionRate: 0,
    likes: 0,
    duration: '00:00:00',
    rewards: 0,
    rewarders: 0,
    signups: 0,
    checkins: 0,
    redpacket: 0
  }
})

// 更新时间函数
const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  dynamicData.value.general.duration = `${hours}:${minutes}:${seconds}`
}

// 模拟数据更新
const updateData = () => {
  // 随机增量
  const randomIncrement = (base, max) => base + Math.floor(Math.random() * max)

  // 更新电商数据
  dynamicData.value.ecommerce = {
    gmv: randomIncrement(7000, 500),
    sales: randomIncrement(45, 10),
    buyers: randomIncrement(30, 5),
    avgPrice: 120 + Math.random() * 10,
    viewers: randomIncrement(1300, 50),
    conversion: 2.0 + Math.random(),
    liveSales: randomIncrement(5800, 300)
  }

  // 更新通用数据
  dynamicData.value.general = {
    viewers: randomIncrement(500, 100),
    comments: randomIncrement(80, 20),
    commenters: randomIncrement(40, 10),
    interactionRate: 5 + Math.random() * 3,
    likes: randomIncrement(500, 200),
    duration: dynamicData.value.general.duration,
    rewards: randomIncrement(10, 5),
    rewarders: randomIncrement(8, 3),
    signups: randomIncrement(20, 5),
    checkins: randomIncrement(15, 5),
    redpacket: randomIncrement(100, 50)
  }

  updateTime()
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);
  const option = {
    grid: {
      top: 30,
      left: 40,
      right: 40,
      bottom: 30
    },
    xAxis: {
      type: 'category',
      data: ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
      axisLine: {
        lineStyle: {
          color: '#363c4a'
        }
      },
      axisLabel: {
        color: '#8c8c8c'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#363c4a'
        }
      },
      axisLabel: {
        color: '#8c8c8c'
      },
      splitLine: {
        lineStyle: {
          color: '#363c4a'
        }
      }
    },
    series: [{
      data: [1, 4, 3, 1, 1, 2, 3],
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        color: '#409EFF',
        width: 2
      },
      itemStyle: {
        color: '#409EFF'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(64,158,255,0.2)'
          }, {
            offset: 1,
            color: 'rgba(64,158,255,0)'
          }]
        }
      }
    }]
  };

  chart.setOption(option);
};


// 监听窗口大小变化
const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
  updateTime()
  setInterval(updateData, 5000) // 每5秒更新一次数据
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chart?.dispose();
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #060d1b;
  color: #fff;
}

.right-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 8px;
}

.main-content {
  display: flex;
  padding: 0 8px 8px 8px;
  height: calc(100% - 48px);
  width: 100vw;
}

.chart-area {
  width: 400px;
  display: flex;
  flex-direction: column;
}

.chart-container {
  width: 999px;
  height: 260px;
}

.ob-box {
  position: relative;
  background: linear-gradient(135deg, rgba(77, 192, 228, .3), rgba(65, 79, 110, .3));
  border: 1px solid;
  -o-border-image: linear-gradient(180deg, rgba(163, 170, 187, 0), rgba(163, 170, 187, .2), rgba(163, 170, 187, 0)) 1 1;
  border-image: linear-gradient(180deg, rgba(163, 170, 187, 0), rgba(163, 170, 187, .2), rgba(163, 170, 187, 0)) 1 1;
  border-radius: 12px 0 0 12px;
  flex-shrink: 0;
  width: 480px;
  height: 345px;
  overflow: auto;
  padding: 20px;
}

.f {
  display: flex;
}

.f1 {
  flex: 1;
}

.ob-box-name {
  font-size: 14px;
  color: hsla(0, 0%, 100%, .8);
  line-height: 22px;
}

.ml6 {
  margin-left: 6px;
}

.cp {
  cursor: pointer;
}

.peple {
  color: aqua;
  font-family: PB;
}

.ob-box-online {
  font-family: din;
  color: #fff;
  font-weight: bolder;
  margin-top: 4px;
  font-size: 28px;
}

.fc {
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.arco-divider-horizontal {
  position: relative;
  clear: both;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  margin: 20px 0;
  border-bottom: 1px solid rgb(255, 255, 255, 0.12);
}

.arco-row-justify-start {
  justify-content: flex-start;
}

.arco-row-align-start {
  align-items: flex-start;
}

.arco-row {
  display: flex;
  flex-flow: row wrap;
}

@media (min-width: 1600px) {
  .arco-col-xxl-6 {
    flex: 0 0 25%;
    width: 25%;
  }
}

@media (min-width: 1200px) {
  .arco-col-xl-8 {
    flex: 0 0 33.33333333%;
    width: 33.33333333%;
  }
}

@media (min-width: 992px) {
  .arco-col-lg-12 {
    flex: 0 0 50%;
    width: 50%;
  }
}

.arco-col {
  box-sizing: border-box;
}

.data-name {
  font-weight: 400;
  font-size: 14px;
  color: hsla(0, 0%, 100%, .8);
  line-height: 22px;
  display: flex;
  align-items: center;
}

.data-value {
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  line-height: 28px;
  font-family: PB;
}

.peple {
  color: aqua;
  font-family: PB;
}

.arco-radio-group-button {
  background-color: #060d1b;
  border-radius: 10px;
}

.arco-radio-button, .arco-radio-group-button {
  line-height: 26px;
  border-radius: 10px;
}

.arco-radio-group-button {
  display: inline-flex;
  padding: 1.5px;
}

.arco-radio-group-button .arco-radio-button {
  line-height: 36px;
}

.arco-radio-button {
  position: relative;
  display: inline-block;
  margin: 1.5px;
  color: hsla(0, 0%, 100%, .7);
  font-size: 14px;
  background-color: transparent;
  cursor: pointer;
  transition: all .1s linear;
}


.arco-radio-button-content {
  color: hsla(0, 0%, 100%, .6);
  padding: 0 10px;
}

.arco-radio-button-content {
  position: relative;
  display: block;
  padding: 0 12px;
}

.arco-radio-checked .arco-radio-button-content {
  color: #fff !important;
  background: rgba(65, 79, 110, .6);
  border-radius: 8px;
}
</style>
