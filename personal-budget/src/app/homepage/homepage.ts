import { Component, AfterViewInit, inject } from '@angular/core';
import { Article } from '../article/article';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'pb-homepage',
  imports: [ Article, HttpClientModule ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements AfterViewInit {
  private http = inject(HttpClient);

  public dataSource = {
    datasets: [
        {
            data: [] as number[],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: [] as string[]
  };

  ngAfterViewInit() {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
              new Chart(ctx, {
                  type: 'pie',
                  data: this.dataSource
              });
          }
      }
  }
}
