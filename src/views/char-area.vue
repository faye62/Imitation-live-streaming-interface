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

const messages = ref([])
const containerRef = ref(null)
let timer = null
let scrollTimer = null
let isUserScrolling = false

// 滚动到底部
const scrollToBottom = () => {
  if (!isUserScrolling && containerRef.value) {
    nextTick(() => {
      containerRef.value.scrollTop = containerRef.value.scrollHeight
    })
  }
}

// 处理滚动事件
const handleScroll = () => {
  if (containerRef.value) {
    const {scrollTop, scrollHeight, clientHeight} = containerRef.value
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50

    if (isNearBottom) {
      isUserScrolling = false
    } else if (scrollTop < lastScrollTop) {
      isUserScrolling = true
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        isUserScrolling = false
      }, 3000)
    }

    lastScrollTop = scrollTop
  }
}

// 修改后的时间生成逻辑
let lastMessageTime = new Date() // 记录最新消息的时间

const generateRandomMessage = () => {
  const randomBarrage = barrageLibrary[Math.floor(Math.random() * barrageLibrary.length)]
  const randomName = userNames[Math.floor(Math.random() * userNames.length)]
  const randomAvatar = userAvatars[Math.floor(Math.random() * userAvatars.length)]

  // 生成比最新消息早1-10秒的时间（因为是倒序）
  const newTime = new Date(lastMessageTime.getTime() - (1000 + Math.random() * 9000))
  lastMessageTime = newTime

  // 格式化时间为 HH:MM:SS
  const hours = String(newTime.getHours()).padStart(2, '0')
  const minutes = String(newTime.getMinutes()).padStart(2, '0')
  const seconds = String(newTime.getSeconds()).padStart(2, '0')
  const formattedTime = `${hours}:${minutes}:${seconds}`

  return {
    id: Date.now() + Math.random().toString(36).substring(2, 9),
    username: randomName,
    content: randomBarrage,
    time: formattedTime,
    avatar: randomAvatar,
    status: Math.random() > 0.5 ? '已通过' : '待审核'
  }
}
// 修改后的消息生成和滚动逻辑
const startGeneratingMessages = () => {
  // 初始生成10条消息（最新的在最前面）
  for (let i = 0; i < 10; i++) {
    messages.value.unshift(generateRandomMessage())
  }
  scrollToBottom()

  // 每隔2-5秒生成一条新消息（插入到数组开头）
  timer = setInterval(() => {
    const newMessage = generateRandomMessage()
    messages.value.unshift(newMessage)

    // 限制消息数量，最多保留100条（从末尾删除）
    if (messages.value.length > 100) {
      messages.value.pop()
    }

    // 如果用户没有手动滚动，保持滚动到顶部（显示最新消息）
    if (!isUserScrolling) {
      nextTick(() => {
        if (containerRef.value) {
          containerRef.value.scrollTop = 0
        }
      })
    }
  }, 2000 + Math.random() * 3000)
}
onMounted(() => {
  // 从当前时间开始生成消息
  lastMessageTime = new Date()
  startGeneratingMessages()

  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (scrollTimer) clearTimeout(scrollTimer)
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="ob-content">
    <div class="ob-components">
      <div class="disflex justifysb" hasgoods="handleHideShopPanel"
           style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
        <div class="top-menu f">
          <div class="bar-item mode-chat__selected">
            <div class="bar-icon"></div>
            <div class="bar-name">聊天审核</div>
          </div>
          <div class="bar-item mode-goods">
            <div class="bar-icon"></div>
            <div class="bar-name">直播商品</div>
          </div>
          <div class="bar-item mode-coupon">
            <div class="bar-icon"></div>
            <div class="bar-name">优惠券</div>
          </div>
          <div class="bar-item mode-push">
            <div class="bar-icon"></div>
            <div class="bar-name">卡片推送</div>
          </div>
          <div class="bar-item mode-luckybag">
            <div class="bar-icon"></div>
            <div class="bar-name">福袋</div>
          </div>
          <div class="bar-item mode-more el-tooltip__trigger el-tooltip__trigger">
            <div class="bar-icon"></div>
            <div class="bar-name">更多</div>
          </div>
        </div>
        <div class="fold-button cp"><i class="el-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
                fill="currentColor"></path>
          </svg>
        </i><span>展开</span></div>
      </div>
      <div class="ob-scroll">
        <div class="a-custom">
          <header class="sticky-options">
            <section class="f fc gap10">
              <div class="top-menu f gap10 f1 pt10 pb10">
                <button
                    class="arco-btn arco-btn-primary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal"
                    type="button"
                >
              <span class="arco-btn-icon">
                <svg class="arco-icon arco-icon-check-circle" fill="none" stroke="currentColor"
                     stroke-linecap="butt" stroke-linejoin="miter" stroke-width="4" viewBox="0 0 48 48"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="m15 22 7 7 11.5-11.5M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"></path>
                </svg>
              </span>
                  批量通过
                </button>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal"
                    type="button"
                >
              <span class="arco-btn-icon">
                <svg class="arco-icon arco-icon-minus-circle" fill="none" stroke="currentColor"
                     stroke-linecap="butt" stroke-linejoin="miter" stroke-width="4" viewBox="0 0 48 48"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 24H16m26 0c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"></path>
                </svg>
              </span>
                  批量不通过
                </button>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal"
                    type="button"
                >
              <span class="arco-btn-icon">
                <svg class="arco-icon arco-icon-delete" fill="none" stroke="currentColor"
                     stroke-linecap="butt" stroke-linejoin="miter" stroke-width="4" viewBox="0 0 48 48"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M5 11h5.5m0 0v29a1 1 0 0 0 1 1h25a1 1 0 0 0 1-1V11m-27 0H16m21.5 0H43m-5.5 0H32m-16 0V7h16v4m-16 0h16M20 18v15m8-15v15"></path>
                </svg>
              </span>
                  批量删除
                </button>
                <div class="f1"></div>
                <label class="f fcc" style="height: 32px">推荐状态:</label>
                <a-select :style="{width:'120px'}" default-value="全部" style="height: 32px;border-radius: 8px">
                  <a-option>全部</a-option>
                  <a-option>已推荐</a-option>
                  <a-option>未推荐</a-option>
                </a-select>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal"
                    type="button"
                >
                  更多操作
                  <div class="ml10">
                    <svg class="arco-icon arco-icon-down" fill="none" stroke="currentColor"
                         stroke-linecap="butt" stroke-linejoin="miter" stroke-width="4" viewBox="0 0 48 48"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M39.6 17.443 24.043 33 8.487 17.443"></path>
                    </svg>
                  </div>
                </button>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal"
                    type="button"
                >
                  设置
                </button>
                <div>
                  <button
                      class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal arco-btn-only-icon"
                      type="button"
                  >
                <span class="arco-btn-icon">
                  <svg class="arco-icon arco-icon-refresh" fill="none" stroke="currentColor"
                       stroke-linecap="butt" stroke-linejoin="miter" stroke-width="4" viewBox="0 0 48 48"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M38.837 18C36.463 12.136 30.715 8 24 8 15.163 8 8 15.163 8 24s7.163 16 16 16c7.455 0 13.72-5.1 15.496-12M40 8v10H30"></path>
                  </svg>
                </span>
                  </button>
                </div>
              </div>
            </section>
            <div class="page-table-head">
              <label class="arco-checkbox cfff_6">
                <input class="arco-checkbox-target" type="checkbox" value="false">
                <span class="arco-icon-hover arco-checkbox-icon-hover">
              <div class="arco-checkbox-icon"></div>
            </span>
                <span class="arco-checkbox-label">全选聊天内容</span>
              </label>
              <label class="arco-checkbox cfff_6">
                <input class="arco-checkbox-target" type="checkbox" value="false">
                <span class="arco-icon-hover arco-checkbox-icon-hover">
              <div class="arco-checkbox-icon"></div>
            </span>
                <span class="arco-checkbox-label">查看敏感词屏蔽记录</span>
              </label>
            </div>
          </header>

          <div ref="containerRef" class="page-table">
            <div v-for="item in messages" :key="item.id" class="f page-table-item">
              <div class="pt10">
                <label class="arco-checkbox">
                  <input class="arco-checkbox-target" type="checkbox" value="false">
                  <span class="arco-icon-hover arco-checkbox-icon-hover">
                <div class="arco-checkbox-icon"></div>
              </span>
                </label>
              </div>
              <div class="pl10">
            <span class="arco-badge">
              <div class="arco-avatar arco-avatar-circle" style="width: 40px; height: 40px; font-size: 20px;">
                <span class="arco-avatar-image">
                  <img :alt="item.username" :src="item.avatar">
                </span>
              </div>
              <span class="arco-badge-text" style="background: rgb(0, 108, 255); color: rgb(255, 255, 255);">普通</span>
            </span>
              </div>
              <div class="pl16 f1">
                <div class="f fv">
                  <div class="page-table-item-name">{{ item.username }}</div>
                  <div class="f fc id-time">
                    <div class="mw100">ID {{ Math.floor(Math.random() * 1000000000) }}</div>
                    <div class="pl12">{{ item.time }}</div>
                  </div>
                  <div class="page-table-item-content">
                    <span class="line2 break-word">{{ item.content }}</span>
                  </div>
                </div>
              </div>
              <div>
                <div class="mt8">
                  <div class="comment-state">
                    <span :style="{ background: item.status === '已通过' ? 'rgb(0, 184, 73)' : 'rgb(255, 125, 0)' }"
                          class="state-ball"></span>
                    <p class="state-text">{{ item.status }}</p>
                  </div>
                </div>
              </div>
              <div class="w10"></div>
              <div class="f">
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal ml8"
                    type="button"
                >
              <span class="arco-btn-icon">
                <svg class="arco-icon arco-icon-minus-circle" fill="none" stroke="currentColor"
                     stroke-linecap="butt" stroke-linejoin="miter" stroke-width="4" viewBox="0 0 48 48"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 24H16m26 0c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"></path>
                </svg>
              </span>
                  不通过
                </button>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal ml8"
                    type="button"
                >
                  禁言
                </button>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal ml8"
                    type="button"
                >
                  拉黑
                </button>
                <button
                    class="arco-btn arco-btn-secondary arco-btn-shape-square arco-btn-size-medium arco-btn-status-normal ml8"
                    type="button"
                >
                  推荐
                </button>
              </div>
            </div>
          </div>

          <div class="f f-e mt8 pb12 pr10">
            <a-pagination :total="1630" show-total/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ob-content {
  background: #1a202d;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid #1a202d;
  position: relative;
  flex: 1;
  margin-top: 8px;
  max-width: 79vw;
}

.ob-components {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.justifysb {
  justify-content: space-between;
}

.disflex {
  display: flex;
}

.top-menu {
  text-align: center;
  position: relative;
  padding: 4px 20px;
  padding-right: 0;
  height: 40px;
  flex: 1;
  display: flex;
  justify-content: center;
}

.top-menu .bar-item {
  flex-shrink: 0;
  cursor: pointer;
  margin-right: 20px;
  display: flex;
  align-items: center;
  padding: 8px 8px;
}

.top-menu .mode-chat__selected .bar-icon {
  background: url(data:image/png;base64,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) no-repeat 50%;
  background-size: 100% 100%;
}

.top-menu .bar-item .bar-icon {
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  margin-right: 6px;
}

.top-menu .mode-goods .bar-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAAAXNSR0IArs4c6QAAA4NJREFUaEPdmT1rFUEUht+3sFAQFbRQBAtFEMFGCy0EFQQLtbDTH2BaQbE12giiP8D8ATsLY6FFNBiLFKYJQkAiqEUsFDQEo2BxvC/Mhsl+zc7s3ps1A1OEuzPnPHO+Zk6ITTA4DAYzOw5A8zCA7Z6MDwCmSc51KbdTCKf8dQdQp+dXABMkJ7uA6QzCzKS8Zsx4PrDUI5IrMYvy33YCYWbjAC7mNpfLyH00NfY6C8nN/CGrjJFcSgVpDVFiASk1XuX3ZrYPwJ2cy82RHNsQCBcDj3OBe6vJqZbAK0YmUkBaWWIAocCUm2hEu4WZPRxkqzNuveLickp8JEOYmYRLiWzIAtMxJ2lmSr/PvDSsIH8Ss4e+bQPhB3OyT5vZTQBXneJJ+7SBeO2d4N3UnJ+LqxWSZ0diCecGgsjGNZJZKo3SwWUruVQ2FBdR6TbJEnnBJE9EaZ772MzebSSEDkHzdBsIADOD2mFuDs8SZrbHpdOdAPYDuOcpfrslxANvvfb9BOCn0jbJb6G9g+7klD8CYLe32daBkBsAdgH4AeB+SFDgdx9C1fy39/0qgAWSn6v2qIUwMymvWTYEcBDAewB/WkKcB3B0cP9SbLyt2EsgC2W/VUIEAFrqnLx8nuRifnUphJltA3AhWdRwF74k+csXUQWh6/KB4eqSvPsiyfkmELKCrNHHsUryRS2EmW0BcKmP2ns6TZL8m/1dcKfIeFCQfQQgcLngjkj41PXr4qINxBLJ2UzpBAt+Ibl23Yg8vM4gCgFmZjGxVMj7ZiY3llVDox5Cq83sSmgXAKqkU5lvRp6ktv9O8o1nSb29TzaQC5JPu8xOApFf6/QONTxFX37K+mWSU00gTnlv5yaHM8pv1llQgv/HYrcuIdRB1F38RnnqZbIKCaHKErpy5Dt1G618Jn82/3ytgtDD51xftM7pMZN/KG3eW2xErRi5sfI1ojKwHURM9R0VTKFGhCD6WCsKNSIE0ceHUaFGhCD6WCtKmwV1jYI+1opCjQhZoo+1Qrfm5XwWCfWdmt7vR5GdCm/rTGgIok9xURrUte7kaoXeCaoXTV5bw7SGmgKv8v2mRpZwIH0I8NKAbgzhQPR0PLYBvShZQK3LymZy0J18/3BvaMWIWvzDbqxJeT171YxY6y9V+WuwtV+20LX71WNSGu4CSIpq6n8Suh8F/yfh65UEMcwITtn7H1QmVEBRDB5tAAAAAElFTkSuQmCC) no-repeat 50%;
  background-size: 100% 100%;
}

.top-menu .mode-coupon .bar-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAAAXNSR0IArs4c6QAAAodJREFUaEPtma9SHTEUxr9P1HSmrhXU1HQ6U1NTUwcPAA/QF+AFWk8Vij4APAD1LQIEg8AgwGAwNSCKqCnDgEGc8nWyTNibsCF7k957ZzOzarPn5JeT8ydniRkYnAEGDBCTYsXBElNnCTN7CeANgGcA5iIARySP9M7MXgB4ngl6DeAGwDXJP10yHjxOZvYewBKAebf4LnkbJDccxFsAevoOwZwDOCF5FRIWhTCzZQB6HjNKQPj6BXLSXlAQIhNAsktDSMcIyAiEO/vfH7P93twaEFK3T/J3ozcE8QXAYibEFkl9L8eWP73KlNP12RnJw4cg9hKdOKZoC8CPggDSe0NSOv6Ne5YwM4XQza5tSHi/mjCn75SdJlq1IRYArPWVDqAGxAHJXyFLKCesTAmEEutpCCInN4SYa1jiLtS2j9MA4coDhdgzAB8APBnD0YyJiFqir0/4ye4dgNfVIVySEohCrSJVrFqNra1Wxpb+sGO3V5ZRQ5WGuACgcuOiiUwj0Sm0vbcJUMlPlkkZJSGCFWwqxCcAH1MIClaxuhxtx9bQecc2s0mA+EnyuA+ECq1UBy91nPIhJsix5ci7yZYwsybE6j6Q6tCN/FKWkPw0x3YAfQrAbyS/unwzrkaBbwB1QVS5xkNsxvFpW/gSwGdXdsiSTxOjWs60oYpN2bX/Wor3LQAbwBoQ0eM0E9dT9Vtze07+MathiV2SKghHf7KY2XS3bFx8n4nmmeL7ekoICswpmbF9dXc9p2gp3iPp1YDobig3uJkgpSHSW/seiKKV2jiT8JPl1O+E+2er81LkAamiFVTN310q9IJ/h7IgMh29ymfJlqiymkwlA0Tmxo39s8ESY9/STIF/Aa5uQkBh2/PpAAAAAElFTkSuQmCC) no-repeat 50%;
  background-size: 100% 100%;
}

