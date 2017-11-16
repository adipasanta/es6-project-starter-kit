import { select, selectAll, event } from "d3-selection";
import { format } from "d3-format";
import { min, max, extent, sum } from "d3-array";
import { donutChart } from './visuals/donutChart';
import Vue from "vue";

let h_stackbarchart_dataset = [
  {index: 121, billid: 'HB 4643', agree: 67, disagree: 54},
  {index: 131, billid: 'HB 6066', agree: 87, disagree: 44},
  {index: 198, billid: 'HB 5851', agree: 164, disagree: 34},
  {index: 76, billid: 'HB 5400', agree: 58, disagree: 18},
  {index: 106, billid: 'HB 5700', agree: 88, disagree: 18},
  {index: 196, billid: 'HB 8200', agree: 75, disagree: 108},
  {index: 86, billid: 'HB 9200', agree: 63, disagree: 23},
  {index: 216, billid: 'HB 3400', agree: 128, disagree: 88}
];



let donut_dataset =
[
  {
    'Type': 'Total Examinees Completed',
    'Number': 202
  },
  {
    'Type': 'Total Examinees Not Started',
    'Number': 395
  },
  {
    'Type': 'Total Examinees Started',
    'Number': 205
  }
];

let donut = donutChart()
                .width(920)
                .height(600)
                .cornerRadius(3) // sets how rounded the corners are on each slice
                .padAngle(0.015) // effectively dictates the gap between slices
                .variable('Number')
                .category('Type')
                .percentFormat(format(',d'));

select('#d3ArcCanvas')
            .datum(donut_dataset) // bind data to the div
            .call(donut); // draw chart in div

var vm = new Vue({

  el: "#listing",
  data: {
    iTotalExaminees: 850,
    iTotalExamineesCompleted: 202,
    iTotalExamineesNotStarted: 395,
    iTotalExamineesStarted: 205
  }

})