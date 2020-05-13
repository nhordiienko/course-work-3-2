const { Types } = require('mongoose');
const { User, Team } = require('../schemas');

const check = ({ from, to }, time) => from <= time && time <= to;

module.exports.addNew = async (req, res, next) => {
  const {
    size = 5,
    from,
    to,
    title = '',
    appointment = '',
  } = req.body;
  const companyId = req.params.id;
  try {
    const allUsers = await User.find({ company: companyId });
    const users = allUsers
      .filter(({ team }) => !team)
      .filter(({ activeHours }) => check(activeHours, from) || check(activeHours, to));
    if (users.length < size) {
      res.status(400).json({ message: 'There are not enough user with such critetia for provided company' });
    } else {
      const team = new Team({
        _id: new Types.ObjectId(),
        title,
        appointment,
        size,
      });
      try {
        await team.save();
        const addedUsers = [];
        const usersToTeam = users.slice(0, size).map((user) => {
          addedUsers.push(User.updateOne({ _id: user._id }, { team: team._id }));
          return {
            _id: user._id,
            name: `${user.firstName} ${user.secondName}`,
            position: user.position,
          };
        });
        Promise.all(addedUsers);
        res.status(201).json({ size, team, users: usersToTeam });
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await Team.deleteOne({ _id: req.params.id });
    if (result.n > 0) {
      await User.updateMany({ team: req.params.id }, { team: null });
      res.status(200).json({
        message: 'Successfully deleted',
      });
    } else {
      res.status(404).json({
        message: 'There are no team with such id',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.changeUser = async (req, res, next) => {
  const { oldId, newId } = req.params;
  try {
    const oldUser = await User.findById(oldId);
    const newUser = await User.findById(newId);
    if (newUser.team) {
      res.status(400).json({ message: 'New user is allready has team' });
    } else {
      await User.updateOne({ _id: oldId }, { team: null });
      await User.updateOne({ _id: newId }, { team: oldUser.team });
      res.status(200).json({
        message: 'Successfully changed',
        newUser: {
          _id: newUser._id,
          name: `${newUser.firstName} ${newUser.secondName}`,
          position: newUser.position,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getByCompanyId = async (req, res, next) => {
  try {
    const users = await User.find({ company: req.params.id });
    if (users) {
      const teams = users.map(({ team }) => (team === null ? null : team.toString()))
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter((value) => value !== null)
        .map((id) => Team.findById(id));
      Promise.all(teams).then((data) => {
        res.status(200).json({ teams: data });
      });
    } else {
      res.status(404).json({ message: 'no company found' });
    }
  } catch (error) {
    next(error);
  }
};
