import { useState } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import {
  PERIOD_LABELS,
  SOFT_COLORS,
  TAB_LABELS,
} from "./statistics/constants";
import { useStatisticsData } from "./statistics/useStatisticsData";
import { shiftPeriod } from "./statistics/utils";
import { CryingTab } from "./statistics/tabs/CryingTab";
import { ExcretionTab } from "./statistics/tabs/ExcretionTab";
import { MealsTab } from "./statistics/tabs/MealsTab";
import { SleepTab } from "./statistics/tabs/SleepTab";
import type {
  DashboardTab,
  ExcretionChartView,
  FeedChartView,
  PeriodType,
  SleepChartView,
} from "./statistics/types";

export const Statistics = () => {
  const [tab, setTab] = useState<DashboardTab>("sleep");
  const [sleepChartView, setSleepChartView] =
    useState<SleepChartView>("bedtime");
  const [feedChartView, setFeedChartView] =
    useState<FeedChartView>("distribution");
  const [excretionChartView, setExcretionChartView] =
    useState<ExcretionChartView>("distribution");
  const [period, setPeriod] = useState<PeriodType>("month");
  const [baseDate, setBaseDate] = useState(dayjs());

  const statistics = useStatisticsData(baseDate, period);

  if (statistics.loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography sx={{ mb: 2 }}>統計を読み込み中...</Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          background: "linear-gradient(180deg, #fafcff 0%, #f9fbff 35%, #ffffff 100%)",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              border: `1px solid ${SOFT_COLORS.border}`,
              backgroundColor: "#ffffff",
              p: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={1.5}
              sx={{ mb: 1.5 }}
            >
              <Typography sx={{ fontSize: 14, color: SOFT_COLORS.textSub }}>
                表示期間: {statistics.periodLabel}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <DatePicker
                  label="基準日"
                  value={baseDate}
                  onChange={(value) => {
                    if (value) {
                      setBaseDate(value);
                    }
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setBaseDate(shiftPeriod(baseDate, period, -1))}
                >
                  前
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={!statistics.canMoveNext}
                  onClick={() => setBaseDate(shiftPeriod(baseDate, period, 1))}
                >
                  次
                </Button>
              </Stack>
            </Stack>

            <ToggleButtonGroup
              exclusive
              size="small"
              value={period}
              onChange={(_, value: PeriodType | null) => {
                if (value) {
                  setPeriod(value);
                }
              }}
              sx={{ mb: 1.5 }}
            >
              <ToggleButton value="day">{PERIOD_LABELS.day}</ToggleButton>
              <ToggleButton value="week">{PERIOD_LABELS.week}</ToggleButton>
              <ToggleButton value="month">{PERIOD_LABELS.month}</ToggleButton>
            </ToggleButtonGroup>

            <Tabs
              value={tab}
              onChange={(_, value: DashboardTab) => setTab(value)}
              variant="scrollable"
              allowScrollButtonsMobile
              sx={{
                "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: 4,
                  backgroundColor: "#90caf9",
                },
              }}
            >
              <Tab
                icon={<BedtimeRoundedIcon />}
                iconPosition="start"
                label={TAB_LABELS.sleep}
                value="sleep"
              />
              <Tab
                icon={<RestaurantRoundedIcon />}
                iconPosition="start"
                label={TAB_LABELS.meals}
                value="meals"
              />
              <Tab
                icon={<WaterDropRoundedIcon />}
                iconPosition="start"
                label={TAB_LABELS.excretion}
                value="excretion"
              />
              <Tab
                icon={<SentimentDissatisfiedRoundedIcon />}
                iconPosition="start"
                label={TAB_LABELS.crying}
                value="crying"
              />
            </Tabs>
          </Paper>

          {tab === "sleep" && (
            <SleepTab
              period={period}
              chartView={sleepChartView}
              onChartViewChange={setSleepChartView}
              data={statistics.sleep}
            />
          )}

          {tab === "meals" && (
            <MealsTab
              period={period}
              chartView={feedChartView}
              onChartViewChange={setFeedChartView}
              data={statistics.meals}
            />
          )}

          {tab === "excretion" && (
            <ExcretionTab
              period={period}
              chartView={excretionChartView}
              onChartViewChange={setExcretionChartView}
              data={statistics.excretion}
            />
          )}

          {tab === "crying" && <CryingTab data={statistics.crying} />}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
