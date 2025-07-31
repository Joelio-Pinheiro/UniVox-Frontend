import { useParams } from "react-router-dom";
import Content from "../../customComponents/Content";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div className="flex justify-center w-full p-2 sm:p-4 mt-4 h-full gap-2">
        <Content itemId={id} section="comments" />
    </div>
  );
}