.top-menu .mode-push .bar-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAAAXNSR0IArs4c6QAAAztJREFUaEPtWT1rFUEUPaewEURbbSwE/4CNjR8/QH+Af8A/4A+wszJ2FhbaaWUsjIUgQTGNoGlSKIaAmMKgplDEIKS48cCs7Hu7s3Nn37xBwrvweMXOzN4z59w7d+4Sh8B4CDBgAeJ/YXHBRIoJMzsF4DSA4wCOhvH7APbC7zuAnyT1P9rmwoSZnQBwvuW4x8FdAD8A7OSCKg4iALgA4IjH88gYsbUD4APJ36l1ioIwM0nmYiYDKR+3U2BKgzgXYiDlWO5zxdAbkpJbx2YGEYL3EoAzAN7nepcxXhJb6wMyCkRw/AoA7bx+smcANjKcGjN0j+Tz6YluEGZ2DIAcv9xyvL3eXaXLMZ5lzhEbEynZBcLMrgG4DkBA+uwrgPuZzowdvk3yXXvyIIggm5uRnW+v8xbAi7FeZc7rSCoKIgC4B+Ck4yWPAWw6xpUYkgVixQlAjt0B8KeEh4419knKt3/Wy4SZXQUgGXmsZjzIHx8TZnY7ZCEPCKVVpddatkvytYeJlwOZaNrZGudD+51bJCfOo5icJlJYYouVWiWpWrZO8rOHCS8IHW465GraKsmJQzXGhFdOHwEsV0TQyUx6dwzEIwBnHc7pgNNBV8s6QT0E4gYAlRopewhgQp+pCTM+3yC5Nb1GjAkVeUqzKat5yMmXTvE3xIQKvaeONHsrhbLkc5JP+tYbqp1UNzV3hb65KjPERC3rjYcoE3rgLD1qMtE55JrdG2JCklKqHbKaMaE79pcsOQU2UpKqmZ1WSOqe3bHUpUhpVuk2ZrUuQ9F4GIyJwERKUgruB6FzN88A79RL7Zcl79hmlpKUij/Jal6Xot4ORy6IlKS0noCohuptbs1I0SALSTk5JdX4qMpyrXDvSR3z1dQmJOXkzFLt9zRg1EOdhRm1LlVmlGkom5lObsVGrklmAqMi8VsGKBV56oj3ptRpJ1xMjGAjBlagmp9AfWolBDHYfJ/IYjAHhL76KAvFuoA5LK3/XWeJZJFelRtEYGOsrDT9V+iKvCIpEMUsC0QAohvfkrOxNjfHs86J2HaFKlddcoFqJKZPVLp3a6c3S+94zJdsJoppoOBCCxAFN3OmpRZMzLR9BScfAGxNGEDYYvUFAAAAAElFTkSuQmCC) no-repeat 50%;
  background-size: 100% 100%;
}

