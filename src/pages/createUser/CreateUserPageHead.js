import UnivoxIcon from "../../icons/UnivoxIcon.png";

export function CreateUserPageHead() {
  return (
    <div className="relative h-min w-max">
      <div className=" flex items-center flex-col relative h-min ">
        <img
          className=" relative w-28 h-24"
          src={UnivoxIcon}
          alt="Univox_label_2"
        />
        <h1 className=" relative text-center text-4xl font-medium">
          Crie sua conta
        </h1>
      </div>
    </div>
  );
}
