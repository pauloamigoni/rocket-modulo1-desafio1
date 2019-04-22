const express = require('express')
const nunjuncks = require('nunjucks')

const app = express()

nunjuncks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const verificaIdade = (req, res, next) => {
  const { age } = req.query
  if (!age) return res.redirect('/')

  return next()
}

// const logMiddleware = (req, res, next) => {
//   console.log(
//     `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
//   );
//   req.appName = "GoNode";
//   return next();
// };

// app.use(logMiddleware);

// app.get("/", logMiddleware, (req, res) => {
//   return res.send(`Bem vindo, ${req.appName}, ${req.query.name}`);
// });
const users = ['Paulo', 'Bruna', 'Sansa', 'Cherry']

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  console.log(req.body)
  return res.redirect('/')
})

app.get('/add', (req, res) => {
  return res.render('add')
})

app.get('/major', verificaIdade, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', verificaIdade, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age > 18) return res.redirect(`/major?age=${age}`)
  else return res.redirect(`/minor?age=${age}`)
})

// app.get("/nome/:name", (req, res) => {
//   // return res.send(`Bem vindo ${req.params.name}`);
//   return res.json({
//     message: `Bem vindo =p,  ${req.params.name}`
//   });
// });

app.listen(3000)
