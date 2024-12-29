import { formatJSONResponse } from '../utils/response';

export const handler = async () => {
  return formatJSONResponse(200, { message: 'Hello, Serverless!' });
};
