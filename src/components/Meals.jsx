import { useEffect, useState } from "react";

export default function Meals() {
    // State to manage the fetched meals
    const [fetchedMeals, updateFetchedMeals] = useState([]);

    // To avoid infinite loops, we will call the getMeals function from inside useEffecr hook

    /**
     * We could have defined the getMeals function outside and just call it from inside useEffect. But then, getMeals would have to be
     * added as a dependency (since useEffect would consist of something which is defined outside of it). And getMeals func definition would
     * have to be wrapped inside useCallback to make sure it is not re defined everytime a component loads, and thus prevent useEffect from
     * executing again and again. This would be too much work.
     * 
     * Easy way - remove this dependency on externally defined function by defining it inside useEffect itself.
     */
    useEffect(() => {
        // Fetch the offered meals from backend
        async function getMeals() {
            const response = await fetch('http://localhost:3000/meals');

            if (!response.ok) {
                // Error handling
            }

            const meals = await response.json();

            // Update the backend response in state as soon as we have it.
            // This will re render the component with the updated list of offered meals
            updateFetchedMeals(meals);
        }

        getMeals();
    }, []);

    return (
        <ul id="meals">
            {fetchedMeals.map((fetchedMeal) => 
                (<li key="fetchedMeals.id">{fetchedMeal.name}</li>)
            )}
        </ul>
    )
}