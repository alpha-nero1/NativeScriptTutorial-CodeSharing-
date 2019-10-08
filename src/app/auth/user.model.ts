/**
 * @author Alessandro Alberga
 * @description user model to manage user throughout app.
 */
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {
  }

  get isAuthenticated() {
    return (
      Boolean(this._token) &&
      Boolean(this._tokenExpirationDate) &&
      Boolean(new Date() < this._tokenExpirationDate)
    )
  }

  get timeToExpiry() {
    if (this._tokenExpirationDate) {
      return (this._tokenExpirationDate.getTime() - new Date().getTime());
    }
    return 0;
  }

  get token() {
    if (!this._token) {
      return null;
    }
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      // Token expired, give back null.
      return null;
    }
    return this._token;
  }
}
