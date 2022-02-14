const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );

    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es válida. Colecciones validas: ${colecciones}`);
    }

    return true;
}

module.exports = {
    coleccionesPermitidas
}