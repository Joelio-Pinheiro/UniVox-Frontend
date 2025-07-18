import {inputIconSetter} from "../utils/iconSetters";

export default function PasswordHideBtn({name, onClickFn}) {
  const icon = inputIconSetter(name);
  return (
    <button type="button" name={name} onClick={onClickFn}>
      {icon}
    </button>
  );
}
