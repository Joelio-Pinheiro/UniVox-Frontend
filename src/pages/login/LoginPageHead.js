export function LoginPageHead({ icon, text }) {
  return (
    <div className="relative flex items-center flex-col h-1/5 w-full sm:mt-6 md:mt-6 lg:mt-6">
      <img
        className=" relative w-68 h-24 sm:w-80 md:w-80 lg:w-80"
        src={icon}
        alt="Univox_label_1"
      />
      <h1 className=" relative text-center text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-medium mt-2">
        {text}
      </h1>
    </div>
  );
}
