export const formatJSONResponse = (statusCode: number, body: any) => {
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  };
  