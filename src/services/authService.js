import apiProvider from "../utils/apiProvider";
const USER_DATA = "user_data";

const headers = {
  "Content-type": "application/json",
};

const authService = {
  //rota da Api para login de usuário
  login: async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Nenhum campo deve ser vazio");
      }

      const response = await apiProvider.post(
        "users/login/",
        { email, password },
        headers
      );

      const userId = response.user_id;
      localStorage.setItem("session_id", response.user_id);
      await authService.getUserById(userId);

      return response;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await apiProvider.post("users/logout/", {}, headers);
      return response;
    } catch (error) {
      throw error;
    } finally {
      if (localStorage.getItem(USER_DATA)) {
        localStorage.removeItem(USER_DATA);
      }
      localStorage.removeItem("session_id");
    }
  },
  getUserSession: async (id) => {
    try {
      const response = await apiProvider.get(`users/`, headers);

      if (!Array.isArray(response)) {
        throw new Error("Resposta inesperada da API.");
      }

      const user = response.find((u) => u.id === Number(id));

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
      const response = await apiProvider.get(`users/`, headers);

      if (!Array.isArray(response)) {
        throw new Error("Resposta inesperada da API.");
      }

      const user = response.find((u) => u.id === Number(userId));

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      localStorage.setItem(USER_DATA, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },

  //rota da Api para envio dos dados de criação da conta
  createAccount: async (fields) => {
    try {
      for (const key of Object.keys(fields)) {
        if (fields[key] === "") {
          throw new Error("Nenhum campo deve ser vazio");
        }
      }

      if (fields.contact_number.length < 11) {
        throw new Error("Número de Telefone inválido");
      }

      if (fields.password !== fields.password_confirmation) {
        throw new Error("As senhas não podem ser diferentes");
      }

      localStorage.setItem("email", fields.email);

      const json = {
        name: fields.name,
        password: fields.password,
        email: fields.email,
        contact_number: fields.contact_number,
      };

      const response = await apiProvider.post("users/create/", json, headers);
      console.log("Conta necessita de verificação");

      return response;
    } catch (error) {
      console.log("Erro na criação da conta:", error);
      throw error;
    }
  },

  //rota da Api para envio do código de confirmação do email na criação da conta
  accountConfirmation: async (type, code) => {
    try {
      const email = localStorage.getItem("email");

      if (email === "") {
        throw new Error("Por favor, digite um email válido");
      }

      const response = await apiProvider.post(
        "users/verifyemail/",
        { code, email },
        headers
      );

      if (type === "email-change") {
        await apiProvider.patch("users/profile/update", { email }, headers);
      }

      console.log("Conta verificada");
      return response;
    } catch (error) {
      console.log("Erro na confirmação da conta:", error);
      throw error;
    }
  },

  accountNewCodeRequest: async () => {
    try {
      const email = localStorage.getItem("email");

      if (email === "") {
        throw new Error("Por favor, faça o reenvio dos seus dados");
      }

      const response = await apiProvider.post(
        "users/passwordresetresend/",
        { email },
        headers
      );

      console.log("Conta verificada");
      return response;
    } catch (error) {
      console.log("Erro na confirmação da conta:", error);
      throw error;
    }
  },

  //rota da Api para envio do email por onde se recebe o código para troca de senha da conta
  accountEmailForRecovery: async (email) => {
    try {
      const response = await apiProvider.post(
        "users/passwordresetreq/",
        { email },
        headers
      );

      console.log("Código enviado.");
      return response;
    } catch (error) {
      console.log("Erro na solicitação via email:", error);
      throw error;
    }
  },

  //rota da Api para envio do código de confirmação do email cadastrado
  accountCodeForRecovery: async (code) => {
    try {
      const email = localStorage.getItem("email");

      if (email === "") {
        throw new Error("Por favor, digite um email válido");
      }

      if (code.length !== 4) {
        throw new Error("Código inválido");
      }

      const response = await apiProvider.post(
        "users/passwordresetvalidate/",
        { code, email },
        headers
      );

      console.log("Código confirmado.");
      return response;
    } catch (error) {
      console.log("Erro na confirmação do código:", error);
      throw error;
    }
  },

  //rota da Api para envio da nova senha da conta
  accountNewPassword: async (new_password, passwordConfirm) => {
    try {
      console.log(new_password);
      const email = localStorage.getItem("email");

      if (email === "") {
        throw new Error("Por favor, digite novamente seu email");
      }

      if (new_password !== passwordConfirm) {
        throw new Error("As senhas não podem ser diferentes");
      }

      const response = await apiProvider.post(
        "users/passwordresetnewpass/",
        { email, new_password },
        headers
      );

      console.log("Senha confirmada.");
      return response;
    } catch (error) {
      console.log("Erro na troca de conta:", error);
      throw error;
    }
  },

  //rota da API para requisitar posts, comentários, publicações curtidas e descurtidas pelo usuário
  contentRequest: async (section) => {
    try {
      let response;

      switch (section) {
        case "upvoted":
          response = await apiProvider.get(`users/me/posts/upvoted/`);
          break;
        case "downvoted":
          response = await apiProvider.get(`users/me/posts/downvoted/`);
          break;
        default:
          response = await apiProvider.get(`users/me/posts/`);
          break;
      }
      const filteredPosts = response.filter(post => post.is_deleted !== true);
      
      return filteredPosts;
    } catch (error) {
      console.log("Erro na solicitação");
      throw error;
    }
  },

  //rota da API para envio de dados editados pelo usuário
  updateProfile: async (data) => {
    try {
      console.log(data);
      await apiProvider.patch("users/profile/update/", data, headers);
    } catch (error) {
      throw error;
    }
  },

  deleteAccount: async (password) => {
    try {
      await apiProvider.delete(
        "users/deletelogged/",
        { password },
        headers
      );
      console.log("Conta removida com sucesso");
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
