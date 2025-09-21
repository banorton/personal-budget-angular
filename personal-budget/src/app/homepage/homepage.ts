import { Component, AfterViewInit, inject } from '@angular/core';
import { Article } from '../article/article';
import { Chart, registerables } from 'chart.js';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { DataService } from '../data/data.service';

Chart.register(...registerables);

@Component({
  selector: 'pb-homepage',
  imports: [ Article, Breadcrumbs ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements AfterViewInit {
  private dataService = inject(DataService);

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
    this.dataService.getBudgetData().subscribe((budgetData: any[]) => {
      console.log('Received budget data:', budgetData);
      if (budgetData && budgetData.length > 0) {
        for (var i = 0; i < budgetData.length; i++) {
            this.dataSource.datasets[0].data[i] = budgetData[i].budget;
            this.dataSource.labels[i] = budgetData[i].title;
        }
        this.createChart();
      }
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
