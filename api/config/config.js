const express = require('express');
const path = require('path');
const multer = require('multer');
const routes = require('../routes/routes');

module.exports = (app) => {
    // Ajustes
    app.set('port', process.env.PORT || 3000);

    // Configuración de Multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads')); // carpeta /uploads
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // nombre único
        }
    });

    const upload = multer({ storage });

    // Carpeta pública para acceder a imágenes
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Middlewares globales para JSON y formularios simples
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Rutas (pasamos `upload` para usarlo en rutas que suben archivos)
    routes(app, upload);

    return app;
};
