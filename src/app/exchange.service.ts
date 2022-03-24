import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor() { }

  private pageName = new Subject<any>();

  pageNameChange$ = this.pageName.asObservable();
  changedComponentName(option:any){
        this.pageName.next(option);
  }
}
