async function getResponse() {
  return await fetch("http://localhost:3000/api/v1/status");
}

async function getResponseBodyJson() {
  const response = await getResponse();
  return await response.json();
}

test("[00] - GET to api/v1/status should return:\n Status 200!", async () => {
  const response = await getResponse();
  expect(response.status).toBe(200);
});

test("[01] - api/v1/status response body should return:\n the time is being updated at and formated to ISO-8601!", async () => {
  const responseBody = await getResponseBodyJson();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);
});

test("[02] - api/v1/status response body should return:\n is showing the Postgres version, max connections and opened connections!", async () => {
  const responseBody = await getResponseBodyJson();
  expect(responseBody.dependencies.database).toBeDefined();

  const databaseJson = await responseBody.dependencies.database;
  expect(databaseJson.version).toBeDefined();
  expect(databaseJson.max_connections).toBeDefined();
  expect(databaseJson.opened_connections).toBeDefined();

  //? postgres version
  const databaseVersion = await databaseJson.version;
  expect(Number(databaseVersion)).not.toBeNaN();
  expect(typeof databaseVersion).toBe("string");
  expect(databaseVersion).toBe("16.0");

  //? max connections
  const databaseMaxConnections = await databaseJson.max_connections;
  expect(Number(databaseMaxConnections)).not.toBeNaN();
  expect(typeof databaseMaxConnections).toBe("number");
  expect(databaseMaxConnections).toBeGreaterThan(0);
  expect(databaseMaxConnections).toEqual(100);

  //? opened connections
  const databasOpenedConnections = await databaseJson.opened_connections;
  expect(Number(databasOpenedConnections)).not.toBeNaN();
  expect(typeof databasOpenedConnections).toBe("number");
  expect(databasOpenedConnections).toBeGreaterThanOrEqual(1);
  expect(databasOpenedConnections).toEqual(1);
});
