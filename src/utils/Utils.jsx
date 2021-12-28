import css from "../cssModules/Main.module.css"

export const flipVisibility = (clazz) => {
  let e = document.getElementsByClassName(clazz)[0].classList
  e.value.includes(css.hide) ? e.remove(css.hide) : e.add(css.hide)
}