const { Request, User } = require('../models');

// Obtener solicitudes con paginación y manejo de errores
const getRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count: total, rows: requests } = await Request.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.json({
      total,
      page,
      limit,
      data: requests.map((request) => ({
        id: request.id,
        title: request.title,
        description: request.description,
        status: request.status,  // Ahora se incluye el status
        created_at: request.createdAt,
        user_name: request.User.name,
        user_email: request.User.email,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createRequest = async (req, res) => {
  const { title, description, status = 'pending' } = req.body;  // Default status
  
  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }
  if (!description) {
    return res.status(400).json({ error: 'La descripción es obligatoria' });
  }
  

  const validStatuses = ['pending', 'in_progress', 'resolved', 'rejected', 'closed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'El estado proporcionado no es válido. Los estados válidos son: pending, approved, rejected.' });
  }

  try {
    const userId = req.user.id; 

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const newRequest = await Request.create({
      userId,
      title,
      description,
      status,  
    });

    res.status(201).json({
      id: newRequest.id,
      title: newRequest.title,
      description: newRequest.description,
      status: newRequest.status,
      createdAt: newRequest.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteRequest = async (req, res) => {
  // console.log(req.user.RoleId)
  const { id } = req.params;

  try {
    if (req.user.RoleId !== 2) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const requestToDelete = await Request.findByPk(id);

    if (!requestToDelete) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    await requestToDelete.destroy();

    res.json({
      message: 'Solicitud eliminada exitosamente',
      deletedRequest: requestToDelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getRequests,
  createRequest,
  deleteRequest,
};
