import * as Yup from 'yup';
import User from '../models/User';

import UserInformationCheck from '../utils/UserSingleInformationCheck';

class BirthdayController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { data } = req.body;

    const user = await User.findByPk(req.userId);

    const resultBirthday = await UserInformationCheck('birthday', user, data);

    await user.update({ birthday: resultBirthday.data });
    return res.json({
      success: true,
      nextEndPoint: req.nextEndPoint,
    });
  }
}
export default new BirthdayController();
