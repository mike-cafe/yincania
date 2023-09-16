export const Toast = {
  EmailVerification: {
    info: {
      title: "Verificando correo electrónico...",
      duration: 6000,
    },
    success: {
      title: "Correo verificado",
      description: "Ahora puedes iniciar sesión con tu cuenta de correo y contraseña",
      duration: null,
    },
    error: {
      title: "No hemos podido verificar tu correo electrónico.",
      description: "El link no es válido.",
      duration: 3000,
    },
  },
  SocialLoginVerification: {
    info: {
      title: "Conectando cuenta de Google...",
      duration: 9000,
    },
    success: {
      title: "¡Cuenta conectada!",
      description: "Redireccionando...",
      duration: 5000,
    },
    error: {
      title: "No hemos podido verificar tu correo",
      description: "Probablemente el link ya ha caducado",
      duration: 3000,
    },
  },
};


