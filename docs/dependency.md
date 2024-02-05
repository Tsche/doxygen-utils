# Dependency graphs

Doxygen unfortunately includes standard library headers in include dependency graphs. This easily clutters it and makes the graph rather unpleasant to look at.

However, there is a way to remedy this: hook into Doxygen and patch the dot files!

## Installation

* Install [pydot](https://pypi.org/project/pydot/1.2.2/) using your preferred Python package manager
* Set the `DOT_PATH` in your Doxyfile to the [hooks/](https://github.com/Tsche/doxygen-utils/tree/master/hooks) directory of this repository

Doxygen should now patch all include dependency graphs who have nodes that match a standard library header name or whose nodes link to cppreference if properly set up through Doxygen's tag support.