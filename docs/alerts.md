# Alerts
[TOC]

The `doxygen-awesome-alerts` extension provides support for GitHub's alert syntax. See [[Markdown] An option to highlight a "Note" and "Warning" using blockquote (Beta)](https://github.com/orgs/community/discussions/16925) for more information.


## Usage

## Installation
* Ensure you have doxygen-awesome properly configured for this project
* Add `doxygen-awesome/doxygen-awesome-alerts.css` to `HTML_EXTRA_STYLESHEET` in your Doxyfile
* Add `doxygen-awesome/doxygen-awesome-alerts.js` to `HTML_EXTRA_FILES` in your Doxyfile

> [!TIP]
> If you have already created a custom `HTML_HEADER` you can skip the next 2 steps

* Run `doxygen -w html header.html delete_me.html delete_me.css` in a command prompt and delete the files called `delete_me`
* Set `HTML_HEADER` to the path of your `header.html` file in your Doxyfile


* Add 
```html
<script type="text/javascript" src="$relpath^doxygen-awesome-alerts.js"></script>
``` 
to the `<head>` node of your `header.html`
* Activate the extension by also putting 
```html
<script type="text/javascript">DoxygenAwesomeAlerts.init();</script>
```
into your `header.html`'s `<head>` node.



The supported tags

| Marker       |
|--------------|
| [!NOTE]      |
| [!TIP]       |
| [!IMPORTANT] |
| [!WARNING]   |
| [!CAUTION]   |

will now be replaced in all quotes.

## Example

### [!NOTE]
```markdown
> [!NOTE]
> Highlights information that users should take into account, even when skimming.
```

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

### [!TIP]
```markdown
> [!TIP]
> Optional information to help a user be more successful.
```
> [!TIP]
> Optional information to help a user be more successful.

### [!IMPORTANT]
```markdown
> [!IMPORTANT]
> Crucial information necessary for users to succeed.
```
> [!IMPORTANT]
> Crucial information necessary for users to succeed.

### [!WARNING]
```markdown
> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.
```
> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

### [!CAUTION]
```markdown
> [!CAUTION]
> Negative potential consequences of an action.
```
> [!CAUTION]
> Negative potential consequences of an action.

## Sanity checks
### Single line
> [!CAUTION]

### No tag
> Foo
> Bar

### [!UNRECOGNIZED]
> [!UNRECOGNIZED]
> This will not be replaced

### [!UNCLOSED
> [!UNCLOSED
> The tag was not closed, so this will not be replaced either.