.top-menu .mode-luckybag .bar-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAAAXNSR0IArs4c6QAAAoZJREFUaEPtmTGPElEQx///QgrJxZBos42N0e5C4jUSNIqNjY2d5wcwVBRKbSz4DGhlpxU2NlIo5gpiwRWHDbnurrDxLAzRhFwxOoZN1nWX997ushBuNyFAdmZ2fjPzZuA9YgMubgADCoh1yWKqTIjIOQA3AFwEcAzggOSpDVwa3bD9xBBzJ24BuBAw+gPAngkkjW5UgBJBxDjh218IkkY3LsNJIe6GMhC2HwliAPBtnJDcsylJX8YZQkQuAbhp8ZB/QCwBfLMfSKq+1ZUEQhfzPQD6brr+gsyFwusnTlcbw0eSP03GrTIhIg8B3AZw3dbgkuQOAbwh+c5pYYvIfQDPluRUUrNPSX6ybrEi8hrA1aRPW5LePsnHLhCjJTmSyizJnQIiVQgzUj6TmXi5Bq01nL9Dkrsua0JnxJOMqiArM8+jZsXCiT2fFQqz6la7Px92/80IjY7Vzw4ReWAK5Xg83mq1Wo9McsH7g8HghY08ybeL5AqIYHSKTBhqqignP0DFwl5QKkV3CgSnaLFnosWWy+VpvV4fK+xwONyeTqdbPnipVJr1+/1XazWx1Zlms3lnMplc08/VavVLu90eeZ430+86DLvd7o5/v1arjTqdjtW/x9zmhB/RXq/nVSqVWaPR+B4VZdP9KJ3cIWzKw1WmgHCZ2K7RdZHfhEycxu38+YHIbNi5RNZR9hfJ91n8KdIN5POOD89K3LjVb5sJ3dHWI61VXMckF84TW4grALZXQfDnGOEzya9ZlJOeRejpUN4lZVwPCmeVCRUUEQXQssoL5ASA7oIbD1usIQIz4zIAbw4TPDlNW216QqQvdf6I5Ddbg84QtobzlCsg8ox26u60Ls7G+fEb551SQAcFMWEAAAAASUVORK5CYII=) no-repeat 50%;
  background-size: 100% 100%;
}

