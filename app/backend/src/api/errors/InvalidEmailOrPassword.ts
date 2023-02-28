export default class InvalidEmailOrPassword extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidEmailOrPassword';
    this.stack = '401';
  }
}
