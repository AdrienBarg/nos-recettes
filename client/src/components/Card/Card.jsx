import './card.scss'
import { smallChef } from '../../assets'

const Card = ({ item, index, bookmarks }) => {


    if (bookmarks) {
        return (
            <div className="bookWrapper bookmarks" key={index}>
                <p>{item.title} </p>
                <div>
                    <span class="author">{item.author} </span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="bookWrapper" key={index}>
                <div className='picture'>
                    <img src={smallChef} alt="" />
                </div>
                <p>{item.title} </p>
            </div>
        )
    }
}

export default Card