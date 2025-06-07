// Tạo ra một hàm Validator để kiểm tra các trường trong form

/** Mong muốn:
 * Validator({
      formId: "#form-1",
      formMessage: ".form-message",
      rules: [
        Validator.isRequired("#username"),
        Validator.isRequired("#password"),
      ],
    });

    Các validator.isRequired sẽ trả về một object chứa selector và hàm test.
 */

function Validator(obj) {
  // Tạo ra một mảng selectorRules để lưu trữ các rules cho từng trường input.
  const selectorRules = {};
  obj.rules.forEach((rule) => {
    if (Array.isArray(selectorRules[rule.selector])) {
      selectorRules[rule.selector].push(rule.testFn);
    } else {
      selectorRules[rule.selector] = [rule.testFn];
    }
  });
  // selectorRules = {
  // "#password":
  // "#email"
  //}

  // Tạo hàm validate()
  function validate(inputElement, rule) {
    let errorMessage;
    const messageElement = inputElement.parentElement.querySelector(
      obj.formMessage
    );
    const rules = selectorRules[rule.selector];

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
  //----------------------------------------------

  // Lấy phần tử form theo ID, ở đây là form có id là "form-1"
  const formElement = document.querySelector(obj.formId);

  if (formElement) {
    // 1. Khi các trường input để trống và người dùng click vào nút submit thì sẽ hiển thị thông báo lỗi (done)
    const buttonElement = formElement.querySelector(obj.formButton);

    // Lắng nghe sự kiện click vào nút submit
    buttonElement.addEventListener("click", function (e) {
      e.preventDefault();

      obj.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);

        validate(inputElement, rule); // Gọi hàm validate để kiểm tra từng trường
      });
    });

    // 2. Khi người dùng nhập dữ liệu vào các trường input thì sẽ kiểm tra ngay (done)
    obj.rules.forEach((rule) => {
      const inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.addEventListener("blur", function () {
          // Khi trường mất focus thì kiểm tra
          validate(inputElement, rule);
        });
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
