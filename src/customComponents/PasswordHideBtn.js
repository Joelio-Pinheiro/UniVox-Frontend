import { iconSetter } from "../utils/iconSetter";

export default function PasswordHideBtn({ name, onClickFn }) {
  const icon = iconSetter(name);
  return (
    <button type="button" name={name} onClick={onClickFn}>
      {icon}
    </button>
  );
}
