import { formatJSONResponse } from '../utils/response';
import { Item } from '../models/item';
import { v4 as uuidv4 } from 'uuid';

const items: Item[] = []; // In-memory storage for simplicity

export const handler = async (event: any) => {
  const data = JSON.parse(event.body || '{}');
  const newItem: Item = {
    id: uuidv4(),
    name: data.name,
    description: data.description,
  };
  items.push(newItem);

  return formatJSONResponse(201, newItem);
};
