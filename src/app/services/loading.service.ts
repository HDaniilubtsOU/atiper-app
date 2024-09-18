import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor() { }

  // The method for turning on the spinner
  showLoading() {
    this._loading.next(true);
  }

  // The method for turning off the spinner
  hideLoading() {
    this._loading.next(false);
  }
}
