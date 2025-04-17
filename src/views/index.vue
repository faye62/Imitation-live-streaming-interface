<template>
  <div id="app">
    <page-head :isLive="isLiveActive" :title="LivestreamingName"></page-head>
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
                <div class="ob-box-name f fc" style="cursor: pointer;" @click="showTemplateDialog = true">
                  {{ dataMode === 'ecommerce' ? '下单 GMV' : '当前观看人数' }}
                  <i class="el-icon ml6 cp el-tooltip__trigger el-tooltip__trigger">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
                          fill="currentColor"></path>
                    </svg>
                  </i>
                </div>

                <!-- 模板选择弹窗 -->
                <!-- 模板选择弹窗 -->
                <el-dialog
                    v-model="showTemplateDialog"
                    title="选择数据模板"
                    width="60%"
                >
                  <div class="template-editor">
                    <el-form-item label="直播名称">
                      <el-input
                          v-model="LivestreamingName"
                      />
                    </el-form-item>
                    <el-form-item label="直播状态">
                      <el-radio-group v-model="isLiveActive">
                        <el-radio-button :label="true">直播中</el-radio-button>
                        <el-radio-button :label="false">已结束</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="数据模板(万)">
                      <el-input-number
                          v-model="formData.ecommerce.gmv"
                      />
                    </el-form-item>
                    <div class="template-details">
                      <el-table
                          :data="productList"
                          row-key="id"
                          style="width: 70%"
                          @selection-change="handleSelectionChange"
                      >
                        <el-table-column type="selection" width="55"/>
                        <el-table-column label="商品图片" width="120">
                          <template #default="scope">
                            <div class="product-image">
                              <img
                                  :src="scope.row.image || 'https://via.placeholder.com/60x60/3d4d6b/ffffff?text=Product'"
                                  alt="">
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="商品名称">
                          <template #default="scope">
                            <el-input v-model="scope.row.name" placeholder="商品名称"/>
                          </template>
                        </el-table-column>
                      </el-table>

                      <div style="margin-top: 10px;">
                        <el-form-item label="随机种子">
                          <el-input-number
                              v-model="formData.ecommerce.seed"
                              :min="0"
                              :step="1"
                              placeholder="随机种子"
                          />
                        </el-form-item>
                      </div>
                    </div>

                    <div class="dialog-footer">
                      <el-button @click="showTemplateDialog = false">取消</el-button>
                      <el-button type="primary" @click="applyCurrentTemplate">应用模板</el-button>
                    </div>
                  </div>
                </el-dialog>
                <div class="ob-box-online peple">
                  {{ dataMode === 'ecommerce' ? viewData.ecommerce.placeGMV.toFixed(1) : dynamicData.general.viewers }}
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
                <input :checked="dataMode === 'ecommerce'" class="arco-" type="radio" value="ecommerce">
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
                    <div class="data-value">{{ viewData.ecommerce.salesNum }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">成交人数</div>
                    <div class="data-value">{{ viewData.ecommerce.transactionPeople }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">客单价(元)</div>
                    <div class="data-value">￥{{ viewData.ecommerce.unitPrice.toFixed(1) }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">累计观看人数</div>
                    <div class="data-value">{{ viewData.ecommerce.lookPeoples }}</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name">成交转化率</div>
                    <div class="data-value">{{ viewData.ecommerce.transactionRate }}%</div>
                  </section>
                </div>
                <div class="arco-col arco-col-lg-12 arco-col-xl-8 arco-col-xxl-6"
                     style="padding-top: 12px; padding-bottom: 12px;">
                  <section class="el-tooltip__trigger">
                    <div class="data-name" style="white-space: nowrap;">直播成交金额(元)</div>
                    <div class="data-value">￥{{ viewData.ecommerce.transactionAmount }}</div>
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
            <div class="f qushi disflex justifysb">
              <div class="f1 ob-box-name analysis-title">
                {{ dataMode === 'general' ? '趋势分析' : '商品销量榜' }}
                <span v-if="dataMode === 'general'">报表数据存在2-3分钟延迟</span>
              </div>
              <div v-if="dataMode === 'general'" class="qushi-filter-time">
                <div class="time-range">
                  <span class="range-item">近15分钟</span>
                  <span class="range-item">近30分钟</span>
                  <span class="range-item active">近1小时</span>
                  <span class="range-item">近2小时</span>
                  <span class="range-item">近1天</span>
                  <span class="range-item">近3天</span>
                </div>
              </div>
            </div>

            <!-- 通用数据 - 图表 -->
            <div v-show="dataMode == 'general'" ref="chartRef" class="chart-container"></div>

            <!-- 电商数据 - 商品销量榜 -->
            <div v-show="dataMode == 'ecommerce'" class="top-list">
              <div v-for="(product, index) in viewProductList" :key="index"
                   :class="['top-item', `top-item-${index}`]">
                <i class="item-index">{{ index + 1 }}</i>
                <div class="goods-info">
                  <img :alt="product.name" :src="product.image">
                  <div class="info-right">
                    <div class="g-name">{{ product.name }}</div>
                    <div class="g-price">¥{{ product.price.toFixed(2) }}</div>
                  </div>
                </div>
                <div class="data-info">
                  <div class="data disflex justifysb">
                    <span class="data-name">下单GMV</span>
                    <span class="data-value">¥{{ product.gmv.toFixed(1) }}</span>
                  </div>
                  <div class="data disflex justifysb">
                    <span class="data-name">成交金额</span>
                    <span class="data-value">¥{{ product.amount.toFixed(1) }}</span>
                  </div>
                  <div class="data disflex justifysb">
                    <span class="data-name">销量</span>
                    <span class="data-value">{{ product.sales }}</span>
                  </div>
                </div>
              </div>
            </div>
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
import PageHead from '@/views/page-head.vue';
import charArea from '@/views/char-area.vue';
import LiveChatContainer from '@/views/live-chat-container.vue';
import {CustomData, DataGenerator} from "@/views/data.js"
import Utils from '@/utils/tool.js';
import {useMessage} from "@/hooks/useMessage.ts"
import vc from '@/assets/vc.webp'
import alb from '@/assets/澳洛彼清肺饮.jpg'
import jyd from '@/assets/胶原蛋白肽.webp'
import ysj from '@/assets/益生菌.webp'
import xfs from '@/assets/xfs.jpg'
import zpb from '@/assets/zpb.jpg'
import trt from '@/assets/trt.jpg'
import tgg from '@/assets/tgg.jpg'

const active = ref('customer');
const dataUpdateInterval = ref(null);
const message = useMessage();
const chartRef = ref(null);
let chart = null;
const productList = ref([
  {
    id: 1,
    name: '澳洛彼清肺饮【298元2盒】',
    image: alb,
    price: 298, // 提高初始价格
    sales: 0,
    amount: 0,
    gmv: 0,
  },
  {
    id: 2,
    name: '胶原蛋白肽粉【298元3罐】',
    image: jyd,
    price: 298,
    sales: 0,
    amount: 0,
    gmv: 0,
  },
  {
    id: 3,
    name: '益生菌固体饮料【128元1盒】',
    image: ysj,
    price: 128,
    sales: 0,
    amount: 0,
    gmv: 0,
  },
  {
    id: 4,
    name: '维生素C泡腾片【88元2盒】',
    image: vc,
    price: 88,
    sales: 0,
    amount: 0,
    gmv: 0,
  }, {
    id: 5,
    name: '护本初医用洗发水【99元6瓶】',
    image: xfs,
    price: 99,
    sales: 0,
    amount: 0,
    gmv: 0,
  }, {
    id: 6,
    name: '真皮时尚百搭斜挎包【59.9元】',
    image: zpb,
    price: 59.9,
    sales: 0,
    amount: 0,
    gmv: 0,
  }, {
    id: 7,
    name: '医用退热贴【9.9元】',
    image: trt,
    price: 9.9,
    sales: 0,
    amount: 0,
    gmv: 0,
  }, {
    id: 8,
    name: '鸸鹋油透骨膏【99元/4瓶】',
    image: tgg,
    price: 99,
    sales: 0,
    amount: 0,
    gmv: 0,
  },
]);
// 弹窗中的表单数据
const formData = ref({
  ecommerce: {
    gmv: 0,
    seed: 123,
    selectList: []
  }
})
// 界面显示的数据
const viewData = ref({
  ecommerce: {
    placeGMV: 0,// 下单GMV
    salesNum: 0,// 销量
    transactionPeople: 0,// 成交人数
    transactionRate: 0,// 成交转化率
    transactionAmount: 0,// 成交金额 （去掉退款金额）
    unitPrice: 0,// 单价
    lookPeoples: 0,// 观看人数
  },
  selectList: []
})

const viewProductList = ref([])

const LivestreamingName = ref('直播间名称');
const isLiveActive = ref(true); // 默认直播中
// 数据模式状态
const dataMode = ref('ecommerce'); // 'general' 或 'ecommerce'

// 模拟动态数据
const dynamicData = ref({
  ecommerce: {
    gmv: 7175.4,
    sales: 47,
    buyers: 31,
    avgPrice: 124.0,
    viewers: 1337,
    conversion: 2.31,
    liveSales: 5827.8,
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
    redpacket: 0,
  },
});

// 表格多选回调
const handleSelectionChange = (val) => {
  formData.value.ecommerce.selectList = val;

  // 当选择商品变化时，立即更新数据
  // if (showTemplateDialog.value) {
  //   applyCurrentTemplate();
  // }
};
// 更新时间函数
const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  dynamicData.value.general.duration = `${hours}:${minutes}:${seconds}`;
};

// 模拟数据更新
const updateData = () => {
  // 1. 处理基础数据
  const processData = new CustomData().processData(viewData.value.ecommerce);

  // 2. 格式化数据
  Object.keys(processData).forEach(key => {
    if (typeof processData[key] === 'number') {
      if (key.includes('Amount') || key.includes('GMV') || key.includes('Price')) {
        processData[key] = Math.round(processData[key] * 10) / 10;
      } else {
        processData[key] = Math.round(processData[key]);
      }
    }
  });

  // 3. 更新视图数据
  Utils.copyForm(processData, viewData.value.ecommerce);

  // 4. 同步更新商品数据
  updateProductList();

  updateTime();
};
// 预设模板数据
const templates = ref({
  '5万': {
    ecommerce: {
      gmv: 50000,
      sales: 3691,
      buyers: 2001,
      avgPrice: 12.5,
      viewers: 3552,
      conversion: 14.5,
      liveSales: 45000,
    },
    products: [
      {name: '原浆纸', price: 12.5, sales: 1000, amount: 12500, gmv: 15000},
      {name: '运动鞋', price: 150, sales: 100, amount: 15000, gmv: 18000},
      {name: '哈尔滨红肠', price: 30, sales: 500, amount: 15000, gmv: 18000},
    ],
  },
  '10万': {
    ecommerce: {
      gmv: 100363.2,
      sales: 7382,
      buyers: 4002,
      avgPrice: 13.59,
      viewers: 7104,
      conversion: 15.24,
      liveSales: 90000,
    },
    products: [
      {name: '原浆纸', price: 12.5, sales: 3000, amount: 37500, gmv: 45000},
      {name: '运动鞋', price: 150, sales: 200, amount: 30000, gmv: 36000},
      {name: '哈尔滨红肠', price: 30, sales: 1000, amount: 30000, gmv: 36000},
      {name: '松花鸡腿', price: 25, sales: 500, amount: 12500, gmv: 15000},
    ],
  },
  '20万': {
    ecommerce: {
      gmv: 200726.4,
      sales: 14764,
      buyers: 8004,
      avgPrice: 13.59,
      viewers: 14208,
      conversion: 15.24,
      liveSales: 180000,
    },
    products: [
      {name: '原浆纸', price: 12.5, sales: 6000, amount: 75000, gmv: 90000},
      {name: '运动鞋', price: 150, sales: 400, amount: 60000, gmv: 72000},
      {name: '哈尔滨红肠', price: 30, sales: 2000, amount: 60000, gmv: 72000},
      {name: '松花鸡腿', price: 25, sales: 1000, amount: 25000, gmv: 30000},
    ],
  },
});

// 当前模板名称
const currentTemplate = ref('10万');
// 是否显示模板选择弹窗
const showTemplateDialog = ref(false);

// 生成随机但协调的渐变背景
const generateRandomGradient = (index) => {
  const hue = (index * 30) % 360; // 确保颜色分布均匀
  return {
    background: `linear-gradient(180deg,
      hsla(${hue}, 80%, 60%, 0.5),
      hsla(${hue}, 80%, 70%, 0.41) 36%,
      hsla(${hue}, 80%, 80%, 0.1))`,
    border: `1px solid hsla(${hue}, 80%, 65%, 0.3)`,
  };
};

// 在添加商品时应用
const addProduct = () => {
  const newIndex = productList.value.length;
  const gradient = generateRandomGradient(newIndex);

  productList.value.push({
    name: '新商品',
    price: 0,
    sales: 0,
    amount: 0,
    gmv: 0,
    image: '',
    style: {
      background: gradient.background,
      border: gradient.border,
    },
  });
};

// 当前正在编辑的模板名称
const editingTemplate = ref('');
// 当前模板数据副本
const currentTemplateData = ref(null);

// 应用当前编辑的模板
const applyCurrentTemplate = () => {
  try {
    // 1. 生成基础数据
    const customData = new CustomData(
        Math.round(formData.value.ecommerce.gmv),
        formData.value.ecommerce.seed
    );
    let data = customData.getData();

    // 2. 格式化数据
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'number') {
        if (key.includes('Amount') || key.includes('GMV') || key.includes('Price')) {
          data[key] = Math.round(data[key] * 10) / 10;
        } else {
          data[key] = Math.round(data[key]);
        }
      }
    });

    // 3. 更新视图数据
    Utils.copyForm(data, viewData.value.ecommerce);
    viewData.value.selectList = formData.value.ecommerce.selectList;

    // 4. 更新商品列表数据
    updateProductList();

    message.success('应用模板成功');
    showTemplateDialog.value = false;
  } catch (e) {
    message.error('应用模板失败：' + e.message);
  }
};
const updateProductList = () => {
  // 1. 生成商品数据
  viewProductList.value = DataGenerator.generate(formData.value.ecommerce.selectList, {
    placeGMV: viewData.value.ecommerce.placeGMV,
    salesNum: viewData.value.ecommerce.salesNum,
    transactionAmount: viewData.value.ecommerce.transactionAmount,
  });

  // 2. 更新商品价格（如果商品已存在）
  productList.value.forEach(product => {
    const matchedProduct = viewProductList.value.find(p => p.id === product.id);
    if (matchedProduct) {
      product.price = matchedProduct.price || product.price;
      product.sales = matchedProduct.sales || product.sales;
      product.amount = matchedProduct.amount || product.amount;
      product.gmv = matchedProduct.gmv || product.gmv;
    }
  });

  // 3. 确保商品数据格式正确
  formatProductData();
};
const formatProductData = () => {
  productList.value.forEach(product => {
    // 金额保留1位小数
    product.price = Math.round(product.price * 10) / 10;
    product.amount = Math.round(product.amount * 10) / 10;
    product.gmv = Math.round(product.gmv * 10) / 10;

    // 销量为整数
    product.sales = Math.round(product.sales);

    // 确保最小值
    product.price = Math.max(0, product.price);
    product.sales = Math.max(0, product.sales);
    product.amount = Math.max(0, product.amount);
    product.gmv = Math.max(0, product.gmv);
  });
};
// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);
  const option = {
    grid: {
      top: 30,
      left: 40,
      right: 40,
      bottom: 30,
    },
    xAxis: {
      type: 'category',
      data: ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
      axisLine: {
        lineStyle: {
          color: '#363c4a',
        },
      },
      axisLabel: {
        color: '#8c8c8c',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#363c4a',
        },
      },
      axisLabel: {
        color: '#8c8c8c',
      },
      splitLine: {
        lineStyle: {
          color: '#363c4a',
        },
      },
    },
    series: [{
      data: [1, 4, 3, 1, 1, 2, 3],
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        color: '#409EFF',
        width: 2,
      },
      itemStyle: {
        color: '#409EFF',
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
            color: 'rgba(64,158,255,0.2)',
          }, {
            offset: 1,
            color: 'rgba(64,158,255,0)',
          }],
        },
      },
    }],
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
  updateTime();

  // 初始化时应用默认模板
  applyCurrentTemplate();

  dataUpdateInterval.value = setInterval(updateData, 10000);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (dataUpdateInterval.value) {
    clearInterval(dataUpdateInterval.value);
    dataUpdateInterval.value = null;
  }
  if (chart.value) {
    chart.value.dispose();
    chart.value = null;
  }
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
  position: relative;
  background: rgba(26, 32, 45, .5);
  border-radius: 0 12px 12px 0;
  border: 1px solid #1a202d;
  border-left: 0;
  flex: 1;
  height: 345px;
  padding: 20px;
  max-width: 54vw;
}

