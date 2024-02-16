# Charts
[TOC]

The `doxygen-awesome-charts` extension allows embedding of frappe charts with custom markup.


## Usage

## Installation
* Ensure you have doxygen-awesome properly configured for this project
* Add `doxygen-awesome/doxygen-awesome-charts.js` to `HTML_EXTRA_FILES` in your Doxyfile

> [!TIP]
> If you have already created a custom `HTML_HEADER` you can skip to step 6

* Run `doxygen -w html header.html delete_me.html delete_me.css` in a command prompt and delete the files called `delete_me`
* Set `HTML_HEADER` to the path of your `header.html` file in your Doxyfile

* Add 
```html
<script src="https://unpkg.com/frappe-charts@1.6.1/dist/frappe-charts.min.umd.js"></script>
<script type="text/javascript" src="$relpath^doxygen-awesome-charts.js"></script>
```
to the `<head>` node of your `header.html`

* Activate the extension by also putting 
```html
<script type="text/javascript">DoxygenAwesomeCharts.init();</script>
```
into your `header.html`'s `<head>` node.

* (Optional) Add your chart input files to `HTML_EXTRA_FILES` in your Doxyfile if you want Doxygen to copy them to the html root for you.

You can now embed charts in your documentation. Note that chart names must be unique since they will be used as id for the `<div>` frappe renders to.

## Example

### Shorthand
Charts can easily be embedded using image syntax. Note that the alt name must start with the special marker `frappe-chart` and contain a unique name. The link target should be a JSON file with the chart data in it.
```markdown
![frappe-chart zoinks](test_chart.json)
```
This expects a full frappe chart configuration object.

#### Demo
![frappe-chart zoinks](test_chart.json)


### Inline
An alternative way is to provide the chart as code block. In this mode the first line must start with the special marker `frappe-chart` and contain a unique name. Everything but the first line is interpreted as JSON input to frappe. 

You can either provide the data as link:
```markdown
'''json
frappe-chart foo
{
    "title": "librepr::enum_name<Foo>",
    "colors": [
        "#ee3c77",
        "#1f4213",
        "#d9f2e5",
        "#6e72f4"
    ],
    "data": "test_chart_data.json",
    "type": "line",
    "height": 400,
    "lineOptions": {
        "regionFill": 1,
        "spline": 1
    }
}
'''
```
```json
frappe-chart foo
{
    "title": "librepr::enum_name<Foo>",
    "colors": [
        "#ee3c77",
        "#1f4213",
        "#d9f2e5",
        "#6e72f4"
    ],
    "data": "test_chart_data.json",
    "type": "line",
    "height": 400,
    "lineOptions": {
        "regionFill": 1,
        "spline": 1
    }
}
```


or embed the data directly:
```markdown
'''json
frappe-chart bar
{
    "title": "librepr::enum_name<Foo>",
    "colors": [
        "#ee3c77",
        "#1f4213",
        "#d9f2e5",
        "#6e72f4"
    ],
    "data": {
        "labels": ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        "datasets": [
            {
                "name": "recursive",
                "values": [1356, 1356, 824, 752, 722, 834, 770, 750, 722],
                "chartType": "line"
            },
            {
                "name": "chunked",
                "values": [ 1335, 709, 710, 709, 1335, 759, 729, 809, 759],
                "chartType": "line"
            },
            {
                "name": "chunked_pack",
                "values": [
                    1366, 724, 745, 712, 1366, 703, 706, 712, 700],
                "chartType": "line"
            },
            {
                "name": "magic_enum",
                "values": [ 10069, 10069, 4639, 6639, 5639, 4434, 4459, 4679, 4739],
                "chartType": "line"
            }
        ],
        "yMarkers": [
            {
                "label": "recursive",
                "value": 722
            },
            {
                "label": "chunked",
                "value": 709
            },
            {
                "label": "chunked_pack",
                "value": 700
            },
            {
                "label": "magic_enum",
                "value": 4459
            }
        ]
    },
    "type": "line",
    "height": 400,
    "lineOptions": {
        "regionFill": 1,
        "spline": 1
    }
}
'''
```

```json
frappe-chart bar
{
    "title": "librepr::enum_name<Foo>",
    "colors": [
        "#ee3c77",
        "#1f4213",
        "#d9f2e5",
        "#6e72f4"
    ],
    "data": {
        "labels": ["0", "1", "2", "3", "4", "5", "6", "7", "8" ],
        "datasets": [
            {
                "name": "recursive",
                "values": [1356, 1356, 824, 752, 722, 834, 770, 750, 722],
                "chartType": "line"
            },
            {
                "name": "chunked",
                "values": [ 1335, 709, 710, 709, 1335, 759, 729, 809, 759],
                "chartType": "line"
            },
            {
                "name": "chunked_pack",
                "values": [
                    1366, 724, 745, 712, 1366, 703, 706, 712, 700],
                "chartType": "line"
            },
            {
                "name": "magic_enum",
                "values": [ 10069, 10069, 4639, 6639, 5639, 4434, 4459, 4679, 4739],
                "chartType": "line"
            }
        ],
        "yMarkers": [
            {
                "label": "recursive",
                "value": 722
            },
            {
                "label": "chunked",
                "value": 709
            },
            {
                "label": "chunked_pack",
                "value": 700
            },
            {
                "label": "magic_enum",
                "value": 4459
            }
        ]
    },
    "type": "line",
    "height": 400,
    "lineOptions": {
        "regionFill": 1,
        "spline": 1
    }
}
```