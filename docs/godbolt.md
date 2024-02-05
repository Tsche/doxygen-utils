# Compiler Explorer
[TOC]

The `doxygen-awesome-godbolt` extension adds "Run in compiler explorer" buttons to code blocks with runnable content. Whether a code block is runnable is decided by looking at it's first line. If it matches a certain pattern, it is considered.


## Usage

## Installation
* Ensure you have doxygen-awesome properly configured for this project
* Add `doxygen-awesome/doxygen-awesome-godbolt.css` to `HTML_EXTRA_STYLESHEET` in your Doxyfile
* Add `doxygen-awesome/doxygen-awesome-godbolt.js` to `HTML_EXTRA_FILES` in your Doxyfile

> [!TIP]
> If you have already created a custom `HTML_HEADER` you can skip to step 6

* Run `doxygen -w html header.html delete_me.html delete_me.css` in a command prompt and delete the files called `delete_me`
* Set `HTML_HEADER` to the path of your `header.html` file in your Doxyfile

* Add 
```html
<script type="text/javascript" src="$relpath^doxygen-awesome-godbolt.js"></script>
```
to the `<head>` node of your `header.html`

* Activate the extension by also putting 
```html
<script type="text/javascript">DoxygenAwesomeGodbolt.init();</script>
```
into your `header.html`'s `<head>` node.

You can now mark your runnable code snippets as runnable.

## Magic line
To figure out if a code snippet is runnable we need to check the first non-empty line for a special marker. To make IDEs happy the default markers are `//*` and `#*`.

If you want to use custom markers you can set `markers` in the optional options dictionary passed to `DoxygenAwesomeGodbolt.init(...)`.

For example for COBOL you could do
```html
<script type="text/javascript">
    DoxygenAwesomeGodbolt.init({markers=['      *', '      /']});
</script>
```

### Setting the language
Putting only the marker in the first line of a code block will cause it to be marked as runnable with default settings. Those default settings are currently C++ mode, GCC trunk, C++20 dialect and -O3.

If you need to select a specific compiler or compiler options you must explicitly specify the language by putting it as first argument after the marker.

ie `//* c` would select C mode, `//* c++` would select C++ and `#* python` would select Python. You can get a full list of supported languages from the [godbolt API](https://godbolt.org/api/languages).

### Setting the compiler and compiler options
You can also select the compiler and compiler options. For this to work you _must_ specify the language.
A list of supported compilers can be retrieved from the [godbolt API](https://godbolt.org/api/compilers). Make sure to select an appropriate language.

ie `//* c++ gsnapshot` would select GCC trunk with default options. `//* c++ clang_trunk -std=c++23` would select Clang trunk in C++23 mode.

It's also possible to only specify compiler options while defaulting to the default compiler. For example `//* c++ -std=c++23` would select GCC trunk in C++23 mode.


## Example

C++ mode, default compiler, default options. Magic line is `//* c++`
```cpp
//* c++
#include <iostream>

int main() {
    endl(std::cout << "Hello World");
}
```

C++ mode, Clang trunk, C++23 mode, O2. Magic line is `//* c++ clang_trunk -std=c++23 -O2`
```cpp
//* c++ clang_trunk -std=c++23 -O2
#include <print>

int main(){
    std::println("Hello World");
}
```

Python mode, no options. Magic line is `//* python`
```py
#* python
import __hello__

if __name__ == "__main__":
    __hello__.main()
```