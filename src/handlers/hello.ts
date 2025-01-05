import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface Item {
  id: string;
  name: string;
  description: string;
}

const items: Record<string, Item> = {};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, pathParameters } = event;

  try {
    switch (httpMethod) {
      case "POST": // Create Item
        const createBody = JSON.parse(event.body || "{}");
        const id = Date.now().toString();
        items[id] = { id, name: createBody.name, description: createBody.description };
        return {
          statusCode: 201,
          body: JSON.stringify({ message: "Item created", item: items[id] }),
        };

      case "GET":
        if (pathParameters?.id) {
          // Get a specific item
          const itemId = pathParameters.id;
          if (!items[itemId]) {
            return {
              statusCode: 404,
              body: JSON.stringify({ message: "Item not found" }),
            };
          }
          return {
            statusCode: 200,
            body: JSON.stringify(items[itemId]),
          };
        } else {
          // Get all items
          return {
            statusCode: 200,
            body: JSON.stringify(Object.values(items)),
          };
        }

      case "PUT": // Update Item
        if (!pathParameters?.id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Item ID is required for update" }),
          };
        }
        const updateId = pathParameters.id;
        if (!items[updateId]) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: "Item not found" }),
          };
        }
        const updateBody = JSON.parse(event.body || "{}");
        items[updateId] = { ...items[updateId], ...updateBody };
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Item updated", item: items[updateId] }),
        };

      case "DELETE": // Delete Item
        if (!pathParameters?.id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Item ID is required for deletion" }),
          };
        }
        const deleteId = pathParameters.id;
        if (!items[deleteId]) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: "Item not found" }),
          };
        }
        delete items[deleteId];
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Item deleted" }),
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: `Method ${httpMethod} not allowed` }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error: error }),
    };
  }
};
