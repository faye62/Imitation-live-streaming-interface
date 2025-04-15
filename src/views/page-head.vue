<script setup>
import {ref, watch} from 'vue'
import avitor from "../assets/touf.jpeg";


const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  isLive: { // 接收直播状态
    type: Boolean,
    default: false
  }
})
const scrollbar = ref(true);
const LiveStreamingName = ref('直播标题')
watch(
    () => props.title,
    (newVal) => {
      LiveStreamingName.value = newVal
    },
    {immediate: true}
)
</script>

<template>
  <div class="page-head displayflex aligni-center justifyc-space-between cfff_7" data-v-3806f0bd="" data-v-8be5f75e="">
    <div class="left d-flex fc" data-v-3806f0bd=""><span class="callback-btn" data-v-3806f0bd=""><i class="el-icon"
                                                                                                    data-v-3806f0bd=""><svg
        data-v-3806f0bd="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path
        d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
        fill="currentColor"></path></svg></i> 返回首页 </span>
      <div class="left-tpinfo" data-v-3806f0bd="">ID&nbsp;&nbsp;922104408</div>
    </div>
    <div data-v-3806f0bd="">
      <div class="nothing"></div>
    </div>
    <div class="page-title flex1" data-v-3806f0bd="">
      <a-tag
          :color="isLive ? 'green' : 'red'"
          bordered
      >
        {{ isLive ? '直播中' : '已结束' }}
      </a-tag>
      <span class="title-name" data-v-3806f0bd="" style="margin-left: 16px;">{{ LiveStreamingName }}</span></div>
    <div class="func-btn d-flex aligni-center" data-v-3806f0bd="">
      <a-select :default-value="['商品订单','分销订单']" :scrollbar="scrollbar" :style="{width:'230px'}"
                multiple
                placeholder="Please select ...">
        <a-option>全部</a-option>
        <a-option>内容订单</a-option>
        <a-option>商品订单</a-option>
        <a-option>分销订单</a-option>
      </a-select>
      <div class="vzicon unselectable vzicon_refresh" data-v-3806f0bd="" data-v-ae23498c="" draggable="false"
           style="width: 24px; height: 24px; --0234b6ab: 0.6;"><img alt="refresh" data-v-ae23498c=""
                                                                    draggable="false"
                                                                    src="https://static.vzan.com/zhibo/static/iconfont/education/refresh.svg">
      </div>
      <div class="vzicon unselectable vzicon_fullscreen" data-v-3806f0bd="" data-v-ae23498c="" draggable="false"
           style="width: 24px; height: 24px; --0234b6ab: 0.6;"><img alt="fullscreen" data-v-ae23498c=""
                                                                    draggable="false"
                                                                    src="https://static.vzan.com/zhibo/static/iconfont/education/fullscreen.svg">
      </div>
      <div class="f fc" data-v-3806f0bd="" style="gap: 10px;">
        <img :src="avitor"
             alt=""
             class="headimgurl cp"
             data-v-3806f0bd="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-head {
  height: 48px;
  width: 100%;
  background-color: #060d1b;
  padding: 13px 20px;
}

.cfff_7 {
  color: hsla(0, 0%, 100%, .7);
}

.aligni-center {
  align-items: center;
}

.justifyc-space-between {
  justify-content: space-between;
}

.d-flex, .displayflex {
  display: flex;
}

.page-head .left[data-v-3806f0bd] {
  flex-shrink: 0;
}

.fc {
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.left-tpinfo {
  margin-left: 12px;
}

.d-flex, .displayflex {
  display: flex;
}

.page-title {
  padding-inline: 3%;
  margin-left: -3%;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  line-height: 22px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headimgurl {
  width: 24px;
  height: 24px;
  border-radius: 32px;
}

.flex1 {
  flex: 1;
  -webkit-flex: 1;
}

.page-head .func-btn {
  height: 100%;
  flex-shrink: 0;
  gap: 20px;
}

.aligni-center {
  align-items: center;
}

.callback-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.el-icon {
  --color: inherit;
  align-items: center;
  display: inline-flex;
  height: 1em;
  justify-content: center;
  line-height: 1em;
  position: relative;
  width: 1em;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
}


.live-status {
  margin-right: 16px;
  margin-left: 16px;
}

.arco-tag {
  border-radius: 4px;
}

.arco-tag-size-medium {
  height: 24px;
  font-size: 12px;
  line-height: 22px;
}

.arco-tag-bordered, .arco-tag-checkable.arco-tag-checked.arco-tag-bordered:hover {
  border-color: var(--color-border-2);
}

.arco-tag-checked {
  border-color: transparent;
}

.arco-tag-checkable:hover, .arco-tag-checked {
  background-color: var(--color-fill-2);
}

.arco-tag {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  height: 24px;
  padding: 0 8px;
  color: var(--color-text-1);
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: var(--border-radius-small);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
