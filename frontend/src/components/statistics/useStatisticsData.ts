import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import axios from "../../api/axios";
import type { BabyAction } from "../../types/babyAction";
import type { DashboardResponse } from "../../types/api";
import {
  CRYING_COUNT_CARD_TITLE,
  CRYING_TIMING_CARD_TITLE,
  EXCRETION_PEE_CARD_TITLE,
  EXCRETION_POO_CARD_TITLE,
  EXCRETION_TIMING_CARD_TITLE,
  FEED_TIMING_CARD_TITLE,
  FEED_TOTAL_CARD_META,
  SLEEP_BEDTIME_CARD_TITLE,
  SLEEP_TOTAL_CARD_META,
} from "./constants";
import type { PeriodType, StatisticsData } from "./types";
import {
  buildAverageActionIntervalMinutes,
  buildExcretionCountChartData,
  buildExcretionTimelineData,
  buildFeedCountChartData,
  buildFeedTimelineData,
  buildHourlyCryingStats,
  buildSleepChartData,
  buildSleepTimelineData,
  formatIntervalText,
  formatPeriodLabel,
  getPeriodRange,
  minutesDiff,
  shiftPeriod,
  sumSleepMinutesInRange,
} from "./utils";

export const useStatisticsData = (
  baseDate: dayjs.Dayjs,
  period: PeriodType,
): StatisticsData => {
  const [actions, setActions] = useState<BabyAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboardRes = await axios.get<DashboardResponse>("/api/dashboard");
        setActions(dashboardRes.data.baby_actions);
      } catch (error) {
        console.error("統計データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentRange = useMemo(
    () => getPeriodRange(baseDate, period),
    [baseDate, period],
  );

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      const at = dayjs(action.start_date);
      return (
        (at.isAfter(currentRange.start) || at.isSame(currentRange.start)) &&
        (at.isBefore(currentRange.end) || at.isSame(currentRange.end))
      );
    });
  }, [actions, currentRange.end, currentRange.start]);

  const allSleepActions = useMemo(
    () => actions.filter((action) => action.action === 1),
    [actions],
  );
  const sleepActions = useMemo(
    () => filteredActions.filter((action) => action.action === 1),
    [filteredActions],
  );
  const milkActions = useMemo(
    () => filteredActions.filter((action) => action.action === 2),
    [filteredActions],
  );
  const cryingActions = useMemo(
    () => filteredActions.filter((action) => action.cry),
    [filteredActions],
  );
  const excretionActions = useMemo(
    () =>
      filteredActions.filter(
        (action) =>
          action.action === 4 || action.action === 5 || action.action === 6,
      ),
    [filteredActions],
  );
  const feedMealActions = useMemo(
    () =>
      filteredActions.filter(
        (action) => action.action === 2 || action.action === 3,
      ),
    [filteredActions],
  );

  const sleepChartData = useMemo(
    () => buildSleepChartData(sleepActions, period, baseDate),
    [baseDate, period, sleepActions],
  );
  const sleepTimelineData = useMemo(
    () => buildSleepTimelineData(allSleepActions, period, baseDate),
    [allSleepActions, baseDate, period],
  );
  const feedCountChartData = useMemo(
    () => buildFeedCountChartData(feedMealActions, period, baseDate),
    [baseDate, feedMealActions, period],
  );
  const feedTimelineData = useMemo(
    () => buildFeedTimelineData(feedMealActions, period, baseDate),
    [baseDate, feedMealActions, period],
  );
  const excretionCountChartData = useMemo(
    () => buildExcretionCountChartData(excretionActions, period, baseDate),
    [baseDate, excretionActions, period],
  );
  const excretionTimelineData = useMemo(
    () => buildExcretionTimelineData(excretionActions, period, baseDate),
    [baseDate, excretionActions, period],
  );

  const sleepDurations = sleepActions.map((action) =>
    minutesDiff(action.start_date, action.end_date),
  );
  const bedtimeByHour = Array.from({ length: 24 }, (_, hour) => ({
    label: `${String(hour).padStart(2, "0")}時`,
    count: sleepActions.filter((action) => dayjs(action.start_date).hour() === hour)
      .length,
  }));
  const commonBedtime = bedtimeByHour.reduce(
    (best, current) => (current.count > best.count ? current : best),
    { label: "--", count: 0 },
  );
  const totalSleepMinutes = useMemo(
    () =>
      sumSleepMinutesInRange(
        allSleepActions,
        currentRange.start,
        currentRange.end,
      ),
    [allSleepActions, currentRange.end, currentRange.start],
  );
  const longestSleepMinutes = sleepDurations.reduce(
    (max, current) => (current > max ? current : max),
    0,
  );
  const avgContinuousSleep = sleepDurations.length
    ? Math.round(
        sleepDurations.reduce((sum, duration) => sum + duration, 0) /
          sleepDurations.length,
      )
    : 0;

  const totalBreastMinutes = milkActions.reduce(
    (sum, action) => sum + minutesDiff(action.start_date, action.end_date),
    0,
  );
  const totalFormulaMl = milkActions.reduce(
    (sum, action) => sum + (action.milk_amount ?? 0),
    0,
  );
  const hourlyFeedStats = useMemo(
    () =>
      Array.from({ length: 24 }, (_, hour) => ({
        label: `${String(hour).padStart(2, "0")}時`,
        milkCount: feedMealActions.filter(
          (action) =>
            action.action === 2 && dayjs(action.start_date).hour() === hour,
        ).length,
        mealCount: feedMealActions.filter(
          (action) =>
            action.action === 3 && dayjs(action.start_date).hour() === hour,
        ).length,
      })),
    [feedMealActions],
  );
  const avgFeedMealInterval = useMemo(() => {
    if (feedMealActions.length < 2) {
      return 0;
    }
    const sorted = [...feedMealActions].sort(
      (a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
    );
    const intervals: number[] = [];
    for (let i = 1; i < sorted.length; i += 1) {
      const prev = sorted[i - 1];
      const current = sorted[i];
      if (!prev || !current) {
        continue;
      }
      const diff = dayjs(current.start_date).diff(
        dayjs(prev.start_date),
        "minute",
      );
      if (diff > 0) {
        intervals.push(diff);
      }
    }
    if (intervals.length === 0) {
      return 0;
    }
    return Math.round(
      intervals.reduce((sum, value) => sum + value, 0) / intervals.length,
    );
  }, [feedMealActions]);
  const commonFeedTime = hourlyFeedStats.reduce(
    (best, current) =>
      current.milkCount + current.mealCount > best.milkCount + best.mealCount
        ? current
        : best,
    { label: "--", milkCount: 0, mealCount: 0 },
  );

  const pooActions = excretionActions.filter(
    (action) => action.action === 4 || action.action === 6,
  );
  const peeActions = excretionActions.filter(
    (action) => action.action === 5 || action.action === 6,
  );
  const mixedExcretionActions = excretionActions.filter(
    (action) => action.action === 6,
  );
  const hourlyExcretionStats = useMemo(
    () =>
      Array.from({ length: 24 }, (_, hour) => ({
        label: `${String(hour).padStart(2, "0")}時`,
        peeCount: excretionActions.filter(
          (action) =>
            action.action === 5 && dayjs(action.start_date).hour() === hour,
        ).length,
        pooCount: excretionActions.filter(
          (action) =>
            action.action === 4 && dayjs(action.start_date).hour() === hour,
        ).length,
        mixedCount: excretionActions.filter(
          (action) =>
            action.action === 6 && dayjs(action.start_date).hour() === hour,
        ).length,
      })),
    [excretionActions],
  );
  const avgExcretionInterval = useMemo(() => {
    if (excretionActions.length < 2) {
      return 0;
    }
    const sorted = [...excretionActions].sort(
      (a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
    );
    const intervals: number[] = [];
    for (let i = 1; i < sorted.length; i += 1) {
      const prev = sorted[i - 1];
      const current = sorted[i];
      if (!prev || !current) {
        continue;
      }
      const diff = dayjs(current.start_date).diff(
        dayjs(prev.start_date),
        "minute",
      );
      if (diff > 0) {
        intervals.push(diff);
      }
    }
    if (intervals.length === 0) {
      return 0;
    }
    return Math.round(
      intervals.reduce((sum, value) => sum + value, 0) / intervals.length,
    );
  }, [excretionActions]);
  const commonExcretionTime = hourlyExcretionStats.reduce(
    (best, current) =>
      current.peeCount + current.pooCount + current.mixedCount >
      best.peeCount + best.pooCount + best.mixedCount
        ? current
        : best,
    { label: "--", peeCount: 0, pooCount: 0, mixedCount: 0 },
  );
  const lastPooFromNow = useMemo(() => {
    if (pooActions.length === 0) {
      return "記録なし";
    }
    const latest = [...pooActions].sort(
      (a, b) => dayjs(b.start_date).valueOf() - dayjs(a.start_date).valueOf(),
    )[0];
    if (!latest) {
      return "記録なし";
    }
    const diffHours = dayjs().diff(dayjs(latest.start_date), "hour");
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;
    return `${days}日${hours}時間`;
  }, [pooActions]);

  const hourlyCryingStats = useMemo(
    () => buildHourlyCryingStats(cryingActions),
    [cryingActions],
  );
  const commonCryingTime = hourlyCryingStats.reduce(
    (best, current) => (current.count > best.count ? current : best),
    { label: "--", count: 0 },
  );
  const avgCryingIntervalMinutes = useMemo(
    () => buildAverageActionIntervalMinutes(cryingActions),
    [cryingActions],
  );
  const cryingReasonData = useMemo(() => {
    const hungry = cryingActions.filter((action) =>
      (action.memo ?? "").match(/空腹|お腹|ミルク/),
    ).length;
    const sleepy = cryingActions.filter((action) =>
      (action.memo ?? "").match(/眠|ねむ/),
    ).length;
    const diaper = cryingActions.filter((action) =>
      (action.memo ?? "").match(/おむつ|うんち|おしっこ/),
    ).length;
    const unknown = Math.max(
      cryingActions.length - hungry - sleepy - diaper,
      0,
    );
    return [
      { id: 0, value: hungry, label: "お腹すいた", color: "#ff8a80" },
      { id: 1, value: sleepy, label: "眠い", color: "#80cbc4" },
      { id: 2, value: diaper, label: "おむつ", color: "#ffd54f" },
      { id: 3, value: unknown, label: "不明", color: "#b39ddb" },
    ].filter((slice) => slice.value > 0);
  }, [cryingActions]);
  const avgCryingIntervalText =
    avgCryingIntervalMinutes === null
      ? "記録不足"
      : formatIntervalText(avgCryingIntervalMinutes);

  return {
    loading,
    periodLabel: formatPeriodLabel(baseDate, period),
    canMoveNext: shiftPeriod(baseDate, period, 1).isBefore(dayjs().endOf("day")),
    sleep: {
      bedtimeCardTitle: SLEEP_BEDTIME_CARD_TITLE[period],
      totalCard: SLEEP_TOTAL_CARD_META[period],
      totalSleepMinutes,
      longestSleepMinutes,
      avgContinuousSleep,
      commonBedtime,
      bedtimeByHour,
      sleepChartData,
      sleepTimelineData,
    },
    meals: {
      timingCardTitle: FEED_TIMING_CARD_TITLE[period],
      totalCard: FEED_TOTAL_CARD_META[period],
      totalFeedMealCount: feedMealActions.length,
      totalBreastMinutes,
      totalFormulaMl,
      commonFeedTime,
      avgFeedMealIntervalText: formatIntervalText(avgFeedMealInterval),
      hourlyFeedStats,
      feedCountChartData,
      feedTimelineData,
    },
    excretion: {
      timingCardTitle: EXCRETION_TIMING_CARD_TITLE[period],
      peeCardTitle: EXCRETION_PEE_CARD_TITLE[period],
      pooCardTitle: EXCRETION_POO_CARD_TITLE[period],
      avgExcretionIntervalText: formatIntervalText(avgExcretionInterval),
      commonExcretionTime,
      peeActionsLength: peeActions.length,
      pooActionsLength: pooActions.length,
      mixedActionsLength: mixedExcretionActions.length,
      lastPooFromNow,
      hourlyExcretionStats,
      excretionCountChartData,
      excretionTimelineData,
    },
    crying: {
      timingCardTitle: CRYING_TIMING_CARD_TITLE[period],
      countCardTitle: CRYING_COUNT_CARD_TITLE[period],
      cryingActionsLength: cryingActions.length,
      commonCryingTime,
      avgCryingIntervalText,
      hourlyCryingStats,
      cryingReasonData,
    },
  };
};
