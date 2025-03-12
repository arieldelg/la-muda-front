import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  PaginationOptions,
  Review,
  ReviewsResponse,
} from '../interfaces/store.interface';
import { environment } from '@/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient);
  public reviewsCache = new Map();
  public reviewCache = new Map();
  getReviews({ limit, offset }: PaginationOptions): Observable<{
    ok: boolean;
    data?: Review[];
    totalPage: number;
    err?: any;
  }> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset ?? '0');
    const key = `${limit}-${offset}`;
    if (this.reviewsCache.has(key)) {
      return of(this.reviewsCache.get(key));
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
            totalPage: resp.total,
          })
        ),
        map((resp) => ({
          ok: true,
          data: resp.reviews,
          totalPage: resp.total,
        })),
        catchError((err) => of({ ok: false, totalPage: 0, err }))
      );
  }

  getReview(id: string): Observable<{ ok: boolean; data?: Review; err?: any }> {
    if (this.reviewCache.has(id)) {
      return this.reviewCache.get(id);
    }
    return this.http.get<Review>(`${environment.API_HOST}/${id}`).pipe(
      tap((resp) => this.reviewCache.set(id, { ok: true, data: resp })),
      map((resp) => ({ ok: true, data: resp })),
      catchError((err) => of({ ok: false, err }))
    );
  }
}
