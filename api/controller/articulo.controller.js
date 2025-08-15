const Articulos = require('../model/Articulo');

const Articulo = {
    // Obtener un artículo por ID
    get: async (req, res) => {
        try {
            const { id } = req.params;
            const articulo = await Articulos.findById(id);
            if (!articulo) {
                return res.status(404).send({ error: 'Artículo no encontrado' });
            }
            res.status(200).send(articulo);
            console.log('Artículo encontrado:', articulo);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    // Listar todos los artículos
    list: async (req, res) => {
        try {
            const articulos = await Articulos.find();
            res.status(200).send(articulos);
            console.log('Artículos encontrados:', articulos);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    // Crear un artículo con imágenes
   create: async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    const imagenes = req.files?.map(file => `/uploads/${file.filename}`) || [];
    const titulo = req.body.titulo
    const contenido = req.body.contenido
    const fecha = req.body.fecha
    const articulo = new Articulos({
      titulo,
      contenido,
      fecha,
      imagenes
    });

    const savedArticulo = await articulo.save();
    res.status(201).send(savedArticulo);
    console.log('Artículo creado:', savedArticulo);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
},


    // Actualizar artículo por título
    update: async (req, res) => {
        try {
            const { titulo } = req.params;
            const articulo = await Articulos.findOne({ titulo });
            if (!articulo) {
                return res.status(404).send({ error: 'Artículo no encontrado' });
            }

            // Si se suben nuevas imágenes, reemplazamos las anteriores
            if (req.files && req.files.length > 0) {
                articulo.imagenes = req.files.map(file => `/uploads/${file.filename}`);
            }

            Object.assign(articulo, req.body);
            await articulo.save();

            res.status(200).send(articulo);
            console.log('Artículo actualizado:', articulo);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    // Eliminar artículo por título
    delete: async (req, res) => {
        try {
            const { titulo } = req.params;
            const articulo = await Articulos.findOne({ titulo });
            if (!articulo) {
                return res.status(404).send({ error: 'Artículo no encontrado' });
            }

            await articulo.deleteOne();
            console.log('Artículo borrado:', articulo.titulo);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
};

module.exports = Articulo;
