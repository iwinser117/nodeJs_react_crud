const adminMiddleware = (req, res, next) => {
    if (req.user.RoleId !== 2) {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  