export interface IResult<T> {
  success: boolean;
  value?: T;
  message?: string;
}

export class Result {
  static success<T>(value: T): IResult<T> {
    return {
      success: true,
      value,
    };
  }

  static failure<T>(message: string): IResult<T> {
    return {
      success: false,
      message,
    };
  }
}
