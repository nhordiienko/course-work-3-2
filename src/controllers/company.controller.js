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
    const companies = await Company.find();
    res.status(200).json({
      companies: companies.map((company) => ({
        company,
        getQuery: `${req.protocol}://${req.get('host')}/company/${company._id}`,
      })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json({
      company,
      getAllQuery: `${req.protocol}://${req.get('host')}/company`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = () => {

};

module.exports.update = () => {

};
