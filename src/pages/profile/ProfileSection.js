import InteractionButton from "../../customComponents/buttons/InteractionButton";
import message from "../../messages.json";
import {profileIconSetter} from "../../utils/iconSetters";
import {rankIconSetter} from "../../utils/iconSetters";
export function ProfileSection({section, data}) {
  let warningMessage = "";

  switch (section) {
    case "posts":
      warningMessage = message.emptyPostsSection;
      break;
    case "comentarios":
      warningMessage = message.emptyCommentsSection;
      break;
    case "likes":
      warningMessage = message.emptyLikesSection;
      break;
    case "deslikes":
      warningMessage = message.emptyDeslikesSection;
      break;
    default:
      return;
  }

  return (
    <div className="relative w-full h-full flex items-center flex-col bg-gray-300">
      {/*se não houver nada para mostrar, exibe mensagem de erro */}
      {data.length === 0 ? (
        <div className="relative w-full h-full">
          <p>{warningMessage}</p>
        </div>
      ) : (
        <div className="relative w-11/12 h-56 mt-2">
          {data.map(
            ({
              name,
              pictureType,
              rank,
              tags,
              likes,
              dislikes,
              text,
              date,
              id,
            }) => (
              <div className="relative w-full h-full flex flex-col gap-2 bg-white rounded-lg">
                {/**header do post/comentário, com nome, foto de perfil, etc */}
                <div className="relative w-9/12 sm:w-2/3 md:w-2/3 lg:w-2/5 h-16 flex flex-row">
                  <div className="w-1/2 h-3/4 mt-2">
                    {profileIconSetter(pictureType)}
                  </div>
                  <div className="w-full h-full items-start">
                    <p className="mt-4 font-semibold text-xl float-start">
                      {name}
                    </p>
                  </div>
                  <div className="w-1/2 h-1/2 mt-4">{rankIconSetter(rank)}</div>
                  {/*faltando o botão de 3 pontos*/}
                </div>

                <div className="w-full flex items-center flex-col gap-2">
                  {/**comentário ou texto de postagem */}
                  <div className="relative w-11/12 h-min flex items-center flex-row bg-blue-300 rounded-sm">
                    <p className="text-xl font-medium">{text}</p>
                  </div>

                  {/* *botões de curtir e descurtir vão aqui. O de comentar também, se a seção não for a de comentários*/}
                  <div className="relative w-11/12 h-1/6 flex flex-row gap-2 bg-inherit">
                    <InteractionButton type={"likes"} counter={likes} />

                    <InteractionButton type={"dislikes"} counter={dislikes} />

                    <InteractionButton type={"comment"} counter={null} />

                    {/**data do comentário, exclusivo da aba de comentários do usuário*/}
                    {section === "comments" && (
                      <div className="relative w-min h-min float-end">
                        <p className="font-light">Postado em {date}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* seção de tags que existe em todas as seções menos a de
                comentários */}
                {/* {section !== "comments" && (
                  <div className="relative w-full h-1/6 bg-inherit">
                    <div></div>
                  </div>
                )} */}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
