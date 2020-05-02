const { Types } = require('mongoose');
const { User } = require('../schemas');
const {
  encode,
  getActiveTimeForToday,
  calculateTime,
  createToken,
} = require('../helpers/units');

module.exports.get = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id);
    res.status(201).json({
      user: {
        _id: result._id,
        email: result.email,
        position: result.position,
        name: `${result.firstName} ${result.secondName}`,
        companyId: result.company,
        activeHours: getActiveTimeForToday(result.activeHours),
      },
    });
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
    position = '',
  } = req.body;

  const newUser = new User({
    _id: new Types.ObjectId(),
    password: encode(password),
    company: new Types.ObjectId(company),
    email,
    firstName,
    secondName,
    position,
    activeHours: {
      from: 10 * 1000 * 60 * 60,
      to: 14 * 1000 * 60 * 60,
    },
  });

  try {
    const result = await newUser.save();
    res.status(201).json({
      user: {
        _id: result._id,
        email: result.email,
        position: result.position,
        name: `${result.firstName} ${result.secondName}`,
        companyId: result.company,
        activeHours: getActiveTimeForToday(result.activeHours),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.n > 0) {
      res.status(200).json({
        message: 'Successfully deleted',
      });
    } else {
      res.status(404).json({
        message: 'There are no user with such id',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateActivity = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user found' });
    } else {
      const { from, to } = req.query;
      const activeHours = calculateTime(user.activeHours, { from, to });
      const result = await User.updateOne({ _id: req.params.id }, { activeHours });
      if (result.n > 0) {
        if (result.nModified > 0) {
          res.status(200).json({ message: 'successfully modified' });
        }
        res.status(304).json({ message: 'no data to modify' });
      }
    }
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
  if (req.query.position) {
    newData.position = req.query.position;
  }
  if (req.query.email) {
    newData.email = req.query.email;
  }
  if (req.query.password) {
    newData.password = encode(req.query.password);
  }
  try {
    const result = await User.updateOne({ _id: req.params.id }, newData);
    if (result.n > 0) {
      if (result.nModified > 0) {
        res.status(200).json({ message: 'successfully modified' });
      }
      res.status(304).json({ message: 'no data to modify' });
    }
    res.status(404).json({ message: 'no user found' });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email } = req.body;
  const password = encode(req.body.password);

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(401).json({ message: 'Auth failed' });
    } else {
      res.status(200).json({ message: 'Auth successed', token: createToken(user._id) });
    }
  } catch (error) {
    next(error);
  }
};
