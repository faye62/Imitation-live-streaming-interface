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
          <div class="stats-container">
            <div class="room-id">ID：092104498</div>
            <div class="stats-numbers">
              <div class="stat-item">
                <div class="stat-label">评论次数</div>
                <div class="stat-value">2148</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">评论人数</div>
                <div class="stat-value">473</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">互动率</div>
                <div class="stat-value">34%</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">总曝光</div>
                <div class="stat-value">4981</div>
              </div>
            </div>
            <div class="time-stats">
              <div class="stat-item">
                <div class="stat-label">直播时长</div>
                <div class="stat-value">01:16:21</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">打赏次数</div>
                <div class="stat-value">0</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">打赏人数</div>
                <div class="stat-value">0</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">观看人数</div>
                <div class="stat-value">0</div>
              </div>
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
        <div class="chat-area">
          <div class="chat-header">
            <div class="tab active">聊天记录</div>
            <div class="tab">商品列表</div>
          </div>
          <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index" class="message">
              <div class="avatar"></div>
              <div class="message-content">
                <div class="user-info">
                  <span class="user-name">{{ message.username }}</span>
                  <span class="time">{{ message.time }}</span>
                </div>
                <div class="message-text">{{ message.content }}</div>
              </div>
              <div class="message-actions">
                <span @click="handleReply(message)">回复</span>
                <span @click="handleBan(message)">禁言</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import * as echarts from 'echarts';
import PageHead from "@/views/page-head.vue";
import LiveChatContainer from "@/views/live-chat-container.vue";

const active = ref('customer');
const chartRef = ref(null);
let chart = null;
const chatInput = ref('');
const chatMessages = ref([
  {username: '用户1', content: '主播好'},
  {username: '用户2', content: '画面很清晰'},
  {username: '用户3', content: '主播讲解的很详细'},
]);

const sendMessage = () => {
  if (chatInput.value.trim()) {
    chatMessages.value.push({
      username: '我',
      content: chatInput.value
    });
    chatInput.value = '';
  }
};

// 模拟消息数据
const messages = ref([
  {
    username: '6M@2-11111',
    content: '欢迎光临',
    time: '2024-04-19 11:41:32',
    avatar: ''
  },
  {
    username: '潘军军',
    content: '欢迎光临',
    time: '2024-04-19 10:47:14',
    avatar: ''
  },
  {
    username: '张明明',
    content: '电力',
    time: '2024-04-19 10:34:47',
    avatar: ''
  }
]);

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

// 处理消息操作
const handleReply = (message) => {
  console.log('回复消息:', message);
};

const handleBan = (message) => {
  console.log('禁言用户:', message);
};

const handleDelete = (message) => {
  console.log('删除消息:', message);
};

// 监听窗口大小变化
const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
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

.room-id {
  color: #8c8c8c;
  margin-bottom: 10px;
}

.stats-numbers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.time-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  color: #8c8c8c;
  font-size: 12px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.main-content {
  display: flex;
  padding: 0 8px 8px 8px;
  height: calc(100% - 48px);
  width: 100vw;
}

.left-sidebar {
  width: 200px;
  background-color: #1a1f2c;
  border-right: 1px solid #2a2f3c;
  padding: 20px;
}

.logo-area {
  text-align: center;
  margin-bottom: 30px;
}

.slogan {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 10px;
}

.nav-menu .nav-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.nav-menu .nav-item.active {
  background-color: #2a2f3c;
  border-radius: 4px;
}

.nav-icon {
  margin-right: 10px;
}

.stats-container {
  padding: 20px;
  border-right: 1px solid #2a2f3c;
  display: flex;
  flex-direction: column;
}

.chart-area {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-area {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #2a2f3c;
}

.tab {
  padding: 8px 16px;
  cursor: pointer;
}

.tab.active {
  color: #409EFF;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2a2f3c;
  margin-right: 10px;
}

.message-content {
  flex: 1;
}

.user-name {
  color: #409EFF;
  margin-bottom: 5px;
}

.message-actions {
  color: #8c8c8c;
  font-size: 12px;
}

.message-actions span {
  margin-left: 10px;
  cursor: pointer;
}

.chart-container {
  height: 300px;
  background-color: #1a1f2c;
}

.chart-tabs {
  display: flex;
  gap: 20px;
  padding: 10px 20px;
}

.chart-tabs .tab {
  color: #8c8c8c;
  cursor: pointer;
}

.chart-tabs .tab.active {
  color: #409EFF;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.time {
  color: #8c8c8c;
  font-size: 12px;
}

.message-actions {
  display: flex;
  gap: 15px;
}

.message-actions span:hover {
  color: #409EFF;
}
</style>
