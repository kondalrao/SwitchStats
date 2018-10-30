import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { interval } from 'rxjs';
import io from 'socket.io-client';

class RxSocket {

  constructor(url) {
    this._socket = io(url);
  }

  getSocket() {
    return this._socket;
  }

  disconnect() {
    this._socket.disconnect();
  }

  connect() {
    this._socket.connect();
  }

  createEvent(subject, event){
    // this._createEventObservable(event).subscribe(subject);
    interval(1000).subscribe(subject);
    return subject;
  }

  observable(event) {
    return this._createEventObservable(event);
  }

  subject(event) {
    return this._createEventSubject(event);
  }

  _createEventSubject(event) {
    const incoming$ = this._createEventObservable(event);
    const outgoing = {
      next: (data) => {
        // this.socket.emit(event, data);
      },
    };
    return Subject.create(outgoing, incoming$);
  }

  _createEventObservable(event) {
    return Observable.create(
      (incoming) => {
        this._socket.on(event, (data) => {
          incoming.next(data);
        });
        return () => { this._onEventSubjectUnsubscribe(event); };
      });
  }

  _onEventSubjectUnsubscribe(event) {
    // FIXME: conditional socket.disconnect or socket.removeListener
  }
}

// const tick$ = interval(1000);
let socket = new RxSocket('localhost:4000');

export {
  socket
};
