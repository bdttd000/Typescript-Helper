# Typescript Helper

#### Basic Types

```
number - All numbers, no differentation between integers or floats
string - All text values
boolean - Just "true" or "false", no "truthy" or "falsy" values
object - Any JavaScript object, more specific types (type of object) are possible
Array - Any JavaScript array, type can be flexible or strict (regarding the element types)
Tuple - Added by TypeScript: Fixed-length array
Enum - Added by TypeScript: Automatically enumerated global constant indetifiers
Any - Any kind of value, no specific type assignment
```

#### Function

```
function add(n1: number, n2: number): number {
    return n1 + n2;
}

const add = (n1: number, n2: number): number => {
    return n1 + n2;
}

const add: (n1: number, n2: number) => number = (n1, n2) => n1 + n2
```

#### Union & Literal Type

```
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {
    ...
}
```

#### Callbacks

```
function addAndPrint(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndPrint(5, 10, (result) => {
    console.log(result);
})
```

#### More Types

```
void - Default type for functions without return statement
unknown - Added by TypeScript: Unknown type value, more restrictive than "any"
never - For variables or function that should never get or return any value
```

#### Interfaces

```
interface Named {
    readonly name: string;
    surname?: string;
}

interface Aged {
    age: number;
}

interface Greetable extends Named, Aged {
    greeet(phrase: string): void;
}

class Person implements Greetable {
    ...
}
```

```
interface AddFn {
    (n1: number, n2: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}
```

<!-- 72 -->
