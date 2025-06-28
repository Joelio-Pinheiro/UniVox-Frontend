export default function CustomPageHead({ icon, text }) {
  return (
    <div className="flex items-center flex-col relative h-min w-max">
      <img
        className=" relative w-84 h-24"
        src={icon}
        alt="Univox_label_1"
      />
      <h1 className=" relative text-center text-2xl font-medium">
        {text}
      </h1>
    </div>
  );
}
