import User from '../models/User';
import compareValuesTwoObjets from './compareValuesTwoObjects';

export default async function UserInformationCheck(field, userId, data) {
  const user = await User.findByPk(userId);

  const response = {};
  if (user[field] === null) {
    response.data = { data, updateAt: new Date() };
    return response;
  }

  if (Array.isArray(user[field])) {
    const findmatch = user[field].find(result => {
      return compareValuesTwoObjets(data, result.data);
    });

    if (!findmatch) {
      user[field].push({ data, updateAt: new Date() });
      response.data = user[field];
      return response;
    }

    response.data = user[field].map(result => {
      if (compareValuesTwoObjets(data, result.data)) {
        result.updateAt = new Date();
        return result;
      }
      return result;
    });

    return response;
  }

  if (!compareValuesTwoObjets(data, user[field].data)) {
    response.data = [user[field], { data, updateAt: new Date() }];
    return response;
  }

  response.data = { data, updateAt: new Date() };

  return response;
}
