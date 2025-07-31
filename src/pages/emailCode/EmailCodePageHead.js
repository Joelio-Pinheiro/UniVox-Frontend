export function EmailCodePageHead({ icon, title, text }) {
  return (
    <div className="relative flex items-center flex-col h-1/4 w-full mt-12">
      <img
        className="relative w-42 h-20 sm:w-24 md:w-24 lg:w-24"
        src={icon}
        alt="univox_icon"
      />
      <h1 className="relative text-center text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-semibold text-indigo-950">
        {title}
      </h1>
      <p className="relative text-center text-xl sm:text-xl md:text-xl lg:text-2xl font-medium mt-6 text-gray-700">
        {text}
      </p>
    </div>
  );
}
