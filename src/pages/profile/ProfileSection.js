import message from "../../messages.json";
import {rankIconSetter} from "../../utils/rankIconSetter";
export function ProfileSection({section, data}) {
  let warningMessage = "";

  switch (section) {
    case "posts":
      warningMessage = message.emptyPostsSection;
      break;
    case "comments":
      warningMessage = message.emptyCommentsSection;
      break;
    case "likes":
      warningMessage = message.emptyLikesSection;
      break;
    case "deslikes":
      warningMessage = message.emptyDeslikesSection;
      break;
    default:
      break;
  }

  return (
    <div className="relative w-full h-1/2">
      {/*se não houver nada para mostrar, exibe mensagem de erro */}
      {data.length === 0 ? (
        <div className="relative w-full h-full bg-gray-400">
          <p>{warningMessage}</p>
        </div>
      ) : (
        <div className="relative w-full h-full bg-gray-400">
          {data.map(
            ({name, picture, rank, tags, likes, dislikes, text, date, id}) => (
              <div className="relative w-full h-min flex items-center flex-col bg-white">
                {/**header do post/comentário, com nome, foto de perfil, etc */}
                <div className="relative w-full h-1/6 grid grid-cols-4 gap-2 bg-inherit">
                  <>{picture}</>
                  <p className="mt-4 font-light">{name}</p>
                  <>{rankIconSetter(rank)}</>
                  {/*faltando o botão de 3 pontos*/}
                </div>

                {/**comentário ou texto de postagem */}
                <div className="relative w-9/12 h-1/2 flex items-center flex-row bg-blue-300">
                  <p className="text-xs font-medium">{text}</p>
                </div>

                {/*seção de tags que existe em todas as seções menos a de comentários */}
                {section !== "comments" && (
                  <div className="relative w-full h-1/6 bg-inherit">
                    <div></div>
                  </div>
                )}

                {/**botões de curtir e descurtir vão aqui. O de comentar também, se a seção não for a de comentários*/}
                <div className="relative w-full h-1/6 grid grid-cols-3 gap-2 bg-inherit">
                  <div className="border-4 rounded-md"></div>

                  {/**data do comentário, exclusivo da aba de comentários do usuário*/}
                  {section === "comments" && (
                    <div className="relative w-min h-min float-end">
                      <p className="font-light">Postado em {date}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
