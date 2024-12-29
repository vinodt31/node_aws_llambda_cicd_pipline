import { formatJSONResponse } from '../utils/response';

export const handler = async () => {
  //hello handler function
  return formatJSONResponse(200, { message: 'Hello, Serverless!' });
};
