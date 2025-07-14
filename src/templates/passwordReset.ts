export const passwordResetTemplate = (link: string) => {
  return `<div
    style="
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 40px;
      background-color: #f4f4f4;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 40px;
        border-radius: 8px;
      "
    >
      <h1 style="color: #333">
        Restablecimiento de contraseña
      </h1>
      <p style="color: #555">
        Hemos recibido una solicitud para restablecer tu contraseña. Si no
        realizaste esta solicitud, podés ignorar este correo. Si querés
        continuar, hacé clic en el botón de abajo para restablecer tu
        contraseña.
      </p>
      <a
        href=${link}
        style="
          display: inline-block;
          margin-top: 20px;
          background-color: #1369b9;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
        "
      >
        Restablecer contraseña
      </a>
      <p style="color: #888; font-size: 12px; margin-top: 40px">
        Si el botón no funciona, copiá y pegá el siguiente enlace en tu
        navegador:<br />
       ${link}
      </p>
    </div>
  </div>
  `;
};
