import { CustomError } from './custom.error';

export class DatabaseConnectionError extends CustomError {
  reason = 'Error Connecting to database';
  statusCode = 500;

  constructor() {
    super('Errir Connecting To Database.');

    //Only cause built in class

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
