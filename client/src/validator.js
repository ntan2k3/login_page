function Validator(obj) {
  // Tạo ra một mảng selectorRules để lưu trữ các rules cho từng trường input.
  const selectorRules = {};

  // Tạo hàm lấy thẻ chứa class là form-container (ví dụ thẻ input được lồng trong nhiều thẻ div khác thì không thể sử dụng parentElement trực tiếp)
  function getFormGroupElement(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  // Tạo hàm validate() để kiểm tra các thẻ input
  function validate(inputElement, rule) {
    let errorMessage;
    const formGroupElement = getFormGroupElement(inputElement, obj.formGroup);
    const messageElement = formGroupElement.querySelector(obj.formMessage);
    const rules = selectorRules[rule.selector];

    if (messageElement) {
      for (const fn of rules) {
        errorMessage = fn(inputElement.value);
        if (errorMessage) break;
      }
      if (errorMessage) {
        // Nếu có lỗi thì hiển thị thông báo lỗi

        messageElement.innerText = errorMessage;
        inputElement.classList.add("invalid");
      } else {
        // Nếu không có lỗi thì xóa thông báo lỗi

        messageElement.innerText = "";
        inputElement.classList.remove("invalid");
      }
    }
    return !errorMessage; // true nếu có lỗi
  }
  //----------------------------------------------

  // Lấy phần tử form
  const formElement = document.querySelector(obj.formId);

  if (formElement) {
    // Thêm các rule vào mảng
    obj.rules.forEach((rule) => {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.testFn);
      } else {
        selectorRules[rule.selector] = [rule.testFn];
      }

      // 1. Check các sự kiện blur và input (done)

      const inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.addEventListener("blur", () =>
          validate(inputElement, rule)
        );
        inputElement.addEventListener("input", () =>
          validate(inputElement, rule)
        );
      }
    });
    // 2. Khi các trường input để trống và người dùng submit form thì báo lỗi ở từng input
    // Lắng nghe sự kiện khi submit form
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();

      let isFormValid = true;

      obj.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      const enabledInputs = formElement.querySelectorAll(
        "[name]:not([disabled])"
      );
      const formValues = Array.from(enabledInputs).reduce((values, input) => {
        values[input.name] = input.value;
        return values;
      }, {});

      if (isFormValid && typeof obj.onSubmit === "function") {
        obj.onSubmit(formValues);
      } else {
        console.log("Hello");
      }
    });
  }
}

// 3. Tạo các rules để kiểm tra từng trường input
// isRequired: Kiểm tra trường input có được nhập hay không
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    testFn: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};

// isEmail: Kiểm tra trường input có phải là email hợp lệ hay không
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    testFn: function (value) {
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Vui lòng nhập email hợp lệ";
    },
  };
};

// isPassWord: Kiểm tra trường input có phải là mật khẩu hợp lệ hay không
Validator.isPassWord = function (selector, message) {
  return {
    selector: selector,
    testFn: function (value) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regex.test(value)
        ? undefined
        : message ||
            "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số";
    },
  };
};

export default Validator;
