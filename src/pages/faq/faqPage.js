import { Divider } from '@mui/material';

const faqItems = [
  {
    id: 1,
    question: "O que é o UniVox?",
    answer:
      "O UniVox é um fórum online criado para facilitar discussões, trocas de ideias e dúvidas entre estudantes universitários. Aqui você pode participar de tópicos acadêmicos, extracurriculares e sociais da sua universidade.",
  },
  {
    id: 2,
    question: "Quem pode usar o UniVox?",
    answer:
      "Estudantes, professores e membros autorizados da comunidade universitária. Basta ter um e-mail institucional válido para criar sua conta.",
  },
  {
    id: 3,
    question: "Como crio um novo tópico?",
    answer:
      "Clique no botão “Criar Post” no canto inferior da tela, escolha uma categoria, adicione um título e escreva sua mensagem. Você também pode anexar imagens ou links.",
  },
  {
    id: 4,
    question: "Posso seguir tópicos ou categorias específicas?",
    answer:
      "Sim! Basta clicar no botão “Seguir” em qualquer categoria ou tópico. Assim, você receberá notificações quando houver atualizações.",
  },
  {
    id: 5,
    question: "Como funcionam as notificações?",
    answer:
      "Você será notificado quando alguém responder suas postagens, marcar seu nome ou quando um tópico que você segue for atualizado. As notificações aparecem no ícone do sino no menu superior.",
  },
  {
    id: 6,
    question: "O que são os três pontinhos nas postagens?",
    answer:
      "Eles abrem um menu com ações como: denunciar, silenciar notificações, salvar ou copiar link da postagem.",
  },
  {
    id: 7,
    question: "Há limite de caracteres nas postagens?",
    answer:
      "Sim. O título deve ter até 100 caracteres, o corpo da postagem até 2000 caracteres e os comentários até 800.",
  },
  {
    id: 8,
    question: "Como denuncio um conteúdo impróprio?",
    answer:
      "Clique nos três pontinhos da postagem e selecione \"Denunciar\". O conteúdo será analisado pela moderação do UniVox.",
  },
  {
    id: 9,
    question: "Como edito ou excluo uma postagem minha?",
    answer:
      "Acesse sua postagem, clique nos três pontinhos e escolha \"Editar\" ou \"Excluir\".",
  },
  {
    id: 10,
    question: "Posso usar o UniVox no celular?",
    answer:
      "Sim! O UniVox é totalmente responsivo e funciona bem em navegadores móveis. Em breve, lançaremos um app dedicado para Android e iOS.",
  },
  {
    id: 11,
    question: "Como entrar em contato com a equipe UniVox e enviar uma pergunta?",
    answer:
      "Nos envie por e-mail com o tópico \"Pergunta para o FAQ\". E-mail de contato: univox.sup@gmail.com",
  },
];

export function FaqPage() {
  return (
    <div className="w-full px-4 md:px-12 lg:px-24 py-10 overflow-auto">
      <div className="max-w-4xl mx-auto shadow-lg rounded-xl p-8 border border-gray-200 bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Perguntas Frequentes (FAQ)</h1>

        {faqItems.map((item, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">{item.id}. {item.question}</h2>
            <p className="text-gray-700 text-base leading-relaxed mb-1">{item.answer}</p>
            {idx < faqItems.length - 1 && (
              <Divider className="my-6 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
