export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  data?: T;
  user?: T;
  token?: string;
  animeList?: T | null;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
