const { Types } = require('mongoose');
const { Admin } = require('../schemas');
const { encode, createToken } = require('../helpers/units');

module.exports.get = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.status(200).json({
        admin,
      });
    } else {
      res.status(404).json({
        error: 'no admin found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.addNew = async (req, res, next) => {
  const {
    email,
    password,
    company,
    firstName = '',
    secondName = '',
  } = req.body;

  const newAdmin = new Admin({
    _id: new Types.ObjectId(),
    password: encode(password),
    company: new Types.ObjectId(company),
    email,
    firstName,
    secondName,
  });

  try {
    const result = await newAdmin.save();
    res.status(201).json({
      admin: {
        _id: result._id,
        email: result.email,
        name: `${result.firstName} ${result.secondName}`,
        companyId: result.company,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  const newData = {};
  if (req.query.firstName) {
    newData.firstName = req.query.firstName;
  }
  if (req.query.secondName) {
    newData.secondName = req.query.secondName;
  }
  if (req.query.email) {
    newData.email = req.query.email;
  }
  if (req.query.password) {
    newData.password = encode(req.query.password);
  }
  try {
    const result = await Admin.updateOne({ _id: req.params.id }, newData);
    if (result.n > 0) {
      if (result.nModified > 0) {
        res.status(200).json({ message: 'successfully modified' });
      }
      res.status(304).json({ message: 'no data to modify' });
    }
    res.status(404).json({ message: 'no company found' });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await Admin.deleteOne({ _id: req.params.id });
    if (result.n > 0) {
      res.status(200).json({
        message: 'Successfully deleted',
      });
    } else {
      res.status(404).json({
        message: 'There are no admins with such id',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email } = req.body;
  const password = encode(req.body.password);

  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      res.status(401).json({ message: 'Auth failed' });
    } else {
      res.status(200).json({ message: 'Auth successed', token: createToken(email) });
    }
  } catch (error) {
    next(error);
  }
};
