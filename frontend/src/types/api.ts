import type { BabyAction } from "./babyAction";
import type { Task } from "./task";

export type DashboardResponse = {
  baby_actions: BabyAction[];
};

export type TasksResponse = {
  tasks: Task[];
};

export type AuthenticatedUser = {
  [key: string]: unknown;
};

export type ValidationErrorResponse = {
  message?: string;
  errors?: Partial<Record<string, string[]>>;
};
