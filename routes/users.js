const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.get('/', authenticateJWT, async (req, res) => {
    const result = await pool.query('SELECT * FROM Mahasiswa');
    res.send(result.rows);
});

router.post('/', async (req, res) => {
    const result = await pool.query('INSERT INTO Mahasiswa (NIM, Nama, ID_Jurusan) VALUES ($1, $2, $3) RETURNING *', [req.body.NIM, req.body.Nama, req.body.ID_Jurusan]);
    res.send(result.rows[0]);
});

router.put('/:NIM', authenticateJWT, async (req, res) => {
    const result = await pool.query('UPDATE Mahasiswa SET Nama = $1, ID_Jurusan = $2 WHERE NIM = $3 RETURNING *', [req.body.Nama, req.body.ID_Jurusan, req.params.NIM]);
    res.send(result.rows[0]);
});

router.delete('/:NIM', authenticateJWT, async (req, res) => {
    const result = await pool.query('DELETE FROM Mahasiswa WHERE NIM = $1', [req.params.NIM]);
    res.send(`Mahasiswa dengan NIM ${req.params.NIM} dihapus.`);
});

module.exports = router;
