export function SectionBar({section}) {
  console.log(section);
  return (
    <div className="w-full h-3.5 grid grid-cols-4 gap-1 rounded-md border-black bg-blue-900 ">
      <div className={`w-full rounded-md border-black bg-blue-950`} />

      <div className="w-full rounded-md border-black bg-blue-950" />

      <div className="w-full rounded-md border-black bg-blue-950" />

      <div className="w-full rounded-md border-black bg-blue-950" />
    </div>
  );
}
