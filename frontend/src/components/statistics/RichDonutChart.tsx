import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type DonutData = {
  label: string;
  value: number;
  color: string;
};

type RichDonutChartProps = {
  data: DonutData[];
};

export const RichDonutChart = ({ data }: RichDonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cursor = 0;
  const gradient = total
    ? `conic-gradient(${data
        .map((item) => {
          const start = cursor;
          const ratio = (item.value / total) * 100;
          cursor += ratio;
          return `${item.color} ${start}% ${cursor}%`;
        })
        .join(", ")})`
    : "#e2e8f0";

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
      <Box
        sx={{
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: gradient,
          position: "relative",
          border: "1px solid #dbeafe",
          "&::after": {
            content: "\"\"",
            position: "absolute",
            inset: 30,
            borderRadius: "50%",
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack spacing={1} sx={{ width: "100%" }}>
        {data.map((item) => (
          <Stack key={item.label} direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <Typography sx={{ fontSize: 13 }}>{item.label}</Typography>
            </Stack>
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

