export function SectionBar({section}) {
  console.log(section);
  return (
    <div className="w-full h-3.5 -mt-2 grid grid-cols-4 gap-1 rounded-md border-black bg-blue-900 ">
      <div
        className={`w-full rounded-md border-black ${
          section === "posts" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />

      <div
        className={`w-full rounded-md border-black ${
          section === "comments" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />

      <div
        className={`w-full rounded-md border-black ${
          section === "liked" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />

      <div
        className={`w-full rounded-md border-black ${
          section === "disliked" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />
    </div>
  );
}
