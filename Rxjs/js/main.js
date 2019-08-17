import * as Rx from 'rxjs';

const arr = [1, 2, 3, 4, 5];
const arrObservable = Rx.Observable.from(arr).subscribe(val =>
	console.log(val)
);
