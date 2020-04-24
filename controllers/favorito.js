'use strict'


//Modelo de favorito
const Favorito = require('../models/favorito');

function prueba(req, res) {

    if(req.params.nombre){
        var nombre = req.params.nombre;
    }else{
        var nombre = 'Sin nombre'
    }
    
    res.send({
        message: 'Hola mundo ' + nombre,
    });

}

function getFavorito(req, res){
    var favoritoId = req.params.id;

    Favorito.findById(favoritoId, (err, favorito) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!favorito){
                return res.status(404).json({
                    ok: false,
                    err,
                    message: 'No hay marcador'
                });
            }else{
                res.status(200).send({favorito});
            }
        }

    });

    
}

function getFavoritos(req, res){
    Favorito.find({}).exec((err, favoritos) => {
        /*if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            if(favoritos.length <= 0){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }else{
                return res.status(200).json({
                    ok: true,
                    favorito: favoritos
                });
            }
        }*/

        if (err) {
            return res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!favoritos){
                return res.status(404).json({
                    ok: false,
                    err,
                    message: 'No hay marcadores'
                });
            }else{
                res.status(200).send({favorito: favoritos});
            }

        }

    });
}

function saveFavorito(req, res){

    let body = req.body;

    let favorito = new Favorito({
        title: body.title,
        des: body.des,
        url: body.url
    });

    favorito.save((err, favorito) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            if(!favorito){
                return res.status(404).json({
                    ok: false,
                    err,
                    message: 'No hay marcadores'
                });
            }else{
                res.json({
                    ok: true,
                    favorito: favorito
                });
            }
        }

    });

}

function updateFavorito(req, res){

    var favoritoId = req.params.id;
    var params = req.body;

    Favorito.findByIdAndUpdate(favoritoId, params, (err, favoritoUpdate) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!favoritoUpdate){
                return res.status(500).json({
                    ok: false,
                    err,
                    message: 'Erro al devoler los marcadores'
                });
            }else{                
                res.status(200).send({favorito: favoritoUpdate});
            }
            
        }

    });

}

function deleteFavorito(req, res){

    let id = req.params.id;

    Favorito.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Marcador no encontrado'
                }
            });
        }else{
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'Marcador eliminado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

}

module.exports = {
    prueba,
    getFavorito,
    getFavoritos,
    saveFavorito,
    updateFavorito,
    deleteFavorito

}