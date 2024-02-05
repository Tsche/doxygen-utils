
function render_chart(target_id, chart) {
  $.getJSON(chart, function(data) {
     return new frappe.Chart(target_id, data);
  });
}

class DoxygenAwesomeCharts {
  static marker = 'frappe-chart';

  static replaceElement(element, name) {
    let chart_container = document.createElement("div");
    chart_container.id = name;
    element.replaceWith(chart_container);
  }

  static init() {
    $(() => {
      const images = document.getElementsByTagName("img");
      for (const image of images) {
        if(!image.alt.startsWith(DoxygenAwesomeCharts.marker)){
          continue;
        }
        const name = image.alt.split('\n', 1)[0].slice(DoxygenAwesomeCharts.marker.length).trim();
        const data = image.src;

        DoxygenAwesomeCharts.replaceElement(image, name);
        $.getJSON(data, (settings) => {
          return new frappe.Chart('#' + name, settings);
        });
      }

      const fragments = document.getElementsByClassName('fragment');
      for (const fragment of fragments) {
        fragment.querySelectorAll('.lineno, .ttc').forEach((node) => {node.remove()});
        let {textContent} = fragment;
        textContent = textContent.trim();

        if(!textContent.startsWith(DoxygenAwesomeCharts.marker)) {
          continue;
        }

        let [name] = textContent.split('\n', 1);
        const data = textContent.slice(name.length);
        name = name.slice(DoxygenAwesomeCharts.marker.length).trim();
        
        DoxygenAwesomeCharts.replaceElement(fragment, name);
        let config = JSON.parse(data);
        if (typeof config.data === 'string' || config.data instanceof String) {
          // string-like data => need to fetch
          $.getJSON(config.data, (settings) => {
            config.data = settings;
            return new frappe.Chart('#' + name, config);
          });
        }
        else {
          return new frappe.Chart('#' + name, config);
        }
      }
    })
  }
}

customElements.define('doxygen-awesome-charts', DoxygenAwesomeCharts);
