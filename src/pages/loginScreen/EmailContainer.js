import { TextField } from "@mui/material";

export function EmailContainer({ email, onChangeFn }) {
  return (
    <div>
      <p className="text-gray-500 font-semibold">Email</p>
      <TextField
        sx={{ width: "240px" }}
        id="emailInput"
        variant="outlined"
        value={email}
        onChange={onChangeFn}
      />
    </div>
  );
}
