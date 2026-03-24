import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { BarChart, PieChart } from "@mui/x-charts";
import { SOFT_COLORS } from "../constants";
import { ChartPanel, KpiCard } from "../shared";
import type { StatisticsCryingData } from "../types";

type CryingTabProps = {
  data: StatisticsCryingData;
};

export const CryingTab = ({ data }: CryingTabProps) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            icon={<AccessTimeRoundedIcon sx={{ color: "#d81b60" }} />}
            title={data.timingCardTitle}
            value={data.commonCryingTime.label}
            bg={SOFT_COLORS.softPink}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            icon={<BarChartRoundedIcon sx={{ color: "#5e35b1" }} />}
            title="平均 泣き間隔"
            value={data.avgCryingIntervalText}
            bg={SOFT_COLORS.lavender}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            icon={<SentimentDissatisfiedRoundedIcon sx={{ color: "#e53935" }} />}
            title={data.countCardTitle}
            value={`${data.cryingActionsLength}回`}
            bg="#ffebee"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ChartPanel title="泣きの時間帯分布（24時間）">
            <BarChart
              height={320}
              xAxis={[
                {
                  scaleType: "band",
                  data: data.hourlyCryingStats.map((item) => item.label),
                },
              ]}
              series={[
                {
                  data: data.hourlyCryingStats.map((item) => item.count),
                  label: "泣き回数",
                  color: "#f06292",
                },
              ]}
              yAxis={[{ label: "回数" }]}
              margin={{ top: 20, bottom: 30, left: 45, right: 20 }}
              grid={{ horizontal: true }}
            />
          </ChartPanel>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <ChartPanel title="泣く理由の内訳">
            <PieChart
              height={300}
              series={[
                {
                  data:
                    data.cryingReasonData.length > 0
                      ? data.cryingReasonData
                      : [{ id: 0, value: 100, label: "不明", color: "#b0bec5" }],
                  innerRadius: 45,
                  outerRadius: 95,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  cx: 120,
                  cy: 145,
                },
              ]}
              margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </ChartPanel>
        </Grid>
      </Grid>
    </Stack>
  );
};
