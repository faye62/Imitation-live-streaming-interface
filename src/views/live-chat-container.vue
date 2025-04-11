<script setup>
import {nextTick, onBeforeUnmount, onMounted, ref} from 'vue'

// 虚拟弹幕库 - 直播带货相关
const barrageLibrary = [
  "这个价格太划算了！",
  "主播能再优惠点吗？",
  "已经下单了，期待收货",
  "质量怎么样啊？",
  "有没有小样赠送？",
  "包邮吗？",
  "什么时候发货？",
  "这个色号适合黄皮吗？",
  "主播能试穿一下吗？",
  "老顾客了，再给点优惠吧",
  "买三件能打折吗？",
  "支持7天无理由退货吗？",
  "有没有现货？",
  "快递发什么？",
  "这个和之前那款有什么区别？",
  "主播讲解得很详细",
  "已经收到货了，质量不错",
  "能开发票吗？",
  "学生党有优惠吗？",
  "这个季节适合用吗？",
  "敏感肌能用吗？",
  "保质期到什么时候？",
  "买二送一活动还有吗？",
  "主播声音真好听",
  "关注了，下次还来",
  "这个链接在哪？",
  "能再介绍下功能吗？",
  "有没有更多颜色选择？",
  "尺寸标准吗？",
  "第一次买，有点犹豫",
  "老用户回购有礼吗？",
  "赠品是什么？",
  "能组合购买吗？",
  "这个和专柜一样吗？",
  "生产日期新鲜吗？",
  "主播多高多重？参考下",
  "能包邮到新疆吗？",
  "下单后多久能到？",
  "有没有防伪标识？",
  "这个适合送人吗？"
]

// 虚拟用户名库
const userNames = [
  "购物达人小张", "爱买买的小李", "剁手党老王", "省钱小能手",
  "网购专家", "品质生活家", "美妆控", "时尚买手",
  "居家好物推荐官", "数码爱好者", "美食家", "旅行达人",
  "健康生活", "运动爱好者", "宝妈购物", "学生党省钱",
  "上班族购物", "退休生活", "精致女孩", "品质男士"
]

// 虚拟用户头像库
const userAvatars = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg"
]

const chatList = ref([])
let timer = null
const chatListContainer = ref(null)
const isUserScrolling = ref(false)
let lastScrollTop = 0
let scrollTimeout = null
// 滚动到底部
const scrollToBottom = () => {
  if (!isUserScrolling.value && chatListContainer.value) {
    nextTick(() => {
      chatListContainer.value.scrollTop = chatListContainer.value.scrollHeight
    })
  }
}

// 处理滚动事件
const handleScroll = () => {
  if (chatListContainer.value) {
    const {scrollTop, scrollHeight, clientHeight} = chatListContainer.value
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50

    // 如果用户滚动到接近底部，取消用户滚动状态
    if (isNearBottom) {
      isUserScrolling.value = false
    }
    // 如果用户向上滚动，标记为用户正在滚动
    else if (scrollTop < lastScrollTop) {
      isUserScrolling.value = true
      // 3秒后如果没有新的滚动操作，重置状态
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isUserScrolling.value = false
      }, 3000)
    }

    lastScrollTop = scrollTop
  }
}

// 生成随机消息
const generateRandomMessage = () => {
  const randomBarrage = barrageLibrary[Math.floor(Math.random() * barrageLibrary.length)]
  const randomName = userNames[Math.floor(Math.random() * userNames.length)]
  const randomAvatar = userAvatars[Math.floor(Math.random() * userAvatars.length)]

  return {
    id: Date.now(),
    name: randomName,
    avatar: randomAvatar,
    content: randomBarrage,
    isTop: Math.random() > 0.9 // 10%概率是置顶消息
  }
}

