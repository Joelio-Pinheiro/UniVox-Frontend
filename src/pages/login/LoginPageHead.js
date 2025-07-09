export function LoginPageHead({ icon, title }) {
  return (
    <div className="relative flex items-center flex-col h-1/5 w-full mt-8">
      <img
        className=" relative w-68 h-24 sm:w-80 md:w-80 lg:w-80"
        src={icon}
        alt="univox_icon"
      />
      <h1 className=" relative text-center text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-medium mt-2">
        {title}
      </h1>
    </div>
  );
}
