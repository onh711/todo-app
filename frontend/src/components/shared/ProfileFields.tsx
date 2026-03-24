import TextField from "@mui/material/TextField";

type ProfileFieldValues = {
  name: string;
  mail_address: string;
  baby_name: string;
};

type ProfileFieldsProps = {
  values: ProfileFieldValues;
  errors: Record<keyof ProfileFieldValues, string>;
  onChange: (key: keyof ProfileFieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileFields = ({ values, errors, onChange }: ProfileFieldsProps) => {
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="氏名"
        value={values.name}
        onChange={onChange("name")}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="メールアドレス"
        value={values.mail_address}
        onChange={onChange("mail_address")}
        error={!!errors.mail_address}
        helperText={errors.mail_address}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="子供の名前"
        value={values.baby_name}
        onChange={onChange("baby_name")}
        error={!!errors.baby_name}
        helperText={errors.baby_name}
      />
    </>
  );
};

