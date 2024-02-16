# Tables
[TOC]

The `doxygen-awesome-tables` extension allows embedding of datatables with custom markup.


## Usage

## Installation
* Ensure you have doxygen-awesome properly configured for this project
* Add `doxygen-awesome/doxygen-awesome-tables.css` to `HTML_EXTRA_STYLESHEET` in your Doxyfile
* Add `doxygen-awesome/doxygen-awesome-tables.js` to `HTML_EXTRA_FILES` in your Doxyfile

> [!TIP]
> If you have already created a custom `HTML_HEADER` you can skip to step 6

* Run `doxygen -w html header.html delete_me.html delete_me.css` in a command prompt and delete the files called `delete_me`
* Set `HTML_HEADER` to the path of your `header.html` file in your Doxyfile

* Add 
```html
<link href="https://cdn.datatables.net/2.0.0/css/dataTables.dataTables.min.css" rel="stylesheet">
<script src="https://cdn.datatables.net/2.0.0/js/dataTables.min.js"></script>
<script type="text/javascript" src="$relpath^doxygen-awesome-tables.js"></script>
```
to the `<head>` node of your `header.html`

* Activate the extension by also putting 
```html
<script type="text/javascript">DoxygenAwesomeTables.init();</script>
```
into your `header.html`'s `<head>` node.

* (Optional) Add your chart input files to `HTML_EXTRA_FILES` in your Doxyfile if you want Doxygen to copy them to the html root for you.

You can now embed tables in your documentation. Note that chart names must be unique since they will be used as id for the `<table>` datatable renders to.

## Example

### Shorthand
tables can easily be embedded using image syntax. Note that the alt name must start with the special marker `datatable` and contain a unique name. The link target should be a JSON file with the chart data in it.
```markdown
![datatable zoinks](test_table.json)
```
This expects a full datatables configuration object.

#### Demo
![datatable zoinks](test_table.json)


### Inline
An alternative way is to provide the chart as code block. In this mode the first line must start with the special marker `datatable` and contain a unique name. Everything but the first line is interpreted as JSON input to datatables. 

You can either provide the data as link:
```markdown
'''json
datatable foo
{
    "columns": [
      {
        "className": "dt-control",
        "orderable": false,
        "data": null,
        "defaultContent": ""
      },
      {"data": "name"}, {"data": "position"}, {"data": "office"},
      {"data": "salary"}

    ],
    "data": "test_table_data.json",
}
'''

<script type="text/javascript">
  // enable detail dropdown for table foo
  DoxygenAwesomeTables.detailHandler("foo", (row) => {
      return (
          '<dl>' +
          '<dt>Full name:</dt>' +
          '<dd>' + row.name + '</dd>' +
          '<dt>Extension number:</dt>' +
          '<dd>' + row.extn + '</dd>' +
          '<dt>Extra info:</dt>' +
          '<dd>And any further details here (images etc)...</dd>' +
          '</dl>');
    });
</script>
```
```json
datatable foo
{
    "columns": [
      {
        "className": "dt-control",
        "orderable": false,
        "data": null,
        "defaultContent": ""
      },
      {"data": "name"}, {"data": "position"}, {"data": "office"},
      {"data": "salary"}

    ],
    "data": "test_table_data.json"
}
```

@htmlonly
<script type="text/javascript">
  // enable detail dropdown for table foo
  DoxygenAwesomeTables.detailHandler("foo", (row) => {
      return (
          '<dl>' +
          '<dt>Full name:</dt>' +
          '<dd>' + row.name + '</dd>' +
          '<dt>Extension number:</dt>' +
          '<dd>' + row.extn + '</dd>' +
          '<dt>Extra info:</dt>' +
          '<dd>And any further details here (images etc)...</dd>' +
          '</dl>');
    });
</script>
@endhtmlonly