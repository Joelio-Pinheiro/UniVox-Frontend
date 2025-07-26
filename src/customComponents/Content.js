import { profileIconSetter, rankIconSetter } from "../utils/iconSetters";
import InteractionButton from "./buttons/InteractionButton";

export default function Content({ item, section }) {
  return (
    <div className="relative w-full h-min flex flex-col mt-2 bg-white rounded-lg">
      {/**header do post/comentário, com nome, foto de perfil, etc */}
      <div className="relative w-11/12 sm:w-11/12 md:w-11/12 lg:w-3/5 h-12 flex flex-row">
        <div className="w-1/3 h-3/4 mt-2">
          {profileIconSetter(item.pictureType)}
        </div>
        <div className="w-full h-full items-start">
          <p className="mt-3 font-semibold text-lg sm:text-xl md:text-xl lg:text-xl float-start">
            {item.name}
          </p>
        </div>
        <div className="w-1/4 h-3/4 flex items-center flex-col bg-slate-700">
          {rankIconSetter(item.rank)}
        </div>
        {/*faltando o botão de 3 pontos*/}
      </div>

      <div className="w-full flex items-center flex-col gap-2">
        {/**comentário ou texto de postagem */}
        <div className="relative w-11/12 h-min flex items-center flex-row rounded-sm">
          <p className="text-xl font-medium">{item.text}</p>
        </div>

        {/* *botões de curtir e descurtir vão aqui. O de comentar também, se a seção não for a de comentários*/}
        <div className="relative w-11/12 h-1/6 flex flex-row gap-2 bg-inherit mb-2">
          <InteractionButton type={"likes"} counter={item.likes} />

          <InteractionButton type={"dislikes"} counter={item.dislikes} />

          <InteractionButton type={"comment"} counter={null} />

          {/**data do comentário, exclusivo da aba de comentários do usuário*/}
          {section === "comments" && (
            <div className="relative w-full h-min">
              <p className="font-normal text-base float-end">
                Postado em {item.date}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
