export const flipVisibility = (clazz) => {
  let e = document.getElementsByClassName(clazz)[0].classList
  e.value.includes('hide') ? e.remove('hide') : e.add('hide')
}