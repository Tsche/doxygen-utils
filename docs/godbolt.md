# Compiler Explorer

The `doxygen-awesome-godbolt` extension adds "Run in compiler explorer" buttons to code blocks with runnable content. Whether a code block is runnable is decided by looking at it's first line. If it matches a certain pattern, it is considered.


## Usage

TODO

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