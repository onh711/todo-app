export type BabyActionType = 1 | 2 | 3 | 4 | 5 | 6;

export type BabyAction = {
  id: number;
  baby_id: number;
  action: BabyActionType;
  action_text?: string;
  cry: boolean;
  start_date: string;
  end_date: string;
  milk_amount: number | null;
  memo: string | null;
};

