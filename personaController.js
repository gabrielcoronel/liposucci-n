const bcrypt = require("bcrypt");
const personaModel = require("./personaModel");

const encriptar = async (message) => {
    const key = process.env.ENCRYPTION_KEY;
    const hash = await bcrypt.hash(message, key);

    return hash;
};

const verificarNombreExiste = async (username) => {
    const usuario = await personaModel.findOne({ username: username });

    return usuario != null;
};

const verificarDatos = async (datos) => {
    const usuario = await personaModel.findOne({
        username: datos.username
    });

    if (usuario == null) {
        return false;
    }

    return await bcrypt.compare(
        datos.password,
        usuario.password
    );
}

const almacenarDatos = async (datos) => {
    const contrasenaEncriptada = await encriptar(datos.password);

    const cuenta = {
        ...datos,
        password: contrasenaEncriptada
    };

    await personaModel.create(cuenta);
};

const crearCuenta = async (req, res) => {
    const datos = req.body;

    if (await verificarNombreExiste(datos.username)) {
        res.status(400).send("Error");
        return;
    }

    await almacenarDatos(datos);
}

const iniciarSesion = async (req, res) => {
    const datos = req.body;

    if (!(await verificarDatos(datos))) {
        res.status(400).send("Error");
        return;
    }

    const persona = personaModel.findOne({ username: datos.username });
    
    return persona;
};

module.exports = {
    iniciarSesion,
    crearCuenta
};