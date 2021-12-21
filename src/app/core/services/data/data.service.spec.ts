import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { itemsMock, LoginServiceMock } from '@tests/mocks';
import { LoginService } from '../login/login.service';
import { DataService } from './data.service';
describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LoginService, useClass: LoginServiceMock }]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findById()', () => {
    it('OK', () => {
      // Given
      const item = itemsMock[0];

      // When
      service.findById('test-id').subscribe(i => {
        expect(i).toEqual(item);
      });

      // Then
      httpMock
        .expectOne(`http://demo.wizzcad.com:8081/token?id=test-id`)
        .flush(item);
    });
  });
});