.top-menu .mode-more .bar-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApNJREFUaEPtmLFuVDEQRe8taJCgB0FDQUNDQQ0/AOmBng+ADwA+IHxAekgPaVOkT5EiDRSkiBRqgpQGpIEbeaVk8zwee72JVnikpy3Wb+wzY3vmPmLFjSu+fgyAq87gyMDIwIIRCG8hM7sB4DmAZwBupXm/AdCzQfKoZi1mdg3APQB3AFxP7/4EcCyfJE8i/kIAZqZFvwYgiCn7lSA2I5Oa2V0ADwAIYsp+J4jvJX9FADNT1N+UHKX/35P84o01M0Vdi4/YHslDb6ALYGa3AXx0Ij/vW5lYI6nfC2Zm2iqPncjPv6NMbJPU76SVAN4BeBoJ1ZkxOg8bGYCHALR9akzn4WsrwCcA92tmA3BEci0D8ATAzUp/JyS3WwF2Kyc7HU7yUQZAl0G1eeeqtIVWHkA3yuzOD0eucwaOSe60bqFX//a0nirrDHBIcq8VQIXrc8U12vsM/AGw41XlSCHTwXtbk4KOGdgneeDNXQTQy6kaayvlWolzc3QAUOS1eLcKn9540cimqiwI1QWvNmySXM9co2oh1ErkTA2cFn3gVd+zL4cBoqCXPW4AXHbE5+cbGRgZWDAC4S2U0cRT03vXqJSdFF7OqjV2CCCgiaOFLNrdhjV2EaBSE5d6oSjALCBFjV3SA7WauDeAq7GLrYSZtWhiT5HVZkBrzGrsCECLJu4NkNXYEYCWiPUGyPr7LwBaNLG+47zItNNd/UUy0KKJt0jq8F8wM+vqLwJQq4l17b3MfalO1bxGY7v+igAakKpwVBOvk3S/UPf2V6zECUL9i6eJFakPpS/Tsz0V0NhhfyGABKGqPK+JfwDQwVQDN/lFOte1ZTR2tb8wwIJd79JeHwBLC23Q8chAMFBLGzYysLTQBh3/BRTwHkAXt8DsAAAAAElFTkSuQmCC) no-repeat 50%;
  background-size: 100% 100%;
}

