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

#### Intersection Types

```
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
```

#### Type Guards

```
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type UnknownEmployee = Admin | Employee

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}
```

```
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCardo(amount: number) {
    console.log('Loading cargo... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCardo(1000);
  }
}

```

#### Discriminated Unions

```
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch(animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}
```

#### Type casting

```
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
```

```
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}
```

#### Index Properties

```
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a captial character'
}
```

#### Function Overloads

```
type Combinable = string | number;

function add(a: number, b: number): number;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable): Combinable {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

#### Optional Chaining

```
const fetchedUserData = {
  id: "u1",
  name: "xyz",
  job: {
    title: 'CEO',
    description: 'My own compapny'
  }
};

console.log(fetchedUserData?.job?.title);
```

#### Nullish Coalescing

```
// before
let x = foo !== null && foo !== undefined ? foo : bar();

// after
let x = foo ?? bar();
```

### Generics

#### Built-in Generics

```
const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
})

promise.then(data => {
  data.split(' ');
})
```

<!-- 92 -->
