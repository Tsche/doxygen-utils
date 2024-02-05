
function render_chart(target_id, chart) {
  $.getJSON(chart, function(data) {
     return new frappe.Chart(target_id, data);
  });
}

class DoxygenAwesomeCharts extends HTMLElement {
  constructor() {
    super();
    this.onclick  = this.runContent;
    this.compiler = {};
  }

  static init() {
    $(() => {

    })
  }


}

customElements.define('doxygen-awesome-charts', DoxygenAwesomeCharts);
