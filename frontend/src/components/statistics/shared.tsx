import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SOFT_COLORS } from "./constants";
import type {
  ChartPanelProps,
  ExcretionTimelineDay,
  FeedTimelineDay,
  KpiCardProps,
  SleepTimelineDay,
} from "./types";
import { formatHourLabel } from "./utils";

export const KpiCard = ({ icon, title, value, bg }: KpiCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${SOFT_COLORS.border}`,
        backgroundColor: bg,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 1 }}>
        {icon}
        <Typography sx={{ fontSize: 14, color: SOFT_COLORS.textSub }}>
          {title}
        </Typography>
      </Stack>
      <Typography
        sx={{ fontSize: 30, fontWeight: 700, color: SOFT_COLORS.textMain }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export const ChartPanel = ({ title, children }: ChartPanelProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${SOFT_COLORS.border}`,
        backgroundColor: "#ffffff",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: SOFT_COLORS.textMain,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

type SleepTimelineChartProps = {
  days: SleepTimelineDay[];
};

export const SleepTimelineChart = ({ days }: SleepTimelineChartProps) => {
  const chartHeight = 320;
  const axisHours = [0, 6, 12, 18, 24];
  const minColumnWidth = days.length === 1 ? 120 : 56;
  const chartWidth = Math.max(days.length * minColumnWidth, 240);

  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      <Box
        sx={{
          width: 42,
          height: chartHeight,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {axisHours.map((hour) => (
          <Typography
            key={hour}
            sx={{
              position: "absolute",
              top: `${(hour / 24) * 100}%`,
              left: 0,
              transform: "translateY(-50%)",
              fontSize: 11,
              color: SOFT_COLORS.textSub,
            }}
          >
            {formatHourLabel(hour)}
          </Typography>
        ))}
      </Box>
      <Box sx={{ flex: 1, overflowX: "auto", pb: 1 }}>
        <Box sx={{ minWidth: chartWidth }}>
          <Box sx={{ position: "relative", height: chartHeight }}>
            {axisHours.map((hour) => (
              <Box
                key={hour}
                sx={{
                  position: "absolute",
                  top: `${(hour / 24) * 100}%`,
                  left: 0,
                  right: 0,
                  borderTop: "1px dashed #dfe7ee",
                  zIndex: 0,
                }}
              />
            ))}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${days.length}, minmax(${minColumnWidth}px, 1fr))`,
                gap: 1,
                height: "100%",
                position: "relative",
                zIndex: 1,
              }}
            >
              {days.map((day) => (
                <Box
                  key={day.key}
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    border: `1px solid ${SOFT_COLORS.border}`,
                    background:
                      "linear-gradient(to bottom, rgba(227,242,253,0.45), rgba(255,255,255,0.85))",
                    overflow: "hidden",
                  }}
                >
                  {day.segments.length === 0 ? (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#b0bec5",
                        fontSize: 11,
                      }}
                    >
                      -
                    </Box>
                  ) : (
                    day.segments.map((segment) => (
                      <Box
                        key={segment.id}
                        sx={{
                          position: "absolute",
                          left: "18%",
                          right: "18%",
                          top: `${(segment.startMinutes / (24 * 60)) * 100}%`,
                          height: `${Math.max(((segment.endMinutes - segment.startMinutes) / (24 * 60)) * 100, 1.1)}%`,
                          borderRadius: 999,
                          background:
                            "linear-gradient(180deg, #42a5f5 0%, #1e88e5 100%)",
                          boxShadow: "0 4px 12px rgba(30, 136, 229, 0.18)",
                        }}
                      />
                    ))
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${days.length}, minmax(${minColumnWidth}px, 1fr))`,
              gap: 1,
              mt: 1,
            }}
          >
            {days.map((day) => (
              <Typography
                key={day.key}
                sx={{
                  textAlign: "center",
                  fontSize: 12,
                  color: SOFT_COLORS.textSub,
                }}
              >
                {day.label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type FeedTimelineChartProps = {
  days: FeedTimelineDay[];
};

export const FeedTimelineChart = ({ days }: FeedTimelineChartProps) => {
  const chartHeight = 320;
  const axisHours = [0, 6, 12, 18, 24];
  const minColumnWidth = days.length === 1 ? 120 : 56;
  const chartWidth = Math.max(days.length * minColumnWidth, 240);
  const colorByKind = {
    milk: "#fb8c00",
    meal: "#43a047",
  } as const;

  return (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: SOFT_COLORS.textSub, fontSize: 12 }}
      >
        <Stack direction="row" spacing={0.8} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: colorByKind.milk,
            }}
          />
          <Typography sx={{ fontSize: 12, color: SOFT_COLORS.textSub }}>
            授乳
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: colorByKind.meal,
            }}
          />
          <Typography sx={{ fontSize: 12, color: SOFT_COLORS.textSub }}>
            食事
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: chartHeight,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {axisHours.map((hour) => (
            <Typography
              key={hour}
              sx={{
                position: "absolute",
                top: `${(hour / 24) * 100}%`,
                left: 0,
                transform: "translateY(-50%)",
                fontSize: 11,
                color: SOFT_COLORS.textSub,
              }}
            >
              {formatHourLabel(hour)}
            </Typography>
          ))}
        </Box>
        <Box sx={{ flex: 1, overflowX: "auto", pb: 1 }}>
          <Box sx={{ minWidth: chartWidth }}>
            <Box sx={{ position: "relative", height: chartHeight }}>
              {axisHours.map((hour) => (
                <Box
                  key={hour}
                  sx={{
                    position: "absolute",
                    top: `${(hour / 24) * 100}%`,
                    left: 0,
                    right: 0,
                    borderTop: "1px dashed #dfe7ee",
                    zIndex: 0,
                  }}
                />
              ))}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${days.length}, minmax(${minColumnWidth}px, 1fr))`,
                  gap: 1,
                  height: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {days.map((day) => (
                  <Box
                    key={day.key}
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      border: `1px solid ${SOFT_COLORS.border}`,
                      background:
                        "linear-gradient(to bottom, rgba(252,228,236,0.35), rgba(255,255,255,0.9))",
                      overflow: "hidden",
                    }}
                  >
                    {day.events.length === 0 ? (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#b0bec5",
                          fontSize: 11,
                        }}
                      >
                        -
                      </Box>
                    ) : (
                      day.events.map((event) => (
                        <Box
                          key={event.id}
                          sx={{
                            position: "absolute",
                            left: "50%",
                            top: `${(event.minutes / (24 * 60)) * 100}%`,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: colorByKind[event.kind],
                            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.14)",
                            border: "2px solid rgba(255,255,255,0.92)",
                          }}
                        />
                      ))
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${days.length}, minmax(${minColumnWidth}px, 1fr))`,
                gap: 1,
                mt: 1,
              }}
            >
              {days.map((day) => (
                <Typography
                  key={day.key}
                  sx={{
                    textAlign: "center",
                    fontSize: 12,
                    color: SOFT_COLORS.textSub,
                  }}
                >
                  {day.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

type ExcretionTimelineChartProps = {
  days: ExcretionTimelineDay[];
};

export const ExcretionTimelineChart = ({
  days,
}: ExcretionTimelineChartProps) => {
  const chartHeight = 320;
  const axisHours = [0, 6, 12, 18, 24];
  const minColumnWidth = days.length === 1 ? 120 : 56;
  const chartWidth = Math.max(days.length * minColumnWidth, 240);
  const colorByKind = {
    pee: "#42a5f5",
    poo: "#8d6e63",
    mixed: "#26a69a",
  } as const;

  return (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ color: SOFT_COLORS.textSub, fontSize: 12 }}
      >
        <Stack direction="row" spacing={0.8} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: colorByKind.pee,
            }}
          />
          <Typography sx={{ fontSize: 12, color: SOFT_COLORS.textSub }}>
            おしっこ
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: colorByKind.poo,
            }}
          />
          <Typography sx={{ fontSize: 12, color: SOFT_COLORS.textSub }}>
            うんち
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: colorByKind.mixed,
            }}
          />
          <Typography sx={{ fontSize: 12, color: SOFT_COLORS.textSub }}>
            両方
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: chartHeight,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {axisHours.map((hour) => (
            <Typography
              key={hour}
              sx={{
                position: "absolute",
                top: `${(hour / 24) * 100}%`,
                left: 0,
                transform: "translateY(-50%)",
                fontSize: 11,
                color: SOFT_COLORS.textSub,
              }}
            >
              {formatHourLabel(hour)}
            </Typography>
          ))}
        </Box>
        <Box sx={{ flex: 1, overflowX: "auto", pb: 1 }}>
          <Box sx={{ minWidth: chartWidth }}>
            <Box sx={{ position: "relative", height: chartHeight }}>
              {axisHours.map((hour) => (
                <Box
                  key={hour}
                  sx={{
                    position: "absolute",
                    top: `${(hour / 24) * 100}%`,
                    left: 0,
                    right: 0,
                    borderTop: "1px dashed #dfe7ee",
                    zIndex: 0,
                  }}
                />
              ))}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${days.length}, minmax(${minColumnWidth}px, 1fr))`,
                  gap: 1,
                  height: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {days.map((day) => (
                  <Box
                    key={day.key}
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      border: `1px solid ${SOFT_COLORS.border}`,
                      background:
                        "linear-gradient(to bottom, rgba(227,242,253,0.32), rgba(255,255,255,0.92))",
                      overflow: "hidden",
                    }}
                  >
                    {day.events.length === 0 ? (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#b0bec5",
                          fontSize: 11,
                        }}
                      >
                        -
                      </Box>
                    ) : (
                      day.events.map((event) => (
                        <Box
                          key={event.id}
                          sx={{
                            position: "absolute",
                            left: "50%",
                            top: `${(event.minutes / (24 * 60)) * 100}%`,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: colorByKind[event.kind],
                            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.14)",
                            border: "2px solid rgba(255,255,255,0.92)",
                          }}
                        />
                      ))
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${days.length}, minmax(${minColumnWidth}px, 1fr))`,
                gap: 1,
                mt: 1,
              }}
            >
              {days.map((day) => (
                <Typography
                  key={day.key}
                  sx={{
                    textAlign: "center",
                    fontSize: 12,
                    color: SOFT_COLORS.textSub,
                  }}
                >
                  {day.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
