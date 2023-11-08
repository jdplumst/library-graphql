const config = {
    overwrite: true,
    schema: "src/schema.graphql",
    generates: {
        "src/generated/resolver-types.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};
export default config;
