import apiProvider from "../utils/apiProvider";
const headers = {
  "Content-type": "application/json",
};

const authService = {
  //rota da Api para login de usuário
  login: async (email, password) => {
    try {
      const response = await apiProvider.post(
        "users/login/",
        {email, password},
        headers
      );

      console.log("Login response:", response);
      return response;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  //rota da Api para envio dos dados de criação da conta
  createAccount: async (obj) => {
    try {
      const response = await apiProvider.post("users/create/", obj, headers);

      console.log("Conta necessita de verificação");
      return response;
    } catch (error) {
      console.log("Erro na criação da conta:", error);
      throw error;
    }
  },

  //rota da Api para envio do código de confirmação do email na criação da conta
  accountConfirmation: async (code) => {
    try {
      const response = await apiProvider.post(
        "users/verifyemail/",
        {code},
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
        {email},
        headers
      );

      console.log("Código enviado.");
      return response;
    } catch (error) {
      console.log("Erro na solicitação via email:", error);
      throw error;
    }
  },

  accountCodeForRecovery: async (code) => {
    try {
      const response = await apiProvider.post(
        "users/passwordresetvalidate",
        {code},
        headers
      );

      console.log("Código confirmado.");
      return response;
    } catch (error) {
      console.log("Erro na confirmação do código:", error);
      throw error;
    }
  },

  accountNewPassword: async (password) => {
    try {
      if (password.length < 8) {
        return "Senha não pode ter menos de 8 caracteres.";
      }

      const response = await apiProvider.post(
        "users/passwordresetnewpass",
        {password},
        headers
      );

      console.log("Senha confirmada.");
      return response;
    } catch (error) {
      console.log("Erro na troca de conta:", error);
      throw error;
    }
  },
};

export default authService;
