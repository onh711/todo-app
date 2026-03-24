import dayjs from "dayjs";
import type { BabyAction } from "../../types/babyAction";
import type {
  ExcretionCountChartPoint,
  ExcretionTimelineDay,
  ExcretionTimelineEvent,
  FeedCountChartPoint,
  FeedTimelineDay,
  FeedTimelineEvent,
  HourlyCryingStat,
  PeriodType,
  SleepChartPoint,
  SleepTimelineDay,
} from "./types";

export const minutesDiff = (startDate: string, endDate: string): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (!start.isValid() || !end.isValid()) {
    return 0;
  }
  return Math.max(end.diff(start, "minute"), 0);
};

export const formatMinutes = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}時間${m}分`;
};

export const formatIntervalText = (minutes: number): string => {
  if (minutes <= 0) {
    return "--";
  }
  return `${Math.floor(minutes / 60)}時間${minutes % 60}分`;
};

export const formatHourLabel = (hour: number) =>
  `${String(hour).padStart(2, "0")}:00`;

export const buildHourlyCryingStats = (
  cryingActions: BabyAction[],
): HourlyCryingStat[] =>
  Array.from({ length: 24 }, (_, hour) => ({
    label: `${String(hour).padStart(2, "0")}時`,
    count: cryingActions.filter(
      (action) => dayjs(action.start_date).hour() === hour,
    ).length,
  }));

export const buildAverageActionIntervalMinutes = (actions: BabyAction[]) => {
  const sorted = [...actions]
    .filter((action) => dayjs(action.start_date).isValid())
    .sort((a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf());

  if (sorted.length < 2) {
    return null;
  }

  const intervals: number[] = [];
  for (let i = 1; i < sorted.length; i += 1) {
    const previous = sorted[i - 1];
    const current = sorted[i];
    if (!previous || !current) {
      continue;
    }

    const diff = dayjs(current.start_date).diff(
      dayjs(previous.start_date),
      "minute",
    );
    if (diff > 0) {
      intervals.push(diff);
    }
  }

  if (intervals.length === 0) {
    return null;
  }

  return Math.round(
    intervals.reduce((sum, value) => sum + value, 0) / intervals.length,
  );
};

export const sumSleepMinutesInRange = (
  sleepActions: BabyAction[],
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
) => {
  return sleepActions.reduce((sum, action) => {
    const actionStart = dayjs(action.start_date);
    const actionEnd = dayjs(action.end_date);

    if (
      !actionStart.isValid() ||
      !actionEnd.isValid() ||
      !actionEnd.isAfter(actionStart)
    ) {
      return sum;
    }
    if (actionEnd.isBefore(start) || actionStart.isAfter(end)) {
      return sum;
    }

    const overlapStart = actionStart.isAfter(start) ? actionStart : start;
    const overlapEnd = actionEnd.isBefore(end) ? actionEnd : end;
    const overlapMinutes = overlapEnd.diff(overlapStart, "minute");

    return overlapMinutes > 0 ? sum + overlapMinutes : sum;
  }, 0);
};

export const getPeriodRange = (baseDate: dayjs.Dayjs, period: PeriodType) => {
  if (period === "day") {
    return { start: baseDate.startOf("day"), end: baseDate.endOf("day") };
  }
  if (period === "week") {
    return { start: baseDate.startOf("week"), end: baseDate.endOf("week") };
  }
  return { start: baseDate.startOf("month"), end: baseDate.endOf("month") };
};

export const shiftPeriod = (
  baseDate: dayjs.Dayjs,
  period: PeriodType,
  delta: number,
) => {
  if (period === "day") {
    return baseDate.add(delta, "day");
  }
  if (period === "week") {
    return baseDate.add(delta, "week");
  }
  return baseDate.add(delta, "month");
};

export const formatPeriodLabel = (
  baseDate: dayjs.Dayjs,
  period: PeriodType,
) => {
  const { start, end } = getPeriodRange(baseDate, period);
  if (period === "day") {
    return start.format("YYYY年M月D日");
  }
  if (period === "week") {
    return `${start.format("YYYY/M/D")} - ${end.format("M/D")}`;
  }
  return start.format("YYYY年M月");
};

export const buildSleepChartData = (
  sleepActions: BabyAction[],
  period: PeriodType,
  baseDate: dayjs.Dayjs,
): SleepChartPoint[] => {
  if (period === "day") {
    const daySleep = sleepActions
      .filter((a) => {
        const hour = dayjs(a.start_date).hour();
        return hour >= 6 && hour < 18;
      })
      .reduce((sum, a) => sum + minutesDiff(a.start_date, a.end_date), 0);
    const nightSleep = sleepActions
      .filter((a) => {
        const hour = dayjs(a.start_date).hour();
        return hour < 6 || hour >= 18;
      })
      .reduce((sum, a) => sum + minutesDiff(a.start_date, a.end_date), 0);
    return [
      {
        label: baseDate.format("M/D"),
        dayHours: Number((daySleep / 60).toFixed(1)),
        nightHours: Number((nightSleep / 60).toFixed(1)),
      },
    ];
  }

  if (period === "week") {
    const start = baseDate.startOf("week");
    return Array.from({ length: 7 }, (_, i) => {
      const day = start.add(i, "day");
      const dayActions = sleepActions.filter((a) =>
        dayjs(a.start_date).isSame(day, "day"),
      );
      const daySleep = dayActions
        .filter((a) => {
          const hour = dayjs(a.start_date).hour();
          return hour >= 6 && hour < 18;
        })
        .reduce((sum, a) => sum + minutesDiff(a.start_date, a.end_date), 0);
      const nightSleep = dayActions
        .filter((a) => {
          const hour = dayjs(a.start_date).hour();
          return hour < 6 || hour >= 18;
        })
        .reduce((sum, a) => sum + minutesDiff(a.start_date, a.end_date), 0);
      return {
        label: day.format("M/D"),
        dayHours: Number((daySleep / 60).toFixed(1)),
        nightHours: Number((nightSleep / 60).toFixed(1)),
      };
    });
  }

  const start = baseDate.startOf("month");
  const daysInMonth = baseDate.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = start.add(i, "day");
    const dayActions = sleepActions.filter((a) =>
      dayjs(a.start_date).isSame(day, "day"),
    );
    const daySleep = dayActions
      .filter((a) => {
        const hour = dayjs(a.start_date).hour();
        return hour >= 6 && hour < 18;
      })
      .reduce((sum, a) => sum + minutesDiff(a.start_date, a.end_date), 0);
    const nightSleep = dayActions
      .filter((a) => {
        const hour = dayjs(a.start_date).hour();
        return hour < 6 || hour >= 18;
      })
      .reduce((sum, a) => sum + minutesDiff(a.start_date, a.end_date), 0);
    return {
      label: day.format("D"),
      dayHours: Number((daySleep / 60).toFixed(1)),
      nightHours: Number((nightSleep / 60).toFixed(1)),
    };
  });
};

export const buildSleepTimelineData = (
  sleepActions: BabyAction[],
  period: PeriodType,
  baseDate: dayjs.Dayjs,
): SleepTimelineDay[] => {
  const { start, end } = getPeriodRange(baseDate, period);
  const startDay = start.startOf("day");
  const endDay = end.startOf("day");
  const dayCount = endDay.diff(startDay, "day") + 1;

  return Array.from({ length: dayCount }, (_, index) => {
    const dayStart = startDay.add(index, "day");
    const nextDayStart = dayStart.add(1, "day");

    const segments = sleepActions.flatMap((action) => {
      const actionStart = dayjs(action.start_date);
      const actionEnd = dayjs(action.end_date);

      if (
        !actionStart.isValid() ||
        !actionEnd.isValid() ||
        !actionEnd.isAfter(actionStart)
      ) {
        return [];
      }
      if (!actionEnd.isAfter(dayStart) || !actionStart.isBefore(nextDayStart)) {
        return [];
      }

      const overlapStart = actionStart.isAfter(dayStart)
        ? actionStart
        : dayStart;
      const overlapEnd = actionEnd.isBefore(nextDayStart)
        ? actionEnd
        : nextDayStart;
      const startMinutes = Math.max(overlapStart.diff(dayStart, "minute"), 0);
      const endMinutes = Math.min(overlapEnd.diff(dayStart, "minute"), 24 * 60);

      if (endMinutes <= startMinutes) {
        return [];
      }

      return [
        {
          id: `${action.id}-${dayStart.format("YYYYMMDD")}-${startMinutes}`,
          startMinutes,
          endMinutes,
        },
      ];
    });

    return {
      key: dayStart.format("YYYY-MM-DD"),
      label: period === "month" ? dayStart.format("D") : dayStart.format("M/D"),
      segments,
    };
  });
};

export const buildFeedCountChartData = (
  feedActions: BabyAction[],
  period: PeriodType,
  baseDate: dayjs.Dayjs,
): FeedCountChartPoint[] => {
  const { start, end } = getPeriodRange(baseDate, period);
  const startDay = start.startOf("day");
  const endDay = end.startOf("day");
  const dayCount = endDay.diff(startDay, "day") + 1;

  return Array.from({ length: dayCount }, (_, index) => {
    const day = startDay.add(index, "day");
    const dayActions = feedActions.filter((action) =>
      dayjs(action.start_date).isSame(day, "day"),
    );

    return {
      label: period === "month" ? day.format("D") : day.format("M/D"),
      milkCount: dayActions.filter((action) => action.action === 2).length,
      mealCount: dayActions.filter((action) => action.action === 3).length,
    };
  });
};

export const buildFeedTimelineData = (
  feedActions: BabyAction[],
  period: PeriodType,
  baseDate: dayjs.Dayjs,
): FeedTimelineDay[] => {
  const { start, end } = getPeriodRange(baseDate, period);
  const startDay = start.startOf("day");
  const endDay = end.startOf("day");
  const dayCount = endDay.diff(startDay, "day") + 1;

  return Array.from({ length: dayCount }, (_, index) => {
    const day = startDay.add(index, "day");
    const events = feedActions
      .filter((action) => dayjs(action.start_date).isSame(day, "day"))
      .sort(
        (a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      )
      .map((action) => {
        const at = dayjs(action.start_date);
        return {
          id: `${action.id}-${at.valueOf()}`,
          minutes: at.hour() * 60 + at.minute(),
          kind: action.action === 2 ? "milk" : "meal",
        } satisfies FeedTimelineEvent;
      });

    return {
      key: day.format("YYYY-MM-DD"),
      label: period === "month" ? day.format("D") : day.format("M/D"),
      events,
    };
  });
};

export const buildExcretionCountChartData = (
  excretionActions: BabyAction[],
  period: PeriodType,
  baseDate: dayjs.Dayjs,
): ExcretionCountChartPoint[] => {
  const { start, end } = getPeriodRange(baseDate, period);
  const startDay = start.startOf("day");
  const endDay = end.startOf("day");
  const dayCount = endDay.diff(startDay, "day") + 1;

  return Array.from({ length: dayCount }, (_, index) => {
    const day = startDay.add(index, "day");
    const dayActions = excretionActions.filter((action) =>
      dayjs(action.start_date).isSame(day, "day"),
    );

    return {
      label: period === "month" ? day.format("D") : day.format("M/D"),
      peeCount: dayActions.filter((action) => action.action === 5).length,
      pooCount: dayActions.filter((action) => action.action === 4).length,
      mixedCount: dayActions.filter((action) => action.action === 6).length,
    };
  });
};

export const buildExcretionTimelineData = (
  excretionActions: BabyAction[],
  period: PeriodType,
  baseDate: dayjs.Dayjs,
): ExcretionTimelineDay[] => {
  const { start, end } = getPeriodRange(baseDate, period);
  const startDay = start.startOf("day");
  const endDay = end.startOf("day");
  const dayCount = endDay.diff(startDay, "day") + 1;

  return Array.from({ length: dayCount }, (_, index) => {
    const day = startDay.add(index, "day");
    const events = excretionActions
      .filter((action) => dayjs(action.start_date).isSame(day, "day"))
      .sort(
        (a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf(),
      )
      .map((action) => {
        const at = dayjs(action.start_date);
        const kind =
          action.action === 4 ? "poo" : action.action === 5 ? "pee" : "mixed";

        return {
          id: `${action.id}-${at.valueOf()}`,
          minutes: at.hour() * 60 + at.minute(),
          kind,
        } satisfies ExcretionTimelineEvent;
      });

    return {
      key: day.format("YYYY-MM-DD"),
      label: period === "month" ? day.format("D") : day.format("M/D"),
      events,
    };
  });
};
