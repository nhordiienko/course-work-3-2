const { Types } = require('mongoose');
const Company = require('../schemas/company.schema');

module.exports.addNew = async (req, res, next) => {
  const {
    name, address = '', occumpation = '', description = '',
  } = req.body;

  const newCompany = new Company({
    _id: new Types.ObjectId(),
    name,
    address,
    occumpation,
    description,
  });

  try {
    const result = await newCompany.save();
    res.status(201).json({
      company: result,
      getAllQuery: `${req.protocol}://${req.get('host')}/company`,
      getQuery: `${req.protocol}://${req.get('host')}/company/${result._id}`,
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
    if (company) {
      res.status(200).json({
        company,
        getAllQuery: `${req.protocol}://${req.get('host')}/company`,
      });
    } else {
      res.status(404).json({
        error: 'no company found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await Company.deleteOne({ _id: req.params.id });
    if (result.n > 0) {
      res.status(200).json({
        message: 'Successfully deleted',
        getAllQuery: `${req.protocol}://${req.get('host')}/company`,
      });
    } else {
      res.status(404).json({
        message: 'There are no companies with such id',
        getAllQuery: `${req.protocol}://${req.get('host')}/company`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  const newData = {};
  if (req.query.name) {
    newData.name = req.query.name;
  }
  if (req.query.address) {
    newData.address = req.query.address;
  }
  if (req.query.occumpation) {
    newData.occumpation = req.query.occumpation;
  }
  if (req.query.description) {
    newData.description = req.query.description;
  }
  try {
    const result = await Company.updateOne({ _id: req.params.id }, newData);
    if (result.n > 0) {
      if (result.nModified > 0) {
        res.status(200).json({ message: 'successfully modified', getQuery: `${req.protocol}://${req.get('host')}/company/${req.params.id}` });
      }
      res.status(304).json({ message: 'no data to modify', getQuery: `${req.protocol}://${req.get('host')}/company/${req.params.id}` });
    }
    res.status(404).json({ message: 'no company found', getAllQuery: `${req.protocol}://${req.get('host')}/company` });
  } catch (error) {
    next(error);
  }
};