.chart-container {
  width: 999px;
  height: 260px;
}

.justifysb {
  justify-content: space-between;
}

.analysis-title {
  font-size: 16px;
}

.analysis-title span {
  font-size: 13px;
  color: hsla(0, 0%, 100%, .5);
  margin-left: 16px;
  line-height: 16px;
  display: inline-block;
  vertical-align: middle;
}

.ob-box-name {
  font-size: 14px;
  color: hsla(0, 0%, 100%, .8);
  line-height: 32px;
  margin-bottom: 16px;
}

.time-range {
  background: #060d1b;
  border-radius: 10px 10px 10px 10px;
  padding: 4px;
  box-sizing: border-box;
}

.range-item {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 8px;
  color: hsla(0, 0%, 100%, .6);
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
}

.ob-box-name {
  font-size: 14px;
  color: hsla(0, 0%, 100%, .8);
  line-height: 32px;
}

.range-item.active {
  background: rgba(65, 79, 110, .4);
  color: #fff;
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

.arco-radio-button-content {
  color: #fff !important;
  border-radius: 8px;
}

.arco-radio-checked .arco-radio-button-content {
  color: #fff !important;
  background: rgba(65, 79, 110, .6);
}

.top-list {

  display: flex;
  flex-wrap: nowrap; /* 禁止换行 */
  overflow-x: auto; /* 横向滚动 */
  overflow-y: hidden; /* 隐藏纵向滚动 */
  gap: 10px; /* 卡片间距 */
  padding: 10px 0; /* 上下内边距 */
  width: 100%; /* 确保宽度填满容器 */
  -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
}

.top-item {
  width: 327px;
  height: 257px;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
  margin-right: 0;
  position: relative;
}

/* 为每个卡片添加不同的渐变背景 */
.top-item-0 {
  background: linear-gradient(180deg, rgba(0, 225, 255, .5), rgba(121, 235, 248, .41) 36%, rgba(128, 230, 223, .1));
  border: 1px solid rgba(104, 217, 225, .3);
}

.top-item-1 {
  background: linear-gradient(180deg, rgba(255, 175, 0, .5), rgba(255, 200, 50, .41) 36%, rgba(255, 225, 100, .1));
  border: 1px solid rgba(255, 190, 30, .3);
}

.top-item-2 {
  background: linear-gradient(180deg, rgba(150, 0, 255, .5), rgba(180, 50, 255, .41) 36%, rgba(210, 100, 255, .1));
  border: 1px solid rgba(170, 30, 255, .3);
}

.top-item-3 {
  background: linear-gradient(180deg, rgba(0, 255, 150, .5), rgba(50, 255, 180, .41) 36%, rgba(100, 255, 210, .1));
  border: 1px solid rgba(30, 255, 170, .3);
}

.top-item-4 {
  background: linear-gradient(180deg, rgba(255, 0, 100, .5), rgba(255, 50, 130, .41) 36%, rgba(255, 100, 160, .1));
  border: 1px solid rgba(255, 30, 120, .3);
}

.item-index {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  background: hsla(0, 0%, 100%, .1);
  border-radius: 12px 0 12px 0;
  font-weight: 600;
  font-size: 14px;
  color: hsla(0, 0%, 100%, .8);
  line-height: 24px;
  font-style: normal;
  text-transform: none;
}

.goods-info {
  display: flex;
  margin: 12px 0 12px 0;
}

.goods-info img {
  width: 48px;
  height: 48px;
  border-radius: 8px 8px 8px 8px;
  margin-right: 20px;
}

.g-name, .g-price {
  font-weight: 400;
  font-size: 14px;
  color: hsla(0, 0%, 100%, .6);
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  letter-spacing: -.24px;
}

.g-price {
  font-weight: 400;
  font-size: 14px;
  color: hsla(0, 0%, 100%, .6);
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  letter-spacing: -.24px;
}

.data-info {
  width: 100%;
  background: hsla(0, 0%, 100%, .05);
  border-radius: 8px 8px 8px 8px;
  padding: 12px;
  box-sizing: border-box;
}

.data {
  height: 24px;
  line-height: 24px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid hsla(0, 0%, 100%, .1);
  padding-top: 12px;
}

.data:first-child {
  padding-top: 0;
  padding-bottom: 12px;
}


.data:last-child {
  padding-top: 12px;
  padding-bottom: 0;
  border-bottom: none;
}

.justifysb {
  justify-content: space-between;
}

.data .data-name {
  color: hsla(0, 0%, 100%, .6);
}

.template-editor {
  display: flex;
  flex-direction: column;

}

.template-selector {
  display: flex;
  margin-bottom: 20px;
}

.template-options {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.template-option {
  width: calc(33.33% - 10px);
  padding: 12px;
  border: 1px solid #363c4a;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.template-option:hover {
  border-color: #409EFF;
}

.template-option.active {
  border-color: #409EFF;
  background-color: rgba(64, 158, 255, 0.1);
}

.template-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.template-summary {
  font-size: 12px;
  color: #8c8c8c;
}

.template-actions {
  width: 120px;
  margin-left: 20px;
}

.template-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #363c4a;
  padding-top: 20px;
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.template-stats {
  margin-bottom: 20px;
}

.product-list {
  flex: 1;
  overflow-y: auto;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #363c4a;
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  display: flex;
  gap: 10px;
}

.product-info .el-input,
.product-info .el-input-number {
  width: 120px;
}

.product-stats {
  width: 150px;
  font-size: 12px;
  color: #8c8c8c;
}

.product-actions {
  width: 50px;
}

.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
</style>
