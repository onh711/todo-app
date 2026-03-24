import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts";
import { SOFT_COLORS } from "../constants";
import {
  ChartPanel,
  ExcretionTimelineChart,
  KpiCard,
} from "../shared";
import type {
  ExcretionChartView,
  PeriodType,
  StatisticsExcretionData,
} from "../types";

type ExcretionTabProps = {
  period: PeriodType;
  chartView: ExcretionChartView;
  onChartViewChange: (value: ExcretionChartView) => void;
  data: StatisticsExcretionData;
};

export const ExcretionTab = ({
  period,
  chartView,
  onChartViewChange,
  data,
}: ExcretionTabProps) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<AccessTimeRoundedIcon sx={{ color: "#0288d1" }} />}
            title={data.timingCardTitle}
            value={data.commonExcretionTime.label}
            bg={SOFT_COLORS.babyBlue}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<BarChartRoundedIcon sx={{ color: "#00897b" }} />}
            title="平均 排泄間隔"
            value={data.avgExcretionIntervalText}
            bg="#e0f2f1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<WaterDropRoundedIcon sx={{ color: "#1e88e5" }} />}
            title={data.peeCardTitle}
            value={`${data.peeActionsLength}回`}
            bg={SOFT_COLORS.babyBlue}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            icon={<ChildCareRoundedIcon sx={{ color: "#6d4c41" }} />}
            title={data.pooCardTitle}
            value={`${data.pooActionsLength}回`}
            bg="#efebe9"
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
          onChange={(_, value: ExcretionChartView) => onChartViewChange(value)}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 4,
              backgroundColor: "#4db6ac",
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
          <Tab label="排泄タイムライン" value="timeline" />
        </Tabs>
      </Paper>

      {chartView === "distribution" ? (
        <ChartPanel title="排泄の時間帯分布（24時間）">
          <BarChart
            height={320}
            xAxis={[
              {
                scaleType: "band",
                data: data.hourlyExcretionStats.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: data.hourlyExcretionStats.map((item) => item.peeCount),
                label: "おしっこ",
                stack: "total",
                color: "#42a5f5",
              },
              {
                data: data.hourlyExcretionStats.map((item) => item.pooCount),
                label: "うんち",
                stack: "total",
                color: "#8d6e63",
              },
              {
                data: data.hourlyExcretionStats.map((item) => item.mixedCount),
                label: "両方",
                stack: "total",
                color: "#26a69a",
              },
            ]}
            yAxis={[{ label: "回数" }]}
            margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
            grid={{ horizontal: true }}
          />
        </ChartPanel>
      ) : chartView === "timeline" ? (
        <ChartPanel title="排泄タイムライン（1日単位）">
          <ExcretionTimelineChart days={data.excretionTimelineData} />
        </ChartPanel>
      ) : (
        <ChartPanel
          title={
            period === "day"
              ? "当日の排泄回数"
              : period === "week"
                ? "当週の排泄回数"
                : "当月の排泄回数"
          }
        >
          <BarChart
            height={320}
            xAxis={[
              {
                scaleType: "band",
                data: data.excretionCountChartData.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: data.excretionCountChartData.map((item) => item.peeCount),
                label: "おしっこ",
                stack: "total",
                color: "#42a5f5",
              },
              {
                data: data.excretionCountChartData.map((item) => item.pooCount),
                label: "うんち",
                stack: "total",
                color: "#8d6e63",
              },
              {
                data: data.excretionCountChartData.map((item) => item.mixedCount),
                label: "両方",
                stack: "total",
                color: "#26a69a",
              },
            ]}
            yAxis={[{ label: "回数" }]}
            margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
            grid={{ horizontal: true }}
          />
        </ChartPanel>
      )}

      <Typography sx={{ fontSize: 13, color: SOFT_COLORS.textSub }}>
        参考: おしっこを含む記録 {data.peeActionsLength}回 / うんちを含む記録{" "}
        {data.pooActionsLength}回 / 両方 {data.mixedActionsLength}回 / 前回のうんちから{" "}
        {data.lastPooFromNow}
      </Typography>
    </Stack>
  );
};
