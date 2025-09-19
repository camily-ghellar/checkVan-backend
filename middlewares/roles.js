
export function requireDriver(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado." });
  }
  if (req.user.role !== "driver") {
    return res.status(403).json({ message: "Acesso negado: apenas motoristas." });
  }
  next();
}

export function requireGuardian(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado." });
  }
  if (req.user.role !== "guardian") {
    return res.status(403).json({ message: "Acesso negado: apenas responsáveis." });
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado." });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado: apenas administradores." });
  }
  next();
}

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado." });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Acesso negado: permitido apenas para ${roles.join(", ")}.` });
    }
    next();
  };
}
