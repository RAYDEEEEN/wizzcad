import { of } from 'rxjs';

export const itemsMock = [
  {
    createdById: 'AAEC3F2C-7509-4462-B1A5-678294C4D9D2',
    updatedById: 'AAEC3F2C-7509-4462-B1A5-678294C4D9D2',
    createdAt: '2020-02-26T10:42:49.431Z',
    updatedAt: '2020-02-26T10:42:49.431Z',
    autoCreatedAt: '2020-02-26T10:42:49.454Z',
    autoUpdatedAt: '2020-02-26T10:42:49.454Z',
    version: 1,
    isDeleted: false,
    id: 'DFDB4F26-D2F6-48D9-B9C5-B84BC38A3CC3',
    referenceId: null,
    customerId: null,
    constructionId: 'FBDBFC84-0A19-44AB-BE3D-089A34FE3C4B',
    global: 0,
    name: 'test 15',
    entityName: 'Element'
  }
];

export const users = [
  {
    login: 'UsernameFull',
    password: 'full',
    token: 'eyE5WddlEJJz2PZesrMFwmqr9IKkelkN'
  },
  {
    login: 'UsernameEmpty',
    password: 'Empty',
    token: '9hxpqopIpy46K29Kx4XWjw0KQRCDhx0E'
  }
];

export class LoginServiceMock {
  private _token = 'token';

  connection(login: string, password: string) {
    return of(users);
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    localStorage.setItem('KEYS.TOKEN', token);
    this._token = token;
  }
}
