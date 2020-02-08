export default async function UserInformationCheck(field, user, data) {
  const response = {};
  if (user[field] === null) {
    response.data = { data, updateAt: new Date() };
    return response;
  }

  if (Array.isArray(user[field])) {
    const findmatch = user[field].find(result => {
      return result.data === data;
    });

    if (!findmatch) {
      user[field].push({ data, updateAt: new Date() });
      response.data = user[field];
      return response;
    }

    response.data = user[field].map(result => {
      if (result.data === data) {
        result.updateAt = new Date();
        return result;
      }
      return result;
    });

    return response;
  }
  if (user[field].data !== data) {
    response.data = [user[field], { data, updateAt: new Date() }];
    return response;
  }

  response.data = { data, updateAt: new Date() };

  return response;
}
