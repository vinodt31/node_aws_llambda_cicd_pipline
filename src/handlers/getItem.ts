import { formatJSONResponse } from '../utils/response';
import { Item } from '../models/item';

const items: Item[] = []; // In-memory storage for simplicity

export const handler = async (event: any) => {
  const id = event.pathParameters?.id;
  const item = items.find((i) => i.id === id);

  if (!item) {
    return formatJSONResponse(404, { message: 'Item not found' });
  }

  return formatJSONResponse(200, item);
};
