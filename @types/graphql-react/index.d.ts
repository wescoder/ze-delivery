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

  interface UseGraphQLReturn<T = any> {
    cacheKey: string
    cacheValue?: {
      data: T
    }
    load(): void
    loading: boolean
  }
  export function useGraphQL<T = any>(
    options: UseGraphQLOptions,
  ): UseGraphQLReturn<T>
}
