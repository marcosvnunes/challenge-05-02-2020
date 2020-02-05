import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

class CPFController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      data: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { data } = req.body;

    const clearCPF = data.replace(/\D/g, '');

    const cpfExists = await User.findOne({
      where: {
        cpf: clearCPF,
        id: { [Op.ne]: [req.userId] },
      },
    });
    console.log(cpfExists);
    if (cpfExists) {
      return res.status(400).json({ error: 'cpf already exists' });
    }

    console.log(clearCPF);

    function TestCPF(strCPF) {
      let Sum;
      let Rest;
      Sum = 0;
      if (strCPF === '00000000000') return false;

      for (let i = 1; i <= 9; i++) {
        Sum += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      }
      Rest = (Sum * 10) % 11;

      if (Rest === 10 || Rest === 11) Rest = 0;
      if (Rest !== parseInt(strCPF.substring(9, 10))) return false;

      Sum = 0;
      for (let i = 1; i <= 10; i++)
        Sum += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Rest = (Sum * 10) % 11;

      if (Rest === 10 || Rest === 11) Rest = 0;
      if (Rest !== parseInt(strCPF.substring(10, 11))) return false;
      return true;
    }

    if (!TestCPF(clearCPF)) {
      return res.status(401).json({ error: 'CPF is invalid' });
    }

    const user = await User.findByPk(req.userId);

    await user.update({ cpf: data });

    return res.json({
      success: true,
      nextEndPoint: req.nextEndPoint,
    });
  }
}

export default new CPFController();
