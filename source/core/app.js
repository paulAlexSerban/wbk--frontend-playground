const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/library/banner/herobanner', (req, res, next) => {
  
  res.render(path.join(__dirname, '../library/banner/herobanner/dist/index'), {
    title: 'herobanner',
    indexCSS: 'herobanner/herobanner.page.css'
  })
})

app.use('/', (req, res, next) => {
  res.render('main/main', {
    title: 'main page title added as parameter',
    libraryList: 'libraryList',
  })
})

app.listen(3000);