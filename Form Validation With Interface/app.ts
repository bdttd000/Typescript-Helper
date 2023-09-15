interface Validatable {
  value: string | number;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable): boolean {
  let isValid = true,
    errorMessage = "";
  if (validatableInput.required && isValid) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    errorMessage = isValid
      ? ""
      : "Field " + validatableInput.name + " is empty";
  }
  if (
    validatableInput.minLength != null &&
    isValid &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
    errorMessage = isValid
      ? ""
      : "Field " + validatableInput.name + " is too short";
  }
  if (
    validatableInput.maxLength != null &&
    isValid &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
    errorMessage = isValid
      ? ""
      : "Field " + validatableInput.name + " is too long";
  }
  if (
    validatableInput.min != null &&
    isValid &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
    errorMessage = isValid
      ? ""
      : "Field " +
        validatableInput.name +
        " min value is " +
        validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    isValid &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
    errorMessage = isValid
      ? ""
      : "Field " +
        validatableInput.name +
        " max value is " +
        validatableInput.max;
  }
  if (!isValid) {
    alert(errorMessage);
  }
  return isValid;
}

const titleInputElement = document.getElementById("title") as HTMLInputElement;
const descriptionInputElement = document.getElementById(
  "description"
) as HTMLInputElement;
const peopleInputElement = document.getElementById(
  "people"
) as HTMLInputElement;

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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

class ProjectInput {
  element: HTMLFormElement;
  resultContainer: HTMLDivElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.element = document.getElementById("form") as HTMLFormElement;
    this.resultContainer = document.getElementById("result") as HTMLDivElement;

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      name: "title",
      value: enteredTitle,
      required: true,
      minLength: 3,
      maxLength: 20,
    };
    const descriptionValidatable: Validatable = {
      name: "description",
      value: enteredDescription,
      required: true,
      minLength: 5,
      maxLength: 500,
    };
    const peopleValidatable: Validatable = {
      name: "people",
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      return;
    }

    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(userInput);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const projectInput = new ProjectInput();
