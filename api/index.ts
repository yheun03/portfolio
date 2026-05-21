/**
 * API layer entry point.
 *
 * The current portfolio is statically generated, so there are no runtime
 * HTTP requests yet. Keep future axios/fetch clients and endpoint modules here
 * instead of mixing request logic into stores or components.
 */
export type ApiResponse<T> = {
    data: T;
};
