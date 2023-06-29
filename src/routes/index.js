const bodyParser = require('body-parser');
const pessoasRoute = require('./pessoasRoute.js')
const niveisRoute = require('./niveisRoute.js')
const turmasRoute = require('./turmasRoute.js')
const matriculasRoute = require('./matriculasRoute.js')

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoasRoute);
    app.use(niveisRoute);
    app.use(turmasRoute);
    app.use(matriculasRoute);
}