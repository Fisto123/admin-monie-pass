import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  showXAxis = true;
  showYAxis = true;
  gradient = false; // or true
  title = 'funds';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  chartData = [
    {
      name: 'Funds in',
      series: [
        { name: 'Jan', value: 50 },
        { name: 'Feb', value: 80 },
        { name: 'Mar', value: 20 },
        { name: 'Apr', value: 10 },
        { name: 'May', value: 1000 },
        { name: 'Jun', value: 400 },

        // Add more data points here
      ],
    },
    // Add more series here if needed
  ];
  chartData2 = [
    {
      name: 'Funds out',
      series: [
        { name: 'Jan', value: 50 },
        { name: 'Feb', value: 80 },
        { name: 'Mar', value: 20 },
        { name: 'Apr', value: 10 },
        { name: 'May', value: 1000 },
        { name: 'Jun', value: 400 },

        // Add more data points here
      ],
    },
    // Add more series here if needed
  ];
}
