/** @type {import('@hey-api/openapi-ts').UserConfig} */

export default {
  //

  base: "#",

  //

  client: "legacy/fetch",

  name: "LadesaApiClient",

  services: {
    asClass: true,
  },

  schemas: {
    name: (name) => `$${name}`,
  },

  //

  input: "../../openapi-json/generated.json",

  output: {
    lint: "biome",
    format: "biome",
    path: "./src/http/generated",
  },

  //
};
