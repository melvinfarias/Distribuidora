var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');
var util = require('util');
var productosModel = require('../../models/productosModel');
const pool = require('../../models/bd');

router.get('/', async function (req, res, next) {
    var productos = await productosModel.getProductos();


    res.render('admin/productos', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        productos
    });
});//cierra inicial

//eliminar por id
router.get('/eliminar/:id_productos', async(req, res, next) => {
    var id_productos = req.params.id_productos;
    await productosModel.deleteProductosById(id_productos);
    res.redirect('/admin/productos')
});


//Agregar
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })//cierra render
}); //cierra get

router.post('/agregar', async (req, res, next) =>{
    try{
        if (req.body.producto != "") {
            await productosModel.insertProducto(req.body);
            res.redirect('/admin/productos')
        } else{
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el producto'
        })
    }
})

router.get('/modificar/:id_productos', async (req, res, next) => {
    var id_productos = req.params.id_productos;
    var productos = await productosModel.getProductosById(id_productos);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        productos
    });
});//cierro get de modificar

router.post('/modificar', async(req, res, next) => {
    try{
        var obj = {
            producto: req.body.producto
        }

        console.log(obj)// verificamos que trae los datos
        await productosModel.modificarProductoById(obj, req.body.id_productos);
        res.redirect('/admin/productos');
    } catch(error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico el producto'
        })
        }
});

module.exports = router;