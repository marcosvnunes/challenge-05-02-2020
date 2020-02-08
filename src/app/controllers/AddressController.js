import * as Yup from 'yup';
import User from '../models/User';
import UserMultInformationCheck from '../utils/UserMultInformationCheck';
import validadeZipcode from '../utils/validateZipcode';

class AddressController {
  async store(req, res) {
    const { data } = req.body;

    const schema = Yup.object().shape({
      zipcode: Yup.number().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body.data))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const response = await validadeZipcode(data.zipcode);
    if (!response.data) {
      return res.status(400).json({ error: ' zipcode is invalid' });
    }
    const { logradouro, localidade, uf } = response.data;
    if (
      logradouro.toLowerCase() !== data.street.toLowerCase() ||
      localidade.toLowerCase() !== data.city.toLowerCase() ||
      uf !== data.state
    ) {
      return res.status(400).json({
        error: ' zipcode informations and fields informations doesnt match',
      });
    }

    const user = await User.findByPk(req.userId);
    const resultAddress = await UserMultInformationCheck('address', user, data);

    await user.update({ address: resultAddress.data });
    return res.json({
      success: true,
      nextEndPoint: req.nextEndPoint,
    });
  }
}
export default new AddressController();
