export function EmailConfirmPageHead({ icon, text }) {
  return (
    <div className="relative flex items-center flex-col h-1/4 w-full sm:h-1/4 md:h-1/5 lg:h-1/4 mt-20 sm:mt-12 md:mt-12 lg:mt-12">
      <img
        className="relative w-42 h-20 sm:w-24 md:w-24 lg:w-24"
        src={icon}
        alt="Univox_label_1"
      />
      <h1 className=" relative text-center text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-medium mt-2">
        {text}
      </h1>
    </div>
  );
}
