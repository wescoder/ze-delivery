declare module 'hookrouter' {
  export function navigate(path: string): void
  export function useRoutes(routes: {
    [key: string]: (...args: any[]) => any
  }): any
}
