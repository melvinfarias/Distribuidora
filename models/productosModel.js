var pool = require('./bd');
/*Sirve para listar los productos*/
async function getProductos() {
    var query = 'select * from productos';
    var rows = await pool.query(query);
    return rows;
}

async function deleteProductosById(id_productos) {
    var query = 'delete from productos where id_productos = ?';
    var rows = await pool.query(query, [id_productos]);
    return rows;
}

//Agregar producto
async function insertProducto(obj) {
    try{
        var query = "insert into productos set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }//cierra catch
}//cierra insert

//traigo los datos para modificar un solo producto
async function getProductosById(id_productos) {
    var query = "select * from productos where id_productos = ?";
    var rows = await pool.query(query, [id_productos]);
    return rows[0];
}

//Modificar los datos 
async function modificarProductoById(obj, id_productos){
    try{
        var query = "update productos set ? where id_productos=?";
        var rows = await pool.query(query, [obj, id_productos]);
        return rows;
    } catch(error) {
        throw error;
    }//cierra modificar update
}

module.exports = { getProductos, deleteProductosById, insertProducto, getProductosById, modificarProductoById }