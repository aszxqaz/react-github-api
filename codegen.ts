import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://docs.github.com/public/fpt/schema.docs.graphql",
  documents: ["src/lib/github/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/github/gql/": {
      preset: "client",
    },
  },
};

export default config;
