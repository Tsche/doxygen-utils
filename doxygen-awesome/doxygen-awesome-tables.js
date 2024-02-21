function waitForElement(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              observer.disconnect();
              resolve(document.querySelector(selector));
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

class DoxygenAwesomeTables {
  static marker = 'datatable';

  static replaceElement(element, name) {
    let chart_container = document.createElement('table');
    chart_container.id = name;
    element.replaceWith(chart_container);
  }

  /**
   * DoxygenAwesomeTables.detailHandler("container_name", (row) => { return "content"; });
   * @param {str} table Table name
   * @param {function} detail_fnc
   */
  static detailHandler(table, detail_fnc) {
    waitForElement(`#${table} tbody`).then((element) => {
      $(element).on('click', 'td.dt-control', function() {
        const tr = $(this).closest('tr');
        const row = $(`#${table}`).DataTable().row(tr);
  
        if (row.child.isShown()) {
          row.child.hide();
        } else {
          row.child(detail_fnc(row.data())).show();
        }
      });
    });
  }

  static jumpTo(table, search_fnc) {
    const datatable = $(`#${table}`).DataTable();
    datatable.rows().deselect();
    datatable.row(search_fnc).select().show().draw(false);
  }

  static linkChart(chart, table, key) {
    waitForElement(`#${chart}`).then((element) => {
      element.addEventListener('data-select', (event) => {
        DoxygenAwesomeTables.jumpTo(table, (idx, data, node) => {
          return data[key] == event.label;
        });
      });
    });
  }

  static init() {
    $(() => {
      const images = document.getElementsByTagName('img');
      for (const image of Array.from(images)) {
        if (!image.alt.startsWith(DoxygenAwesomeTables.marker)) {
          continue;
        }

        const name = image.alt.split('\n', 1)[0]
                         .slice(DoxygenAwesomeTables.marker.length)
                         .trim();
        const data_src = image.src;

        // create container
        DoxygenAwesomeTables.replaceElement(image.parentElement, name);

        $.getJSON(data_src, (settings) => {
          return $(`#${name}`).DataTable(settings);
        });
      }
      const fragments = document.getElementsByClassName('fragment');
      for (const fragment of Array.from(fragments)) {
        fragment.querySelectorAll('.lineno, .ttc')
            .forEach((node) => {node.remove()});
        let {textContent} = fragment;
        textContent = textContent.trim();

        if (!textContent.startsWith(DoxygenAwesomeTables.marker)) {
          continue;
        }

        let [name] = textContent.split('\n', 1);
        const data = textContent.slice(name.length);
        name = name.slice(DoxygenAwesomeTables.marker.length).trim();

        DoxygenAwesomeTables.replaceElement(fragment, name);
        let config = JSON.parse(data);
        if (typeof config.data === 'string' || config.data instanceof String) {
          // string-like data => need to fetch
          $.getJSON(config.data, (settings) => {
            config.data = settings;
            return $(`#${name}`).DataTable(config);
          });
        } else {
          $(`#${name}`).DataTable(config);
        }
      }
    })
  }
}
