import axios from 'axios';

export default async function validateZipcode(zipcpde) {
  let response;
  await axios.get(`https://viacep.com.br/ws/${zipcpde}/json/`).then(
    value => {
      response = value; // Success!
    },
    reason => {
      response = reason; // Error!
    }
  );
  return response;
}
