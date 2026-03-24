export type TaskStatus = 1 | 2 | 3 | 4;

export type TaskStatusText = "未着手" | "進行中" | "完了" | "期限切れ";

export type Task = {
  id: number;
  title: string;
  content: string;
  status: TaskStatus;
  status_text: TaskStatusText;
  start_date: string;
  due_date: string;
};
