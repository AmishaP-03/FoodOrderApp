import {currencyFormatter} from '../utils/formatting.js';
import Button from './Button.jsx';

export default function MealItem({mealItem}) {
    return <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${mealItem.image}`} alt={mealItem.name}></img>
            <div>
                <h3>{mealItem.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(mealItem.price)}</p>
                <p className="meal-item-description">{mealItem.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button>Add to cart</Button>
            </p>
        </article>
    </li>
}