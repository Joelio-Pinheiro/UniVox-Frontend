export function EmailForResetPageHead({ icon, text }) {
  return (
    <div className="relative flex items-center flex-col h-1/5 w-full mt-16">
      <img
        className="relative w-68 h-24 sm:w-80 md:w-80 lg:w-80"
        src={icon}
        alt="univox_icon"
      />
      <div className="relative flex items-center flex-col h-1/2 w-full sm:w-10/12 md:w-9/12 lg:w-1/2 mt-6">
        <p className="relative text-center text-xl font-normal mt-2 text-gray-600">
          {text}
        </p>
      </div>
    </div>
  );
}
