import { AsyncGenerator, loadRemoteSchema } from 'graphql-ts-client-codegen'
import path from 'path'

const generator = new AsyncGenerator({
  schemaLoader: async () => {
    return loadRemoteSchema('http://localhost:4242/graphql')
  },
  targetDir: path.join(process.cwd(), 'app/__generated'),
  defaultFetcherExcludeMap: {},
})

generator.generate()
