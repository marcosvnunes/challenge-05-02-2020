import User from '../models/User';

export default async (req, res, next) => {
  const orderSteps = [
    { field: 'cpf', rote: '/request/cpf' },
    { field: 'firstName', rote: '/request/fullName' },
    { field: 'birthday', rote: '/request/birthday' },
    { field: 'phoneNumber', rote: '/request/phoneNumber' },
    { field: 'address', rote: '/request/address' },
    { field: 'amountRequested', rote: '/request/amountRequested' },
  ];
  let indexRote;
  const current = orderSteps.find((step, index) => {
    indexRote = index;
    return step.rote === req.originalUrl.toString();
  });
  if (!current) {
    return res.status(400).json({ error: 'this rote is invalid' });
  }
  const ordersLength = orderSteps.length - 1;
  const user = await User.findByPk(req.userId);
  if (indexRote > 0 && user[orderSteps[indexRote - 1].field] === null) {
    return res.status(400).json({
      error: `you skipped a step return to ${orderSteps[indexRote - 1].rote}`,
    });
  }

  if (indexRote !== ordersLength) {
    req.nextEndPoint =
      orderSteps[indexRote + 1].field === 'firstName'
        ? 'fullName'
        : orderSteps[indexRote + 1].field;
  }
  next();
};
