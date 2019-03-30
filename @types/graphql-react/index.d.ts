declare module 'graphql-react' {
  export class GraphQL {}
  export const GraphQLContext: {
    Provider: any
    Consumer: any
  }
  interface UseGraphQLOptions {
    fetchOptionsOverride?: (options: { [key: string]: any }) => void
    loadOnMount?: boolean
    operation?: {
      query: string
      variables?: {
        [key: string]: string
      }
    }
  }
  export function useGraphQL(
    options: UseGraphQLOptions,
  ): {
    cacheKey: string
    cacheValue?: any
    load(): void
    loading: boolean
  }
}
