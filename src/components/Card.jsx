import {Shape} from "../components/Shape"

export const Card = ({card, shape}) => {

  const imgSrc = (url) => {
    return `/src/pictures/${url}.png`
  }

  const addShape = () => {
    shape.setShape(shape.shape)
  }

  return(
    <div className="card" onClick={() => addShape()}>     
      <div>
        <div className={`value ${card.card.color}`}>
          {card.card.value}
        </div>          
        <div className="winzard">
          <Shape shape={shape.shape}/>
          <img src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
        </div>
        <div className={`value upSideDown ${card.card.color}`}>
          {card.card.value}
        </div>
      </div>         
    </div>
  )
}