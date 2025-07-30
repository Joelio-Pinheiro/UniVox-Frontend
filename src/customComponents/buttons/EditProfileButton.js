import { BorderColorOutlined } from "@mui/icons-material";

export default function EditProfileButton({ onClickFn }) {
  return (
    <button
      type="button"
      className=" relative w-min h-min"
      onClick={onClickFn}
    >
      <BorderColorOutlined sx={{ color: "black" }} />
    </button>
  );
}
