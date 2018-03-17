import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chartist from 'chartist';
import {DashboardService} from '../common/_services/dashboard.service';

declare const $: any;
declare interface HotelesInfo {
    hotelId: number;
    hotelNombre: string;
    hotelNumHab: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    hoteles: any[];
    hotelesItems: any[];
    constructor(public _dashboardService: DashboardService){

    }
    startAnimationForLineChart(chart: any) {{}
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      chart.on('draw', function(data: any) {

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  }

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
      this._dashboardService.getHoteles().subscribe(
          (data) => {
              this.hoteles = data;
              this.hotelesItems = this.hoteles.filter(hotelItem => hotelItem);
          },
          err => {
              console.error(err);
          }
      );
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */

      const dataDailySalesChart = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      };

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);
      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

      const optionsCompletedTasksChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
          // look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      };

     const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
      optionsCompletedTasksChart);

     this.startAnimationForLineChart(completedTasksChart);
   }
   ngAfterViewInit() {
       const breakCards = true;
       if (breakCards === true) {
           // We break the cards headers if there is too much stress on them :-)
           $('[data-header-animation="true"]').each(function(){
               const $fix_button = $(this);
               const $card = $(this).parent('.card');
               $card.find('.fix-broken-card').click(function(){
                   const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                   $header.removeClass('hinge').addClass('fadeInDown');

                   $card.attr('data-count', 0);

                   setTimeout(function(){
                       $header.removeClass('fadeInDown animate');
                   }, 480);
               });

               $card.mouseenter(function(){
                   const $this = $(this);
                   const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                   $this.attr('data-count', hover_count);
                   if (hover_count >= 20) {
                       $(this).children('.card-header, .card-image').addClass('hinge animated');
                   }
               });
           });
       }
   }
}