.top-menu .bar-item .bar-name {
  font-weight: 400;
  font-size: 14px;
  color: hsla(0, 0%, 100%, .7);
  line-height: 22px;
  text-align: left;
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
  margin-right: 20px;
  padding-left: 12px;
}

.cp {
  cursor: pointer;
}

.fold-button:before {
  content: "";
  width: 1px;
  height: 28px;
  margin-right: 12px;
  background: linear-gradient(180deg, rgba(31, 40, 60, 0), hsla(0, 0%, 100%, .3) 52%, rgba(31, 40, 60, 0));
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
  color: inherit;
  font-size: inherit;
}

.ob-scroll {
  overflow-y: auto;
  flex: 1 1 200px;
}

.a-custom {
  position: relative;
}

.sticky-options {
  position: sticky;
  top: 0;
  background: #1a202d;
  z-index: 99;
}

.gap10 {
  gap: 10px;
}

.fc {
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.f {
  display: flex;
}

.top-menu {
  padding: 12px;
}

.pb10 {
  padding-bottom: 10px;
}

.pt10 {
  padding-top: 10px;
}

.arco-btn-primary, .arco-btn-primary[type=button], .arco-btn-primary[type=submit] {
  color: #fff;
  background-color: rgb(60, 126, 255);
  border: 1px solid transparent;
}

button.arco-btn, button.el-button:not(.is-link) {
  border: none !important;
  border-radius: 8px;
  color: hsla(0, 0%, 100%, .6);
  background-color: rgba(65, 79, 110, .4);
}

button.arco-btn-primary, button.el-button--primary {
  background: linear-gradient(91deg, rgba(0, 108, 255, .8), rgba(0, 194, 255, .8));
  border: none !important;
  color: hsla(0, 0%, 100%, .9);
}

.arco-btn-size-medium {
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
}

.arco-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.5715;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  transition: all .1s linear;
  -webkit-appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.arco-btn-size-medium:not(.arco-btn-only-icon) .arco-btn-icon {
  margin-right: 8px;
}

.page-table-head {
  display: flex;
  gap: 10px;
}

.page-table-head {
  padding: 10px 16px;
}

.cfff_6, .cfff_6 .arco-checkbox-label {
  color: hsla(0, 0%, 100%, .6);
}

.arco-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 14px;
  line-height: unset;
  cursor: pointer;
}

