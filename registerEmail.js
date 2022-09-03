const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: 'cudar.iot@gmail.com',
      pass: 'blpcdvbrgwyqqjmu'
  }
});

const asunto = "Nuevo registro";
//const contenido = "este es el mensaje";
const destinatario = "cudar.iot@gmail.com";
//const archivo = process.argv[5];



//if (archivo) opciones['attachments'] = [{ path: archivo }];

module.exports = async function(contenido){
  console.log(contenido);
  let opciones = {
    from: 'Servidor back <servidorback@backend.com>',
    to: destinatario,
    html:  JSON.stringify(contenido, null, 2),
    subject: asunto,
  };

  const result = await transport.sendMail(opciones);
  console.log(result);

}

