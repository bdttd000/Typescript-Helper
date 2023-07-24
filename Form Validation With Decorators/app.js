"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const config = {};
const addValidator = (input, type) => {
    config[input] = config[input] ? [...config[input], type] : [type];
};
const Require = (_, input) => addValidator(input, "required");
const Maxlength = (_, input) => addValidator(input, "maxlength");
const Positive = (_, input) => addValidator(input, "positive");
const validate = (course) => Object.entries(config).every(([input, types]) => types.every((type) => (type === "required" && course[input]) ||
    (type === "positive" && course[input] > 0) ||
    (type === "maxlength" && course[input].length < 10)));
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Require,
    Maxlength
], Course.prototype, "title", void 0);
__decorate([
    Require,
    Positive
], Course.prototype, "price", void 0);
const myForm = document.querySelector("form");
myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Wrong input!");
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map