import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts";
import { SOFT_COLORS } from "../constants";
import { ChartPanel, KpiCard, SleepTimelineChart } from "../shared";
import type {
  PeriodType,
  SleepChartView,
  StatisticsSleepData,
} from "../types";
import { formatMinutes } from "../utils";

type SleepTabProps = {
  period: PeriodType;
  chartView: SleepChartView;
  onChartViewChange: (value: SleepChartView) => void;
  data: StatisticsSleepData;
};

export const SleepTab = ({
  period,
  chartView,
  onChartViewChange,
  data,
}: SleepTabProps) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <KpiCard
            icon={<BedtimeRoundedIcon sx={{ color: "#1e88e5" }} />}
            title={data.bedtimeCardTitle}
            value={data.commonBedtime.label}
            bg={SOFT_COLORS.babyBlue}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <KpiCard
            icon={<AccessTimeRoundedIcon sx={{ color: "#8e24aa" }} />}
            title="平均連続睡眠時間"
            value={formatMinutes(data.avgContinuousSleep)}
            bg={SOFT_COLORS.lavender}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <KpiCard
            icon={data.totalCard.icon}
            title={data.totalCard.title}
            value={formatMinutes(data.totalSleepMinutes)}
            bg={data.totalCard.bg}
          />
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: `1px solid ${SOFT_COLORS.border}`,
          backgroundColor: "#ffffff",
          p: 1,
        }}
      >
        <Tabs
          value={chartView}
          onChange={(_, value: SleepChartView) => onChartViewChange(value)}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 4,
              backgroundColor: "#90caf9",
            },
          }}
        >
          <Tab label="寝始め時間帯の分布" value="bedtime" />
          <Tab
            label={
              period === "day"
                ? "当日の睡眠時間"
                : period === "week"
                  ? "当週の睡眠時間"
                  : "当月の睡眠時間"
            }
            value="duration"
          />
          <Tab label="睡眠タイムライン" value="timeline" />
        </Tabs>
      </Paper>

      {chartView === "bedtime" ? (
        <ChartPanel title="寝始め時間帯の分布（24時間）">
          <BarChart
            height={300}
            xAxis={[
              {
                scaleType: "band",
                data: data.bedtimeByHour.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: data.bedtimeByHour.map((item) => item.count),
                label: "回数",
                color: "#5e92f3",
              },
            ]}
            yAxis={[{ label: "回数" }]}
            margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
            grid={{ horizontal: true }}
          />
        </ChartPanel>
      ) : chartView === "timeline" ? (
        <ChartPanel title="睡眠タイムライン（1日単位）">
          <SleepTimelineChart days={data.sleepTimelineData} />
        </ChartPanel>
      ) : (
        <ChartPanel
          title={
            period === "day"
              ? "当日の睡眠時間"
              : period === "week"
                ? "当週の睡眠時間"
                : "当月の睡眠時間"
          }
        >
          <BarChart
            height={320}
            xAxis={[
              {
                scaleType: "band",
                data: data.sleepChartData.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: data.sleepChartData.map((item) => item.dayHours),
                label: "昼寝",
                stack: "total",
                color: "#90caf9",
              },
              {
                data: data.sleepChartData.map((item) => item.nightHours),
                label: "夜睡眠",
                stack: "total",
                color: "#42a5f5",
              },
            ]}
            yAxis={[{ label: "時間" }]}
            margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
            grid={{ horizontal: true }}
          />
        </ChartPanel>
      )}

      <Typography sx={{ fontSize: 13, color: SOFT_COLORS.textSub }}>
        参考: 合計睡眠 {formatMinutes(data.totalSleepMinutes)} / 最長連続睡眠{" "}
        {formatMinutes(data.longestSleepMinutes)}
      </Typography>
    </Stack>
  );
};
