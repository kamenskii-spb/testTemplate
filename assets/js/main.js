document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const modal = document.getElementById("modal");
  const btnСloseModalWindow = document.querySelector(".close_modal_window");
  const list = document.querySelectorAll("ol li span.dotted");
  const form = document.querySelector("form");
  const email = form.querySelector("#input-mail");
  const emailError = form.querySelector("#input-mail + span.error");
  const inputCross = form.querySelectorAll(".cross");

  main.addEventListener("click", postTrigger);

  if (window.innerWidth <= 842) {
    postsOpen();
  }

  for (const l of list) {
    l.addEventListener("click", () => (modal.style.display = "block"));
  }

  btnСloseModalWindow.addEventListener(
    "click",
    () => (modal.style.display = "none")
  );
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  for (const cross of inputCross) {
    cross.addEventListener("click", function (e) {
      const tInput = e.target.nextElementSibling;
      tInput.value = "";
      clearError(tInput.getAttribute("type"));
    });
  }

  email.addEventListener("input", (e) => {
    email.validity.valid ? clearError("email") : showError("email");
  });

  function clearError(type = "email") {
    if (type === "email") {
      emailError.textContent = "";
      emailError.className = "error";
      email.closest(".form-control").classList.remove("invalid");
    }
  }

  form.addEventListener("submit", function (e) {
    // Если поле email валдно, позволяем форме отправляться
    if (!email.validity.valid) {
      // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
      showError("email");
      // Затем предотвращаем стандартное событие отправки формы
      e.preventDefault();
    }
  });

  function showError(type) {
    if (type === "email") {
      if (email.validity.valueMissing) {
        // Если поле пустое,
        emailError.textContent = "You need to enter an e-mail address.";
      } else if (email.validity.typeMismatch) {
        // Если поле содержит не email-адрес,
        emailError.textContent = "Entered value needs to be an e-mail address.";
      } else if (email.validity.tooShort) {
        // Если содержимое слишком короткое,
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
      }
      emailError.className = "error  arrow active";
      email.closest(".form-control").classList.add("invalid");
    }
  }
});

function postsOpen() {
  const postCont = document.querySelectorAll(".post-content");
  for (const p of postCont) {
    if (!p.classList.contains("open")) {
      p.classList.add("open");
    }
  }
}

function postTrigger(e) {
  if (e.target.dataset.text) {
    const content = e.target.closest(".post-content");
    content.classList.contains("open")
      ? content.classList.remove("open")
      : content.classList.add("open");
  }
}

