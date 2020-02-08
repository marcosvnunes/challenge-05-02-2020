import * as Yup from 'yup';
import User from '../models/User';

import UserInformationCheck from '../utils/UserSingleInformationCheck';

class AmountRequestedController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { data } = req.body;

    const user = await User.findByPk(req.userId);

    const resultAmount = await UserInformationCheck(
      'amountRequested',
      user,
      data
    );

    await user.update({ amountRequested: resultAmount.data });
    return res.json({
      success: true,
      nextEndPoint: req.nextEndPoint,
    });
  }
}
export default new AmountRequestedController();
