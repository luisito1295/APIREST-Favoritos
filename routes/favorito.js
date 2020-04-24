'use strict'

const express = require('express');
const FavoritoController = require('../controllers/favorito');
const api = express.Router();

api.get('/prueba/:nombre?', FavoritoController.prueba);
api.get('/favorito/:id', FavoritoController.getFavorito);
api.get('/favoritos', FavoritoController.getFavoritos);
api.post('/addfavorito', FavoritoController.saveFavorito);
api.delete('/favorito/:id', FavoritoController.deleteFavorito);
api.put('/favorito/:id', FavoritoController.updateFavorito);

module.exports = api;