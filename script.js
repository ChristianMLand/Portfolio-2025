
const form = document.querySelector("form")
form.addEventListener("submit", e => {
    e.preventDefault()
    const subject = form.querySelector("input[type=text]")
    const body = form.querySelector("textarea")
    location.href = `mailto:christianmland@outlook.com?subject=${subject.value}&body=${body.value}`;
    location.href="#contact"
})