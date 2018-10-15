const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_user: 'shubham792',
    api_key: 'sendgridapi123'
  }
}

const client = nodemailer.createTransport(sgTransport(options));

router.post('/register', (req, res) => {
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    creationDate: Date.now(),
    temporarytoken: jwt.sign({ firstname: req.body.firstname }, 'secret', { expiresIn: '3h' })
  });

  user.save().then(doc => {
    let email = {
      from: 'Localhost staff, staff@localhost.com',
      to: user.email,
      subject: 'Localhost Activation Link',
      text: 'Hello ' + user.firstname + ', Thank you for registering at localhost.com. Please click on the link below to complete your activation: "http://localhost:3000/activate/' + user.temporarytoken,
      html: 'Hello <strong> ' + user.firstname + '<strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation: <br><br><a href="http://localhost:3000/activate/' + user.temporarytoken + '">http://localhost:3000/activate</a>'
    };

    client.sendMail(email, (err, info) => {
      if (err) console.log(err);
      else console.log('Message sent');
    });
    return res.status(200).json({ message: 'You have signed up successfully. For verification, an email has been sent to you along with activation link over your mail. Please activate your account by clicking on link' });
  }).catch(err => {
    return res.status(500).json({ message: 'Error registering user.' })
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then(doc => {
    if (doc) {
      if (!doc.isValid(req.body.password)) {
        return res.status(500).json({ message: ' Invalid Credentials' });
      } else if (!doc.active) {
        return res.status(500).json({ message: ' Account Not yet activated!' });
      } else {
        // generate token
        let token = jwt.sign({ firstname: doc.firstname, _id: doc._id }, 'secret', { expiresIn: '3h' });
        return res.status(200).json({ message: 'Login Successful !', token: token });
      }
    } else {
      return res.status(500).json({ message: 'User email is not registered.' })
    }
  }).catch(err => {
    return res.status(500).json({ message: 'Some internal error' });
  })
})

router.put('/activate/:token', (req, res) => {
  User.findOne({ temporarytoken: req.params.token }, (err, user) => {
    if (err) throw err;
    var token = req.params.token;

    jwt.verify(token, 'secret', (err, tokendata) => {
      if (err) {
        return res.status(500).json({ message: ' Activation Link has expired' });
      } else if (!user) {
        return res.status(500).json({ message: ' Activation Link has expired' });
      } else {
        user.temporarytoken = false;
        user.active = true;

        user.save(err => {
          if (err) { console.log(err) }
          else {
            let email = {
              from: 'Localhost staff, staff@localhost.com',
              to: user.email,
              subject: 'Localhost Account Activated',
              text: 'Hello ' + user.firstname + ', Your account has been successfully activated!',
              html: 'Hello <strong> ' + user.firstname + '<strong>,<br><br>Your account has been successfully activated!'
            };

            client.sendMail(email, (err, info) => {
              if (err) console.log(err);
              else console.log('Message sent');
            });

            return res.status(200).json({ message: 'Your account has been activated.' });
          }
        })
      }
    })
  });
})

router.get('/username', verifyToken, (req, res, next) => {
  return res.status(200).json({ firstname: decodedToken.firstname, _id: decodedToken._id });
})

var decodedToken = '';
function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token, 'secret', (err, tokendata) => {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request' });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
