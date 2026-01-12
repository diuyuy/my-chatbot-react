export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  code: string;
  message: string;
};

export type PaginationObject<T> = {
  items: T[];
  nextCursor: string | null;
  totalElements: number;
  hasNext: boolean;
};
