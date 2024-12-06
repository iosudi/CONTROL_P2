import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  openedCartOverlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
}
