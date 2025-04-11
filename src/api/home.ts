import {get} from "@/config/axios"

export interface TurnoverDiff {
  huanbiDiff: number;
  huanbiValue?: number;
  huanbiRatio: number;
  tongbiDiff: number;
  tongbiValue?: number;
  tongbiRatio: number;
}

export interface CostAnalysisItem {
  name: string;
  value: number;
  percent: number;
  percentStr: string;
}

export interface ProfitAnalysisItem {
  date: string;
  grossProfit: number;
  grossProfitPercent: number;
  grossProfitPercentStr: string;
  netProfit: number;
  netProfitPercent: number;
  netProfitPercentStr: string;
}


export interface ReportVO {
  turnover: number;
  turnoverDiff: any;
  orderNum: number;
  orderNumDiff: any;
  avgPrice: number;
  avgPriceDiff: any;
  depositAmount: number;
  depositAmountDiff: any;
  avgTurnover?: number;
  avgOrderNum?: number;
  avgDepositAmount?: number;
  trendXAxis?: string[];
  turnoverTrend?: number[];
  orderNumTrend?: number[];
  depositAmountTrend?: number[];
  productSaleNumTop5?: any[]; // 根据实际数据结构补充
  productSaleAmountTop5?: any[]; // 根据实际数据结构补充
  costAnalysis?: CostAnalysisItem[];
  totalCost?: number;
  totalCostStr?: string;
  profitAnalysis?: ProfitAnalysisItem[];
  marketingAnalysis?: any; // 根据实际数据结构补充
}
export class HomePageApi {
  // 获取店铺日报 /smst/biz-data/daily-report
  static async getReport(data:any) {
    const res =await get(`/smst/biz-data/daily-report?storeId=${data.storeId}&dataDate=${data.dataDate}`);
    return res.data;
  }
}
