import type { ReactNode } from "react";

export type DashboardTab = "sleep" | "meals" | "excretion" | "crying";
export type PeriodType = "day" | "week" | "month";
export type SleepChartView = "bedtime" | "duration" | "timeline";
export type FeedChartView = "distribution" | "count" | "timeline";
export type ExcretionChartView = "distribution" | "count" | "timeline";

export type SleepTimelineSegment = {
  id: string;
  startMinutes: number;
  endMinutes: number;
};

export type SleepTimelineDay = {
  key: string;
  label: string;
  segments: SleepTimelineSegment[];
};

export type SleepChartPoint = {
  label: string;
  dayHours: number;
  nightHours: number;
};

export type FeedCountChartPoint = {
  label: string;
  milkCount: number;
  mealCount: number;
};

export type FeedTimelineEvent = {
  id: string;
  minutes: number;
  kind: "milk" | "meal";
};

export type FeedTimelineDay = {
  key: string;
  label: string;
  events: FeedTimelineEvent[];
};

export type HourlyFeedStat = {
  label: string;
  milkCount: number;
  mealCount: number;
};

export type ExcretionCountChartPoint = {
  label: string;
  peeCount: number;
  pooCount: number;
  mixedCount: number;
};

export type ExcretionTimelineEvent = {
  id: string;
  minutes: number;
  kind: "pee" | "poo" | "mixed";
};

export type ExcretionTimelineDay = {
  key: string;
  label: string;
  events: ExcretionTimelineEvent[];
};

export type HourlyExcretionStat = {
  label: string;
  peeCount: number;
  pooCount: number;
  mixedCount: number;
};

export type PieSlice = {
  id: number;
  value: number;
  label: string;
  color: string;
};

export type CryBySlotPoint = {
  slot: string;
  count: number;
};

export type HourlyCryingStat = {
  label: string;
  count: number;
};

export type KpiCardMeta = {
  title: string;
  bg: string;
  icon: ReactNode;
};

export type KpiCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  bg: string;
};

export type ChartPanelProps = {
  title: string;
  children: ReactNode;
};

export type StatisticsSleepData = {
  bedtimeCardTitle: string;
  totalCard: KpiCardMeta;
  totalSleepMinutes: number;
  longestSleepMinutes: number;
  avgContinuousSleep: number;
  commonBedtime: { label: string; count: number };
  bedtimeByHour: { label: string; count: number }[];
  sleepChartData: SleepChartPoint[];
  sleepTimelineData: SleepTimelineDay[];
};

export type StatisticsMealsData = {
  timingCardTitle: string;
  totalCard: KpiCardMeta;
  totalFeedMealCount: number;
  totalBreastMinutes: number;
  totalFormulaMl: number;
  commonFeedTime: { label: string; milkCount: number; mealCount: number };
  avgFeedMealIntervalText: string;
  hourlyFeedStats: HourlyFeedStat[];
  feedCountChartData: FeedCountChartPoint[];
  feedTimelineData: FeedTimelineDay[];
};

export type StatisticsExcretionData = {
  timingCardTitle: string;
  peeCardTitle: string;
  pooCardTitle: string;
  avgExcretionIntervalText: string;
  commonExcretionTime: {
    label: string;
    peeCount: number;
    pooCount: number;
    mixedCount: number;
  };
  peeActionsLength: number;
  pooActionsLength: number;
  mixedActionsLength: number;
  lastPooFromNow: string;
  hourlyExcretionStats: HourlyExcretionStat[];
  excretionCountChartData: ExcretionCountChartPoint[];
  excretionTimelineData: ExcretionTimelineDay[];
};

export type StatisticsCryingData = {
  timingCardTitle: string;
  countCardTitle: string;
  cryingActionsLength: number;
  commonCryingTime: { label: string; count: number };
  avgCryingIntervalText: string;
  hourlyCryingStats: HourlyCryingStat[];
  cryingReasonData: PieSlice[];
};

export type StatisticsData = {
  loading: boolean;
  periodLabel: string;
  canMoveNext: boolean;
  sleep: StatisticsSleepData;
  meals: StatisticsMealsData;
  excretion: StatisticsExcretionData;
  crying: StatisticsCryingData;
};
