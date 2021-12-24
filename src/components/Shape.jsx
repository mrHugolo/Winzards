export const Shape = ({shape}) => {

  return (
    <div className={`shape ${shape?.form} ${shape?.color}`}></div>
  )
}