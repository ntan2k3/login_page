// Tạo ra một hàm Validator để kiểm tra các trường trong form

/**
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
  // Tạo hàm validate()
  function validate(inputElement, rule) {
    const errorMessage = rule.testFn(inputElement.value);
    const messageElement = inputElement.parentElement.querySelector(
      obj.formMessage
    );

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
  const formELement = document.querySelector(obj.formId);

  if (formELement) {
    // Khi submit form
    const buttonElement = formELement.querySelector(obj.formButton);

    // Lắng nghe sự kiện click vào nút submit
    buttonElement.addEventListener("click", function (e) {
      e.preventDefault();

      obj.rules.forEach((rule) => {
        const inputElement = formELement.querySelector(rule.selector);
        if (inputElement) {
          validate(inputElement, rule); // Gọi hàm validate để kiểm tra từng trường
        }
      });
    });
    // Nếu tồn tại form thì thực hiện các bước kiểm tra

    obj.rules.forEach((rule) => {
      const inputElement = formELement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.addEventListener("blur", function () {
          // Khi trường mất focus thì kiểm tra
          validate(inputElement, rule);
        });
      }
    });
  }
}

// Định nghĩa các rules kiểm tra
// Nguyên tắc các rule
// 1. Nếu có lỗi thì trả về message lỗi
// 2. Nếu không có lỗi thì trả về undefined
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    testFn: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};

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

export default Validator;
