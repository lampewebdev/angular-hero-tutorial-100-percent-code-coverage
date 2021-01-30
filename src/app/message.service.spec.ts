import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add() message should be added', () => {
    service.add('message');
    expect(service.messages).toEqual(['message']);
  });

  it('clear() should clear the messages', () => {
    service.add('message');
    service.add('message');
    service.add('message');
    service.clear();
    expect(service.messages).toEqual([]);
  });
});
