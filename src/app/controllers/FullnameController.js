import * as Yup from 'yup';
import User from '../models/User';
import splitFullName from '../utils/splitFullName';

class FullnameController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { data } = req.body;

    const user = await User.findByPk(req.userId);

    const { firstName, lastName } = splitFullName(data);
    const Name = {};
    if (user.firstName !== firstName || user.lastName !== lastName) {
      Name.data = {
        firstName: { data: firstName, updateAt: new Date() },
        lastName: { data: lastName, updateAt: new Date() },
      };
    } else {
      Name.data = {
        firstName: { updateAt: new Date() },
        lastName: { updateAt: new Date() },
      };
    }

    await user.update(Name.data);

    return res.json({
      success: true,
      nextEndPoint: req.nextEndPoint,
    });
  }
}
export default new FullnameController();
