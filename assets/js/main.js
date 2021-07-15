document.addEventListener("DOMContentLoaded", () => {

  const main = document.querySelector("main")

  main.addEventListener('click', e => {
      if (e.target.dataset.text) {
        const postPontent = e.target.closest(".post-content")
        if (postPontent.classList.contains("open")) {
          postPontent.classList.remove("open")
        } else {
          postPontent.classList.add("open")
        }
      }



  })





    if (window.innerWidth <= 842) {
        const postCont = main.querySelectorAll(".post-content")
        for(const p of postCont){
            p.classList.add('open')
        }
    }

    const modal = document.getElementById("modal")
    const span = document.getElementsByClassName("close_modal_window")[0]
    const list = document.querySelectorAll("ol li span.dotted")

    for (const l of list) {
      l.onclick = function () {
        modal.style.display = "block"
      }
    }

    span.onclick = function () {
      modal.style.display = "none"
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none"
      }
    }


    const form = document.getElementsByTagName("form")[0]
    const email = document.getElementById("input-mail")
    const name = document.getElementById("input-name")
    const emailError = document.querySelector("#input-mail + span.error")

    const inputCross = form.querySelectorAll(".cross")

    for (const cross of inputCross) {
      cross.addEventListener("click", function (e) {
        const tInput = event.target.nextElementSibling
        tInput.value = ""
        clearError(tInput.getAttribute("type"))
      })
    }

    email.addEventListener("input", function (event) {
      if (email.validity.valid) {
        clearError("email")
      } else {
        showError("email")
      }
    })

    function clearError(type = "email") {
      if (type === "email") {
        emailError.textContent = ""
        emailError.className = "error"
        email.closest(".form-control").classList.remove("invalid")
      }
    }

    form.addEventListener("submit", function (event) {
      // Если поле email валдно, позволяем форме отправляться
      if (!email.validity.valid) {
        // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
        showError("email")
        // Затем предотвращаем стандартное событие отправки формы
        event.preventDefault()
      }
    })

        function clearError(type = "email") {
          if (type === "email") {
            emailError.textContent = ""
            emailError.className = "error"
            email.closest(".form-control").classList.remove("invalid")
          }
        }

        form.addEventListener("submit", function (event) {
          // Если поле email валдно, позволяем форме отправляться
          if (!email.validity.valid) {
            // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
            showError("email")
            // Затем предотвращаем стандартное событие отправки формы
            event.preventDefault()
          }
        })

        function showError(type) {
          if (type === "email") {
            if (email.validity.valueMissing) {
              // Если поле пустое,
              emailError.textContent = "You need to enter an e-mail address."
            } else if (email.validity.typeMismatch) {
              // Если поле содержит не email-адрес,
              emailError.textContent =
                "Entered value needs to be an e-mail address."
            } else if (email.validity.tooShort) {
              // Если содержимое слишком короткое,
              emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`
            }
            emailError.className = "error  arrow active"
            email.closest(".form-control").classList.add("invalid")
          }
        }



})



