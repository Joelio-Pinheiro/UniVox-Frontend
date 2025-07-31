export function DeleteUserPageHead({ icon, text, warningText }) {
  return (
    <div className="relative flex items-center flex-col h-2/5 w-full gap-10 mt-12">
      <img
        className="relative w-68 h-24 sm:w-80 md:w-80 lg:w-80"
        src={icon}
        alt="univox_icon"
      />
      <div className="relative flex items-center flex-col w-full sm:w-10/12 md:w-9/12 lg:w-1/2">
        <p className="relative text-center text-xl font-normal text-gray-600">
          {text}
        </p>
        <h1 className="relative text-center text-2xl font-semibold mt-6 text-gray-900">
          {warningText}
        </h1>
      </div>
    </div>
  );
}
