module.exports.httpErrorMessage = (status, res) => {
  let error = ''

  switch(status) {
    case 500:
      error = 'There was a internal error';
    break;
    case 406:
      error = 'User not deleted';
    break;
    case 404:
      error = 'User not found';
    break;
    case 400:
      error = 'User already exist';
    break;
    default:
      status = 501;
      error  = 'Error in your request';
    break;
  };

  return res.status(status).send({ error });
} 