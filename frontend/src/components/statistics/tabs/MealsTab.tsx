import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { BarChart } from "@mui/x-charts";
import { SOFT_COLORS } from "../constants";
import { ChartPanel, FeedTimelineChart, KpiCard } from "../shared";
import type {
  FeedChartView,
  PeriodType,
  StatisticsMealsData,
} from "../types";
import { formatMinutes } from "../utils";

type MealsTabProps = {
  period: PeriodType;
  chartView: FeedChartView;
  onChartViewChange: (value: FeedChartView) => void;
  data: StatisticsMealsData;
};

export const MealsTab = ({
  period,
  chartView,
  onChartViewChange,
  data,
}: MealsTabProps) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<AccessTimeRoundedIcon sx={{ color: "#5e35b1" }} />}
            title={data.timingCardTitle}
            value={data.commonFeedTime.label}
            bg={SOFT_COLORS.lavender}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<BarChartRoundedIcon sx={{ color: "#2e7d32" }} />}
            title="平均 食事・授乳間隔"
            value={data.avgFeedMealIntervalText}
            bg={SOFT_COLORS.mint}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={data.totalCard.icon}
            title={data.totalCard.title}
            value={`${data.totalFeedMealCount}回`}
            bg={data.totalCard.bg}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<LocalCafeRoundedIcon sx={{ color: "#fb8c00" }} />}
            title="母乳 / ミルク合計"
            value={`${formatMinutes(data.totalBreastMinutes)} / ${data.totalFormulaMl}ml`}
            bg={SOFT_COLORS.softYellow}
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
          onChange={(_, value: FeedChartView) => onChartViewChange(value)}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 4,
              backgroundColor: "#ffb74d",
            },
          }}
        >
          <Tab label="時間帯の分布" value="distribution" />
          <Tab
            label={
              period === "day"
                ? "当日の回数"
                : period === "week"
                  ? "当週の回数"
                  : "当月の回数"
            }
            value="count"
          />
          <Tab label="食事・授乳タイムライン" value="timeline" />
        </Tabs>
      </Paper>

      {chartView === "distribution" ? (
        <ChartPanel title="食事・授乳の時間帯分布（24時間）">
          <BarChart
            height={320}
            xAxis={[
              {
                scaleType: "band",
                data: data.hourlyFeedStats.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: data.hourlyFeedStats.map((item) => item.milkCount),
                label: "授乳",
                stack: "total",
                color: "#ffb74d",
              },
              {
                data: data.hourlyFeedStats.map((item) => item.mealCount),
                label: "食事",
                stack: "total",
                color: "#66bb6a",
              },
            ]}
            yAxis={[{ label: "回数" }]}
            margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
            grid={{ horizontal: true }}
          />
        </ChartPanel>
      ) : chartView === "timeline" ? (
        <ChartPanel title="食事・授乳タイムライン（1日単位）">
          <FeedTimelineChart days={data.feedTimelineData} />
        </ChartPanel>
      ) : (
        <ChartPanel
          title={
            period === "day"
              ? "当日の食事・授乳回数"
              : period === "week"
                ? "当週の食事・授乳回数"
                : "当月の食事・授乳回数"
          }
        >
          <BarChart
            height={320}
            xAxis={[
              {
                scaleType: "band",
                data: data.feedCountChartData.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: data.feedCountChartData.map((item) => item.milkCount),
                label: "授乳",
                stack: "total",
                color: "#ffb74d",
              },
              {
                data: data.feedCountChartData.map((item) => item.mealCount),
                label: "食事",
                stack: "total",
                color: "#66bb6a",
              },
            ]}
            yAxis={[{ label: "回数" }]}
            margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
            grid={{ horizontal: true }}
          />
        </ChartPanel>
      )}
    </Stack>
  );
};
