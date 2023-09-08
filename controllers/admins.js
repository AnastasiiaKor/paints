const { Admin } = require("../models/admin");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { login, password } = req.body;
  const admin = await Admin.findOne({ login });
  if (!admin) throw HttpError(404, "Wrong login or password");

  const check = await bcrypt.compare(password, admin.password);
  if (!check) throw HttpError(404, "Wrong login or password");

  const payload = {
    id: admin._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await Admin.findByIdAndUpdate(admin._id, { token });
  res.status(200).json({
    token,
  });
};

const check = async (req, res) => {
  const { login } = req.admin;
  res.status(200).json({
    login,
  });
};

const logout = async (req, res) => {
  const { id } = req.admin;
  await Admin.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

const update = async (req, res) => {
  const { id } = req.admin;

  const { password, login } = req.body;
  const admin = await Admin.findById(id);
  const existingAdmin = await Admin.findOne({ login });
  if (existingAdmin) {
    if (id !== existingAdmin.id) {
      throw HttpError(409, "Email in use");
    }
  }
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(
    id,
    {
      ...req.body,
      password: hashedPassword || admin.password,
    },
    { new: true }
  );

  res.status(200).json({
    login: updatedAdmin.login,
  });
};

module.exports = {
  login: ctrlWrapper(login),
  check: ctrlWrapper(check),
  logout: ctrlWrapper(logout),
  update: ctrlWrapper(update),
};
