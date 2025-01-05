import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface Item {
  id: string;
  name: string;
  description: string;
}

const items: Record<string, Item> = {};

export const createItem = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  const id = Date.now().toString();

  items[id] = { id, name: body.name, description: body.description };

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Item created", item: items[id] }),
  };
};

export const getItem = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  if (!id || !items[id]) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Item not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(items[id]),
  };
};

export const getAllItems = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(Object.values(items)),
  };
};

export const updateItem = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  if (!id || !items[id]) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Item not found" }),
    };
  }

  const body = JSON.parse(event.body || "{}");
  items[id] = { ...items[id], ...body };

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Item updated", item: items[id] }),
  };
};

export const deleteItem = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  if (!id || !items[id]) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Item not found" }),
    };
  }

  delete items[id];

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Item deleted" }),
  };
};
