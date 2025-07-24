import apiProvider from "../utils/apiProvider";

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

      if (password.length < 8) {
        throw new Error("Senha não deve ter menos de 8 caracteres");
      }

      const response = await apiProvider.post(
        "users/login/",
        { email, password },
        headers
      );

      console.log("Login response:", response);
      return response;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await apiProvider.post(
        "users/logout/", 
        {}, 
        headers);
      return response;  
    } catch (error) {
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

      if (fields.password.length < 8) {
        throw new Error("Senha deve ter ao menos 8 caracteres");
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
  accountConfirmation: async (code) => {
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
        throw new Error("Por favor, digite novamente seu email");
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
  accountNewPassword: async (password, passwordConfirm) => {
    try {
      const email = localStorage.getItem("email");

      if (email === "") {
        throw new Error("Por favor, digite novamente seu email");
      }

      if (password.length < 8) {
        throw new Error("Senha não pode ter menos de 8 caracteres");
      }

      if (password !== passwordConfirm) {
        throw new Error("As senhas não podem ser diferentes");
      }

      const response = await apiProvider.post(
        "users/passwordresetnewpass/",
        { email, password },
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
