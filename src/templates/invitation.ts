export const invitationTemplate = (name: string, link: string) => {
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
    <h1 style="color: #333">Bienvenido/a ${name}!</h1>
    <p style="color: #555">
      Estamos muy contentos de que comiences. Primero, necesitás confirmar tu
      cuenta. Solo presioná el botón de abajo.
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
      Confirmar cuenta
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
