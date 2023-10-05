const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

app.use(cors());

const port = 3000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "angel123",
    database: "facebookfake",
});

connection.connect((err) => {
    if (err) {
        console.log("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.use(express.json());

//Ruta para usuarios
app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM usuarios";
    connection.query(query, (err, rows) => {
        if (err) {
            console.log("Error al ejecutar la consulta:", err);
            res
            .status(500)
            .json({error: "Error al obtener datos de la base de datos"});
            return;
        }
        res.json(rows);
    });
});

//Ruta para insertar publicación
app.post("/publicar", (req, res) => {
    const {user_id, contenido} = req.body;

    if (!user_id || !contenido) {
        res
        .status(400)
        .json({ error: "Faltan datos requeridos para la publicación" });
        return;
    }
    const insertQuery = "INSERT INTO posts (user_id, contenido) VALUES (?, ?)";
    connection.query(insertQuery, [user_id, contenido], (err, results) => {
        if (err) {
            console.error("Error al insertar la publicación:", err);
            res.status(500).json({ error: "Error al insertar la publicación" });
            return;
        }
        res.json({ mensaje: "Publicación realizada con éxito" });
    });
});

//Ruta para mostrar las publicaciones
app.get("/usuarios_y_publicaciones", (req, res) => {
    const query = `
        SELECT u.nombre AS 'Nombre de Usuario', p.contenido AS 'Publicación'
        FROM usuarios u
        INNER JOIN posts p ON u.user_id = p.user_id
    `;
    connection.query(query, (err, rows) => {
        if (err) {
            console.log("Error al ejecutar la consulta:", err);
            res
            .status(500)
            .json({error: "Error al obtener datos de la base de datos"});
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});

