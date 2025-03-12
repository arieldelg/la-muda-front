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

  getReviews({ limit, offset }: PaginationOptions): Observable<{
    ok: boolean;
    data?: Review[];
    totalPage: number;
    err?: any;
  }> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset ?? '');
    return this.http
      .get<ReviewsResponse>(`${environment.API_HOST}/review`, {
        params,
      })
      .pipe(
        tap((resp) => console.log(resp)),
        map((resp) => ({
          ok: true,
          data: resp.reviews,
          totalPage: resp.total,
        })),
        catchError((err) => of({ ok: false, totalPage: 0, err }))
      );
  }
}
