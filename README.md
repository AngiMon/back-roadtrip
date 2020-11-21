# Back-roadtrip
This API is written in nodejs using express.

## Server
To start the server, please run :

`npm start` or `node app.js`

to stop the server (ctrl + C) or:
`killall node`

## ApiDoc
To generate the api documentation, please run :

`npx apidoc -i routes/ -o apiDoc`

To execute the migration files :

`npx sequelize db:migrate`