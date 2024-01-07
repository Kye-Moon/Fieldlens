import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "apps/server/schema.graphql",
  documents: ["apps/webui/**/*.{ts,tsx}", 'apps/mobile/**/*.{ts,tsx}'],
  generates: {
    "packages/gql-types/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
