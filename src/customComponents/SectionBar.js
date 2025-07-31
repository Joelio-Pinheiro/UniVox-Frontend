export function SectionBar({ section }) {
  return (
    <div className="w-11/12 h-1.5 grid grid-cols-3 gap-1 rounded-md border-black bg-blue-900 ">
      <div
        className={`w-full rounded-md border-black ${
          section === "posts" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />

      {/* <div
        className={`w-full rounded-md border-black ${
          section === "comments" ? "bg-blue-950" : "bg-blue-900"
        }`}
      /> */}

      <div
        className={`w-full rounded-md border-black ${
          section === "upvoted" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />

      <div
        className={`w-full rounded-md border-black ${
          section === "downvoted" ? "bg-blue-950" : "bg-blue-900"
        }`}
      />
    </div>
  );
}
