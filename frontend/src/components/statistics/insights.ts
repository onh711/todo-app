import dayjs, { type Dayjs } from "dayjs";
import type { BabyAction } from "../../types/babyAction";

export type RangeType = "day" | "week" | "month";
export type InsightTab = "sleep" | "excretion" | "milk" | "meal" | "cry" | "predict";

export const RANGE_LABEL: Record<RangeType, string> = {
  day: "日ごと",
  week: "週ごと",
  month: "月間",
};

export const getRange = (baseDate: Dayjs, range: RangeType) => {
  if (range === "day") {
    return { start: baseDate.startOf("day"), end: baseDate.endOf("day") };
  }
  if (range === "week") {
    return { start: baseDate.startOf("week"), end: baseDate.endOf("week") };
  }
  return { start: baseDate.startOf("month"), end: baseDate.endOf("month") };
};

export const shiftBaseDate = (baseDate: Dayjs, range: RangeType, delta: number): Dayjs => {
  if (range === "day") {
    return baseDate.add(delta, "day");
  }
  if (range === "week") {
    return baseDate.add(delta, "week");
  }
  return baseDate.add(delta, "month");
};

export const rangeTitle = (baseDate: Dayjs, range: RangeType): string => {
  const { start, end } = getRange(baseDate, range);
  if (range === "day") {
    return start.format("YYYY年M月D日");
  }
  if (range === "week") {
    return `${start.format("M/D")} - ${end.format("M/D")}`;
  }
  return start.format("YYYY年M月");
};

export const filterByRange = (
  actions: BabyAction[],
  baseDate: Dayjs,
  range: RangeType
): BabyAction[] => {
  const { start, end } = getRange(baseDate, range);
  return actions.filter((action) => {
    const at = dayjs(action.start_date);
    return (
      at.isValid() &&
      (at.isAfter(start) || at.isSame(start)) &&
      (at.isBefore(end) || at.isSame(end))
    );
  });
};

export const toHourFloat = (value: string): number => {
  const date = dayjs(value);
  return date.hour() + date.minute() / 60;
};

export const formatHourMinute = (hourFloat: number | null): string => {
  if (hourFloat === null) {
    return "--";
  }
  const base = Math.floor(hourFloat);
  const minute = Math.round((hourFloat - base) * 60);
  const hour = minute === 60 ? (base + 1) % 24 : base % 24;
  const adjustedMinute = minute === 60 ? 0 : minute;
  return `${String(hour).padStart(2, "0")}:${String(adjustedMinute).padStart(2, "0")}`;
};

export const mean = (numbers: number[]): number | null => {
  if (numbers.length === 0) {
    return null;
  }
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
};

export const minutesDiff = (startDate: string, endDate: string): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (!start.isValid() || !end.isValid()) {
    return 0;
  }
  const diff = end.diff(start, "minute");
  return diff > 0 ? diff : 0;
};

export const formatMinutes = (minutes: number | null): string => {
  if (minutes === null) {
    return "--";
  }
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}時間${m}分`;
};

export const hourlyCounts = (actions: BabyAction[], predicate?: (a: BabyAction) => boolean) =>
  Array.from({ length: 24 }, (_, hour) => ({
    label: `${String(hour).padStart(2, "0")}時`,
    value: actions.filter(
      (action) => dayjs(action.start_date).hour() === hour && (predicate ? predicate(action) : true)
    ).length,
  }));

export const averageMilkByHour = (actions: BabyAction[]) =>
  Array.from({ length: 24 }, (_, hour) => {
    const target = actions.filter(
      (action) => dayjs(action.start_date).hour() === hour && action.milk_amount !== null
    );
    const avg =
      target.length === 0
        ? 0
        : Math.round(
            target.reduce((sum, action) => sum + (action.milk_amount ?? 0), 0) / target.length
          );
    return {
      label: `${String(hour).padStart(2, "0")}時`,
      value: avg,
    };
  });

export const predictNextCryInHours = (allActions: BabyAction[], now: Dayjs): number | null => {
  const cries = allActions
    .filter((action) => action.cry)
    .sort((a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf());

  if (cries.length < 3) {
    return null;
  }

  const intervals: number[] = [];
  for (let i = 1; i < cries.length; i += 1) {
    const prev = cries[i - 1];
    const current = cries[i];
    if (!prev || !current) {
      continue;
    }
    const diff = dayjs(current.start_date).diff(dayjs(prev.start_date), "minute");
    if (diff > 0) {
      intervals.push(diff);
    }
  }

  if (intervals.length === 0) {
    return null;
  }

  const avgInterval = intervals.reduce((sum, item) => sum + item, 0) / intervals.length;
  const latest = cries[cries.length - 1];
  if (!latest) {
    return null;
  }

  const elapsed = now.diff(dayjs(latest.start_date), "minute");
  const remain = avgInterval - elapsed;
  return Number((Math.max(remain, 0) / 60).toFixed(1));
};

