import css from "../cssModules/Main.module.css"

export const Shape = ({shape, cssx}) => {

  return (
    <div className={`${cssx.css.shape} ${cssx.css[shape?.form]} ${css[shape?.color]}`}></div>
  )
}