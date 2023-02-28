export default class InvalidFieldsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFieldsError';
    this.stack = '400';
  }
}