// 开始生成消息
const startGeneratingMessages = () => {
  // 初始生成5条消息
  for (let i = 0; i < 5; i++) {
    chatList.value.push(generateRandomMessage())
  }
  scrollToBottom() // 添加初始滚动

  // 每隔2-5秒生成一条新消息
  timer = setInterval(() => {
    const newMessage = generateRandomMessage()
    chatList.value.push(newMessage)
    scrollToBottom() // 每次添加消息后滚动

    // 限制消息数量，最多保留100条
    if (chatList.value.length > 100) {
      chatList.value.shift()
    }
  }, 2000 + Math.random() * 3000)
}
onMounted(() => {
  startGeneratingMessages()
  if (chatListContainer.value) {
    chatListContainer.value.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (scrollTimeout) clearTimeout(scrollTimeout)
  if (chatListContainer.value) {
    chatListContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="live-chat-container">
    <!-- 直播窗口 -->
    <!--    <div class="live-window">-->
    <!--      <div class="live-placeholder">直播画面</div>-->
    <!--      <div class="live-controls">-->
    <!--        <button class="control-btn">开始直播</button>-->
    <!--        <button class="control-btn">结束直播</button>-->
    <!--        <button class="control-btn">设置</button>-->
    <!--      </div>-->
    <!--    </div>-->

    <!-- 聊天列表 -->
    <div class="tab-content">
      <div class="chat-list-header">
        <div class="tab-list d-flex">
          <div class="tab-item active">聊天</div><!---->
          <div class="tab-item fc"><span>用户列表</span></div>
        </div>
        <div class="fold-button cp"><i class="el-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"
                fill="currentColor"></path>
          </svg>
        </i><span style="margin-left: 4px">恢复</span></div>
      </div>
      <div class="chat-list-content">
        <div ref="chatListContainer" class="chat-list" @scroll="handleScroll">
          <div v-for="item in chatList" :key="item.id" :class="{ 'chatitem-topone': item.isTop }" class="chat-item">
            <div class="chat-item-header d-flex">
              <div class="chat-item-header-left d-flex">
                <img :src="item.avatar" alt="">
                <div class="chat-item-header-left-info">
                  <div class="chat-item-header-left-info-name">{{ item.name }}</div>
                </div>
              </div>
            </div>
            <div class="chat-item-content">
              <span class="content-word">{{ item.content }}</span>
            </div>
          </div>
        </div>
        <div class="chat-box d-flex flexd-column" data-v-c7475c60=""><!---->
          <div class="chat-meun" data-v-c7475c60="">
            <div class="d-flex" data-v-c7475c60="">
              <div class="vzicon unselectable vzicon_face face cp" data-v-ae23498c="" data-v-c7475c60=""
                   draggable="false" style="width: 26px; height: 26px; --0234b6ab: 0.6;">
                <img alt="face" data-v-ae23498c=""
                     draggable="false" src="https://static.vzan.com/zhibo/static/iconfont/education/face.svg"></div>
              <div class="vzicon unselectable vzicon_image cp" data-v-ae23498c="" data-v-c7475c60="" draggable="false"
                   style="width: 26px; height: 26px; --0234b6ab: 0.6;"><img alt="image" data-v-ae23498c=""
                                                                            draggable="false"
                                                                            src="https://static.vzan.com/zhibo/static/iconfont/education/image.svg">
              </div>
            </div>
            <div class="f fc" data-v-c7475c60="" style="color: rgb(255, 255, 255);"><label aria-disabled="false"
                                                                                           class="arco-checkbox arco-checkbox-checked"
                                                                                           data-v-c7475c60=""><input
                checked="" class="arco-checkbox-target" type="checkbox" value="false">
              <div class="vzicon unselectable vzicon_quanyuanjinyan" data-v-ae23498c="" data-v-c7475c60=""
                   draggable="false"
                   style="width: 26px; height: 26px; opacity: 1; --0234b6ab: 0.6;"><img alt="quanyuanjinyan"
                                                                                        data-v-ae23498c=""
                                                                                        draggable="false"
                                                                                        src="https://static.vzan.com/zhibo/static/iconfont/education/quanyuanjinyan.svg">
              </div>
              全员禁言 <label aria-disabled="false" class="arco-checkbox arco-checkbox-checked"
                              data-v-c7475c60=""><input checked="" class="arco-checkbox-target"
                                                        type="checkbox"
                                                        value="false"><span
                  class="arco-icon-hover arco-icon-hover-disabled arco-checkbox-icon-hover"><div
                  class="arco-checkbox-icon"><svg aria-hidden="true" class="arco-checkbox-icon-check"
                                                  fill="currentColor"
                                                  focusable="false" height="200" viewBox="0 0 1024 1024"
                                                  width="200"><path
                  d="M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z"
                  p-id="840"></path></svg></div></span><!----></label><!----></label></div>
          </div>
          <div class="chat-input arco-textarea-wrapper" data-v-c7475c60="" type="text">
            <div class="arco-textarea-mirror"
                 style="border-width: 0px; box-sizing: border-box; font-family:PingFang ; font-weight: 400; font-size: 14px; font-variant: normal; letter-spacing: normal; line-height: 22.001px; padding: 4px 12px; text-indent: 0px; text-rendering: auto; text-transform: none; white-space: pre-wrap; overflow-wrap: break-word; width: 326px;">
            </div>
            <textarea class="arco-textarea" placeholder="说点什么吧～, 按回车发送"
                      style="height: 30px; resize: none; overflow: hidden;"
                      value=""></textarea><!--v-if--><!--v-if--></div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.live-chat-container {
  max-width: 376px;
  width: 376px;
  min-width: 376px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.tab-content {
  position: relative;
  display: flex;
  width: 100%;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0;
  flex-shrink: 0;
  border-radius: 12px;
  background: #1a202d;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
}

.chat-list-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.tab-list {
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 2px;
  border-radius: 10px;
  background: #060d1b;
}

.tab-item {
  display: flex;
  width: auto;
  height: 34px;
  border-radius: 8px 8px 8px 8px;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  gap: 0;
  color: hsla(0, 0%, 100%, .6);
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  border-radius: 8px;
  cursor: pointer;
}

.tab-item.active {
  background: rgba(65, 79, 110, .6);
  color: #fff;
}

.fold-button {
  font-weight: 400;
  font-size: 14px;
  color: #a3aabb;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  display: flex;
  align-items: center;
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

.chat-list-content {
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.chat-box {
  position: relative;
  display: flex;
  flex-direction: column;
}

.chat-meun {
  display: flex;
  width: 100%;
  padding: 0;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.face {
  margin-right: 12px;
}

.vzicon {
  opacity: .6;
  vertical-align: -.15em;
  cursor: pointer;
}

.d-flex {
  display: flex;
}

.fc {
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.f {
  display: flex;
}

.chat-input {
  display: flex;
  padding: 8px 12px;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  border-radius: 10px;
  background: rgba(6, 13, 27, .6);
  line-height: 18px;
  resize: none;
}

.chat-list {
  flex: 2;
  overflow-y: scroll;
  padding: 8px 0;
  margin: 8px 0;
}

.chat-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-item-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.chat-item-header-left {
  display: flex;
  align-items: center;
}

.chat-item-header-left-info-name {
  color: hsla(0, 0%, 100%, .6);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.chat-item-header-left img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
}

.chat-item-content {
  display: flex;
  max-width: 100%;
  margin-left: 28px;
}

.content-word {
  max-width: 280px;
  padding: 8px 12px;
  border-radius: 4px 12px 12px 12px;
  background: #2a3142;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
