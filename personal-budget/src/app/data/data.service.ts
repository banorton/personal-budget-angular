import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  private budgetDataSubject = new BehaviorSubject<any[]>([]);
  public budgetData$ = this.budgetDataSubject.asObservable();

  constructor() {
    this.loadBudgetDataIfEmpty();
  }

  private loadBudgetDataIfEmpty(): void {
    if (this.budgetDataSubject.value.length === 0) {
      this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
        this.budgetDataSubject.next(res.myBudget);
      });
    }
  }

  getBudgetData(): Observable<any[]> {
    this.loadBudgetDataIfEmpty();
    return this.budgetData$;
  }

  refreshData(): void {
    this.budgetDataSubject.next([]);
    this.loadBudgetDataIfEmpty();
  }
}
