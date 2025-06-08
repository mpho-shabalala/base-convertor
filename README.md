# 🔢 Base Converter App

A JavaScript-based **Base Converter** application that allows users to convert numbers from base-10 to any other base using the stack data structure. This project is built with a clean, object-oriented design and a consistent interface between the logic and DOM layers.

---

## 📚 Description

This project was created to explore how **Abstract Data Types (ADTs)** like stacks can be used in real-world scenarios such as number base conversions. It features:

- Custom stack implementation
- Clean separation of UI and logic
- Full input validation and error messaging
- Modern JavaScript design using ES6+ classes

---

## 🧠 Features

- Convert decimal numbers to any base (binary, octal, etc.)
- Stack-based conversion algorithm
- Form input validation
- Inline error messages with auto-dismiss
- Copy result to clipboard (icon-click placeholder with console log)
- Modular class-based design

---

## 🏗️ Architecture

### `Stack`
> A simple ADT stack implementation used to perform base conversions.

- `push(element)`
- `pop()`
- `peek()`
- `length()`
- `clear()`

---

### `UI`
> Responsible for DOM manipulation and abstraction.

- Public methods:
  - `getDomElement(id, type)`
  - `getFormInputValue(formData, inputName)`
  - `getFormData(form)`
- Private methods:
  - `_isHTMLElementValid()`
  - `_isGreaterThanZero()`

---

### `ConverterApp`
> Ties logic and UI together. Handles form submission, validation, conversion logic, and UI updates.

- `getConverterAppFormInputs(...)`
- `mulbase(number, base)`
- `convertedNumberUIUpdate(...)`
- `inputErrorUIUpdate(...)`
- `copyNumberFromUI(...)`
- `errorMessageInclude(...)`

---

## 🧪 Example Flow

1. User fills in a number and target base in the form.
2. On submission:
   - Values are validated.
   - Stack-based conversion is triggered.
   - Result is shown in a paragraph.
   - Errors are displayed inline if needed.
3. Clicking the copy icon logs the result (can be extended to clipboard functionality).

---

## 🚀 Getting Started

1. **Clone the repo** or copy the files into your project.
2. **Ensure your HTML file has:**
   - A form with `id="converter-app-form"`
   - Two inputs: one with name `number`, another with name `base`
   - Paragraphs with `id="conerted-value"`, `number-error-message`, `base-error-message`
   - An image/icon with `id="copy"`

3. **Include your script:**

```html
<script src="converter.js" defer></script>
```

---

## 💡 Example HTML Snippet

```html
<form id="converter-app-form">
  <input name="number" type="number" />
  <p id="number-error-message"></p>
  
  <input name="base" type="number" />
  <p id="base-error-message"></p>
  
  <button type="submit">Convert</button>
</form>

<p id="conerted-value"></p>
<img id="copy" src="copy-icon.png" alt="Copy Result" />
```

---

## 📸 Screenshot

> *(Add a screenshot of the app UI here)*

---

## 🧠 What I Learned

- Creating reusable UI abstractions
- Validating form input with custom rules
- Implementing an ADT stack in JavaScript
- Creating maintainable, testable, modular code
- Using events and DOM structure effectively

---

## 🛠️ Potential Improvements

- Clipboard copy functionality using `navigator.clipboard`
- UI styling and better UX
- Support for fractional numbers
- Responsive/mobile support
- Unit tests for stack and converter logic

---

## 👤 Author

**MG SHABALALA**  
📅 Created: 18/07/2024 – 26/07/2024  
🧠 Built for learning and improving DOM & data structure fluency

---

## 📄 License

Open for learning and contribution — MIT or public domain recommended.
