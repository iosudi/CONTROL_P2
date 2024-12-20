import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private _ShopService: ShopService) {}

  openedCartOverlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  token: string = localStorage.getItem('token') || '';

  // API Headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  // Methods to Request to add product to cart
  public AddToCart(product: any): Observable<boolean> {
    return this.AddToCartRequest(product).pipe(
      map((data) => data.success === true),
      catchError((error) => {
        console.error('Error adding product to cart:', error);
        return of(false);
      })
    );
  }

  private AddToCartRequest(product: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(environment.baseURL + 'Cart/AddItemToCart', product, {
      headers: this.headers,
    });
  }

  // Methods to Fetch cart items from the server
  private GetCartItems(): Observable<any> {
    return this.RequestCartItems().pipe(
      map((response: any) => {
        return {
          cartItems: response.cartItems || [], // Ensure `cartItems` is always an array
          totalPrice: response.totalPrice || 0,
          cartId: response.cartId || 0,
          userId: response.userId || 0,
        };
      }),
      catchError((error) => {
        console.error('Error fetching cart items:', error);
        // Handle the error and return a fallback object
        return of({
          cartItems: [],
          totalPrice: 0,
          cartId: 0,
          userId: 0,
        });
      })
    );
  }

  public GetCartItemsWithDetails(): Observable<any> {
    return this.GetCartItems().pipe(
      mergeMap((cartData: any) => {
        const cartItems = cartData.cartItems || []; // Extract `cartItems` from the response

        if (!Array.isArray(cartItems)) {
          throw new TypeError('cartItems is not an array');
        }

        const productDetailsRequests = cartItems.map((item) =>
          this._ShopService.getProductById(item.productId).pipe(
            map((productDetails) => ({
              ...item,
              productDetails, // Merge product details with the cart item
            }))
          )
        );

        return forkJoin(productDetailsRequests).pipe(
          map((detailedCartItems) => ({
            ...cartData, // Include the original cart data
            cartItems: detailedCartItems, // Replace `cartItems` with the merged version
          }))
        );
      }),
      catchError((error) => {
        console.error('Error fetching cart items with details:', error);
        return of({
          cartItems: [], // Return an empty cartItems array
          totalPrice: 0,
          cartId: 0,
          userId: 0,
        });
      })
    );
  }

  private RequestCartItems(): Observable<any> {
    return this.http.get(environment.baseURL + 'Cart/GetCartWithItems', {
      headers: this.headers,
    });
  }

  // Method to remove a product from the cart
  public RemoveFromCart(product: any): Observable<boolean> {
    return this.RemoveFromCartRequest(product).pipe(
      map((data) => data === true),
      catchError((error) => {
        console.error('Error removing product from cart:', error);
        return of(false);
      })
    );
  }

  private RemoveFromCartRequest(product: any): Observable<any> {
    return this.http.put(environment.baseURL + 'Cart/RemoveCartItem', product, {
      headers: this.headers,
    });
  }

  // Update product quantity
  updateQuantity(productId: number, quantityChange: number): Observable<any> {
    return this.GetCartItems().pipe(
      switchMap((cartDetails) => {
        const product = cartDetails.cartItems.find(
          (item: any) => item.productId === productId
        );

        if (product) {
          if (product.quantity == 1 && quantityChange == -1) {
            return of({
              success: false,
              message: 'Product not found in the cart',
            });
          }
          const newQuantity = quantityChange; // Prevent negative or zero quantity
          const updatedProduct = {
            productId: product.productId,
            quantity: newQuantity,
          };

          return this.AddToCart(updatedProduct);
          // Update the cart in the backend
        } else {
          // Return an observable with error message if product not found
          return of({
            success: false,
            message: 'Product not found in the cart',
          });
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
