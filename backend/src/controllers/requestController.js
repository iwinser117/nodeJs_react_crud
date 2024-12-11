const db = require('../config/database');

const getRequests = async (req, res) => {
  try {
    // nos vamos de 10 en 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Consulta para obtener con paginación
    const countQuery = 'SELECT COUNT(*) FROM requests';
    const dataQuery = `
      SELECT 
        r.id, 
        r.title, 
        r.description, 
        r.status, 
        r.created_at,
        u.name AS user_name,
        u.email AS user_email
      FROM requests r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countResult = await db.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    const dataResult = await db.query(dataQuery, [limit, offset]);

    res.json({
      total,
      page,
      limit,
      data: dataResult.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createRequest = async (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  try {
    const userId = req.user.id;

    const result = await db.query(
      'INSERT INTO requests (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const result = await db.query(
      'DELETE FROM requests WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.json({ 
      message: 'Solicitud eliminada exitosamente',
      deletedRequest: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getRequests,
  createRequest,
  deleteRequest
};