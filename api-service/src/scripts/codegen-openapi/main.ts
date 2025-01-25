#!/usr/bin/env tsx
import { buildOpenApiFile } from "./core/build-openapi-file";
import { Options } from "./typings/options";

const logger = {
  log: console.error.bind(console),
};

async function main(options: Options) {
  logger.log(`> Gerando JSON "${options.outFile}" com a especificação OpenAPI/Swagger.`);

  await buildOpenApiFile(options);

  logger.log("> Gerado com sucesso.");
}

const options: Options = {
  apiPrefix: {
    path: process.env.API_PREFIX ?? "/",
    exclude: ["health"],
  },

  outFile: process.env.OUT_FILE ?? "/tmp/generated.json",
};

main(options);
