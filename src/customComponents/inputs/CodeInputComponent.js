import {TextField} from "@mui/material";

export default function CodeInputComponent({name, value, onChangeFn}) {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChangeFn}
      fullWidth
      variant="outlined"
      sx={{"& input": {textAlign: "center", fontSize: "32px"}}}
    />
  );
}