.arco-checkbox > input[type=checkbox] {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

.arco-icon-hover, .arco-icon-hover .arco-icon {
  position: relative;
}

.arco-icon-hover {
  display: inline-block;
  cursor: pointer;
  line-height: 12px;
}

.arco-icon-hover.arco-checkbox-icon-hover:before {
  width: 24px;
  height: 24px;
}

.arco-icon-hover:before {
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
}

.arco-icon-hover:before {
  position: absolute;
  display: block;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 50%;
  transition: background-color .1s linear;
  content: "";
}

.arco-checkbox-icon {
  position: relative;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #1a202d;
  border: 2px solid hsla(0, 0%, 100%, .12);
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.arco-checkbox-icon:after {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 6px;
  height: 2px;
  background: hsla(0, 0%, 100%, .9);
  border-radius: .5px;
  transform: translateX(-50%) translateY(-50%) scale(0);
  content: "";
}

.page-table-item {
  cursor: pointer;
  border-radius: 10px;
  padding: 20px 16px 16px 16px;
}

.f {
  display: flex;
}

.pt10 {
  padding-top: 10px;
}

.pl10 {
  padding-left: 10px;
}

.pl16 {
  padding-left: 16px;
}

.f1 {
  flex: 1;
}

.w10 {
  width: 10px !important;
}

.pl16 {
  padding-left: 16px;
}

.fv {
  flex-direction: column;
}

.page-table-item-name {
  font-size: 14px;
  line-height: 22px;
}

.page-table .id-time {
  font-size: 12px;
  color: #919499;
  line-height: 20px;
}

.mw100 {
  max-width: 100px !important;
}

.pl12 {
  padding-left: 10px;
}

.page-table-item-content {
  font-size: 14px;
  padding-top: 10px;
  line-height: 22px;
}

.a-custom .break-word {
  word-break: break-word;
}

.line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
}

.mt8 {
  margin-top: 8px;
}

.comment-state {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.comment-state .state-ball {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-state .state-text {
  font-size: 14px;
  font-weight: 400;
}

.arco-btn-secondary, .arco-btn-secondary[type=button], .arco-btn-secondary[type=submit] {
  color: hsla(0, 0%, 100%, .7);
  background-color: rgba(var(--gray-9), 0.08);
  border: 1px solid transparent;
}

button.arco-btn, button.el-button:not(.is-link) {
  border: none !important;
  border-radius: 8px;
  color: hsla(0, 0%, 100%, .6);
  background-color: rgba(65, 79, 110, .4);
}

.ml8 {
  margin-left: 8px;
}

.arco-btn-size-medium {
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
}

.f-e {
  justify-content: end;
}

.fcc {
  align-items: center;
  justify-content: center;
}

.arco-select-view-single {
  height: 32px;
}
</style>
