const { Types } = require('mongoose');
const Company = require('../schemas/company.schema');

module.exports.addNew = async (req, res, next) => {
  const { name } = req.body;

  const newCompany = new Company({
    _id: new Types.ObjectId(),
    name,
  });

  try {
    const result = await newCompany.save();
    res.status(201).json({
      id: result._id,
      name: result.name,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const result = await Company.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getForAdmin = () => {

};

module.exports.delete = () => {

};

module.exports.update = () => {

};
