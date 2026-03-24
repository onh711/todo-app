import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import type { DashboardTab, KpiCardMeta, PeriodType } from "./types";

export const SOFT_COLORS = {
  babyBlue: "#e3f2fd",
  softPink: "#fce4ec",
  mint: "#e8f5e9",
  softYellow: "#fff9c4",
  lavender: "#ede7f6",
  border: "#e0e0e0",
  textMain: "#263238",
  textSub: "#607d8b",
};

export const TAB_LABELS: Record<DashboardTab, string> = {
  sleep: "睡眠",
  meals: "食事・授乳",
  excretion: "排泄",
  crying: "泣き",
};

export const PERIOD_LABELS: Record<PeriodType, string> = {
  day: "日ごと",
  week: "週ごと",
  month: "月間",
};

export const SLEEP_BEDTIME_CARD_TITLE: Record<PeriodType, string> = {
  day: "寝始めの時間帯",
  week: "寝始めることが多い時間帯",
  month: "寝始めることが多い時間帯",
};

export const SLEEP_TOTAL_CARD_META: Record<PeriodType, KpiCardMeta> = {
  day: {
    title: "当日の総睡眠時間",
    bg: SOFT_COLORS.mint,
    icon: <AccessTimeRoundedIcon sx={{ color: "#2e7d32" }} />,
  },
  week: {
    title: "当週の総睡眠時間",
    bg: SOFT_COLORS.softYellow,
    icon: <BarChartRoundedIcon sx={{ color: "#ef6c00" }} />,
  },
  month: {
    title: "当月の総睡眠時間",
    bg: SOFT_COLORS.softPink,
    icon: <BedtimeRoundedIcon sx={{ color: "#d81b60" }} />,
  },
};

export const FEED_TOTAL_CARD_META: Record<PeriodType, KpiCardMeta> = {
  day: {
    title: "当日の食事・授乳回数",
    bg: SOFT_COLORS.softPink,
    icon: <ChildCareRoundedIcon sx={{ color: "#ec407a" }} />,
  },
  week: {
    title: "当週の食事・授乳回数",
    bg: SOFT_COLORS.softYellow,
    icon: <BarChartRoundedIcon sx={{ color: "#fb8c00" }} />,
  },
  month: {
    title: "当月の食事・授乳回数",
    bg: SOFT_COLORS.babyBlue,
    icon: <RestaurantRoundedIcon sx={{ color: "#1e88e5" }} />,
  },
};

export const FEED_TIMING_CARD_TITLE: Record<PeriodType, string> = {
  day: "食事・授乳の時間帯",
  week: "食事・授乳が多い時間帯",
  month: "食事・授乳が多い時間帯",
};

export const EXCRETION_TIMING_CARD_TITLE: Record<PeriodType, string> = {
  day: "排泄の時間帯",
  week: "排泄が多い時間帯",
  month: "排泄が多い時間帯",
};

export const EXCRETION_PEE_CARD_TITLE: Record<PeriodType, string> = {
  day: "当日のおしっこ回数",
  week: "当週のおしっこ回数",
  month: "当月のおしっこ回数",
};

export const EXCRETION_POO_CARD_TITLE: Record<PeriodType, string> = {
  day: "当日のうんち回数",
  week: "当週のうんち回数",
  month: "当月のうんち回数",
};

export const CRYING_TIMING_CARD_TITLE: Record<PeriodType, string> = {
  day: "泣いた時間帯",
  week: "泣くことが多い時間帯",
  month: "泣くことが多い時間帯",
};

export const CRYING_COUNT_CARD_TITLE: Record<PeriodType, string> = {
  day: "当日の泣いた回数",
  week: "当週の泣いた回数",
  month: "当月の泣いた回数",
};
