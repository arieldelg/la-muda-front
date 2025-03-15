import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  PaginationOptions,
  PostOptions,
  PostResponse,
  Review,
  ReviewMap,
  ReviewsMap,
  ReviewsResponse,
} from '../interfaces/store.interface';
import { environment } from '@/environments/environment';
import { catchError, forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient);
  private readonly reviewsCache = new Map<string, ReviewsMap>();
  private readonly reviewCache = new Map<string, ReviewMap>();
  getReviews({ limit, offset }: PaginationOptions): Observable<{
    ok: boolean;
    data?: Review[];
    totalReviews: number;
    err?: any;
  }> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset ?? '0');
    const key = `${limit}-${offset}`;
    if (this.reviewsCache.has(key)) {
      return of(this.reviewsCache.get(key)!);
    }
    return this.http
      .get<ReviewsResponse>(`${environment.API_HOST}/review`, {
        params,
      })
      .pipe(
        tap((resp) =>
          this.reviewsCache.set(key, {
            ok: true,
            data: resp.reviews,
            totalReviews: resp.total,
          })
        ),
        map((resp) => ({
          ok: true,
          data: resp.reviews,
          totalReviews: resp.total,
        })),
        catchError((err) => {
          this.reviewsCache.clear();
          return of({ ok: false, totalReviews: 0, err });
        })
      );
  }

  getReview(id: string): Observable<{ ok: boolean; data?: Review; err?: any }> {
    if (this.reviewCache.has(id)) {
      return of(this.reviewCache.get(id)!);
    }
    return this.http.get<Review>(`${environment.API_HOST}/${id}`).pipe(
      tap((resp) => this.reviewCache.set(id, { ok: true, data: resp })),
      map((resp) => ({ ok: true, data: resp })),
      catchError((err) => {
        this.reviewCache.clear();
        return of({ ok: false, err });
      })
    );
  }

  postReview(
    review: PostOptions,
    imagesFiles?: FileList
  ): Observable<{ ok: boolean; message: string; err?: any }> {
    // return of({
    //   ok: false,
    //   message: 'Error test',
    //   err: new Error('Es una prueba'),
    // });
    return this.uploadImage(imagesFiles!).pipe(
      mergeMap((resp) => {
        const tempObject = {
          ...review,
          images:
            resp?.length === 0
              ? [
                  'https://res.cloudinary.com/projectsspookyd/image/upload/v1741756077/no-image_keykh7.jpg',
                ]
              : [...resp],
        };

        return this.http
          .post<PostResponse>(`${environment.API_HOST}/review`, tempObject)
          .pipe(
            tap((resp) => this.addProductCache(resp)),
            map((resp) => ({
              ok: resp.ok,
              message: 'Review Created',
            })),
            catchError((err) => {
              return of({ ok: false, err, message: 'Error creating post' });
            })
          );
      })
    );
  }

  uploadImage(images: FileList): Observable<{ url: string; id: string }[]> {
    if (!images || images.length === 0) {
      return of([]);
    }

    const uploadObservables = Array.from(images).map((file) =>
      this.uploadSingleImage(file)
    );

    return forkJoin(uploadObservables); //* mandas un arreglo de observables y se espera a que todos salgan con éxito (forkJoin)
  }

  uploadSingleImage(file: File): Observable<{ url: string; id: string }> {
    const formData = new FormData();
    formData.append('files', file);

    return this.http
      .post<{ url: string; id: string }[]>(
        `${environment.API_HOST}/image`,
        formData
      )
      .pipe(map(([{ id, url }]) => ({ url, id })));
  }

  addProductCache(review: PostResponse) {
    const { data } = review;
    this.reviewCache.set(data.id, review);
    this.reviewsCache.forEach((productsResponse) => {
      productsResponse.data.push(data);
      productsResponse.totalReviews += 1;
    });
  }

  updateProductCache(review: Review) {
    const reviewId = review.id;
    this.reviewCache.set(reviewId, { ok: true, data: review });

    this.reviewsCache.forEach((productResponse) => {
      productResponse.data = productResponse.data.map((product) => {
        if (product.id === reviewId) {
          return review;
        }
        return product;
      });
    });
  }
}
