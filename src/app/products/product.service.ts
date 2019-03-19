import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private productUrl = 'api/products/products.json';

	constructor(private http: HttpClient) {}

	getProducts(): Observable<IProduct> {
		return this.http.get<IProduct[]>(this.productUrl).pipe(
			tap(data => console.log('All: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	private handleError(err: HttpErrorResponse) {
		// irl we would log this properly
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) {
			// client side network error
			errorMessage = `And error occurred: ${err.error.message}`;
		} else {
			// backend returned unsuccessful code
			// body may contain clues
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);
	}
}
