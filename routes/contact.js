var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', async (req, res, next) => {

  console.log(req.body) //esta captutando datos?

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'melvingabriela17@gmail.com',
    subject: 'CONTACTO DESDE LA WEB',
    html: nombre + " se contacto a través de la web y quiere más información a este correo: " + email + ". <br> Su número telefonico es: " + tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('contact', {
    messaje: 'Consulta enviada con exito'
  });
});

module.exports = router;