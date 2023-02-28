export default class EmailNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailNotFoundError';
    this.stack = '401';
  }
}
