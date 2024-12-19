import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIngredients,
  selectIngredients
} from '../../slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */

  const { id } = useParams(); // Извлечь ID из URL
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
