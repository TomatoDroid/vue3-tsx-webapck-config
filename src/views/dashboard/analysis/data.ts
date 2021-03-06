import iconSvg1 from '@/assets/svg/dashboard/analysis-icon1.svg';
import iconSvg2 from '@/assets/svg/dashboard/analysis-icon2.svg';
import iconSvg3 from '@/assets/svg/dashboard/analysis-icon3.svg';
import iconSvg4 from '@/assets/svg/dashboard/analysis-icon4.svg';

export interface GrowCardItem {
  title: string;
  icon: string;
  price: number;
  up: boolean;
  mom: string;
  percent: number;
}
export const growCardList: GrowCardItem[] = [
  {
    title: '总用户数',
    icon: iconSvg1,
    price: 80000,
    up: true,
    mom: '环比增长',
    percent: 2.5,
  },
  {
    title: '产品数量',
    icon: iconSvg2,
    price: 4000,
    up: true,
    mom: '同比增长',
    percent: 3,
  },
  {
    title: '总营业额',
    icon: iconSvg3,
    price: 3000000,
    up: false,
    mom: '环比降低',
    percent: 2,
  },
  {
    title: '总任务数',
    icon: iconSvg4,
    price: 10000,
    up: false,
    mom: '同比降低',
    percent: 1,
  },
];
