const twilio = require('twilio');
//accountSID, AuthToken
const cliente = twilio('ACf0e06a6234e65e63e4ea7e3af0b1a54f', '201eb3c94478f735eedcfbe03881e9cb');

module.exports = function(contenido){
    cliente.messages.create({
        to: 'whatsapp:+5493516365620',
        from: 'whatsapp:+14155238886',
        body: JSON.stringify(contenido, null, 2)
      }).then((data) => {
        console.log('Mensaje enviado correctamente');
      }).catch(console.log);
}
