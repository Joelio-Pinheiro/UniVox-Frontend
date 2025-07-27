import Content from "../../customComponents/Content";
import { emptySectionMessage } from "../../utils/messageSetters";

export function ProfileSection({ section, data, loading }) {
  const warningMessage = emptySectionMessage(section);

  return (
    <div className="relative w-full h-full flex items-center flex-col rounded-md ">
      {/*se não houver nada para mostrar, exibe mensagem*/}
      {loading || data.length === 0 ? (
        <div className="relative w-full h-96 flex items-center flex-col rounded-md">
          <h1 className="text-gray-700 text-center font-semibold text-2xl mt-44">
            {warningMessage}
          </h1>
        </div>
      ) : (
        <div className="relative w-11/12 h-full">
          {data.map((item) => (
            <Content itemId={item.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
