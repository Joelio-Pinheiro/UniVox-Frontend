import { Button } from "@mui/material";

export default function ProfileSectionsButton({
  sectionChange,
  section,
  text,
}) {
  return (
    <Button
      className="!border-gray-500"
      variant="text"
      size="small"
      onClick={() => sectionChange(section)}
    >
      {<p className="text-xs text-gray-500">{text}</p>}
    </Button>
  );
}
