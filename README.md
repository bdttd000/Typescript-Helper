## Main knowledge

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
k

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

#### Singleton Class

```
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Singleton();
    return this.instance;
  }
}

const singleton = Singleton.getInstance();
```

## Generics

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

#### Generic Function

```
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
```

```
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}
```

```
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}
```

#### Generic Class

```
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
```

#### Generic Utility Types

```
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}
```

```
const names: Readonly<string[]> = ["Max", "Anna"];
names.push('Manu'); - Not allowed
names.pop(); - Not allowed
```

## Decorators

#### First Class Decorator

```
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creationg person object...");
  }
}
```

```
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger("LOGGING - PERSON")
class Person {
  name = "Max";

  constructor() {
    console.log("Creationg person object...");
  }
}
```

#### More Useful Decorators

```
function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h1>Person Object</h1>", "app")
class Person {
  name = "Xyz";

  constructor() {
    console.log("Creationg person object...");
  }
}
```

#### Decorators queue

```
function Logger() {
  console.log("Logger factory");
  return function (_: Function) {
    console.log("Logger render");
  };
}

function WithTemplate() {
  console.log("Template factory");
  return function (_: Function) {
    console.log("Template render");
  };
}

@Logger()
@WithTemplate()
class Person {
  constructor() {
    console.log("Creationg person object...");
  }
}

const per = new Person();

// CONSOLE
// Logger factory
// Template factory
// Template render
// Logger render
// Creationg person object...
```

#### Autobind

```
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ... {
  @Autobind
  private submitHandler(event: Event) {
  ...
  }
}
```

<!-- 110 -->
