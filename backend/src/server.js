// server.js
const app = require('./app');
const port = process.env.PORT || 3000;
const { initModels } = require('./models');

initModels()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al inicializar la base de datos:', error);
  });
