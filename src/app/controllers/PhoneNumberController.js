import * as Yup from 'yup';
import User from '../models/User';

import UserInformationCheck from '../utils/UserSingleInformationCheck';

class BirthdayController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { data } = req.body;
    const user = await User.findByPk(req.userId);

    const resultPhone = await UserInformationCheck(
      'phoneNumber',
      req.userId,
      data
    );

    await user.update({ phoneNumber: resultPhone.data });
    return res.json({
      success: true,
      nextEndPoint: req.nextEndPoint,
    });
  }
}
export default new BirthdayController();
