import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type RichBarChartProps = {
  data: Array<{ label: string; value: number }>;
  color?: string;
  height?: number;
  unit?: string;
};

export const RichBarChart = ({
  data,
  color = "#3b82f6",
  height = 160,
  unit = "件",
}: RichBarChartProps) => {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <Stack spacing={1.2}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
          alignItems: "end",
          gap: 0.5,
          height,
          p: 1,
          borderRadius: 2,
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        {data.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Box
              title={`${item.label}: ${item.value}${unit}`}
              sx={{
                width: "65%",
                height: `${(item.value / max) * 100}%`,
                minHeight: item.value > 0 ? 4 : 0,
                borderRadius: "8px 8px 4px 4px",
                background: `linear-gradient(180deg, ${color} 0%, #1e3a8a 100%)`,
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
          gap: 0.5,
        }}
      >
        {data.map((item, index) => (
          <Typography
            key={`${item.label}-${index}`}
            sx={{ fontSize: 10, color: "#64748b", textAlign: "center" }}
          >
            {item.label.slice(0, 2)}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};
