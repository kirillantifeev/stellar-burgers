import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUser } from '../../slices/authSlice';
import { AppDispatch, useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { ProtectedRoute } from '../protected-route';
import { getIngredients } from '../../slices/ingredientsSlice';

const App: React.FC = () => {
  const location = useLocation();
  //const backgroundLocation = location.state?.backgroundLocation;
  const backgroundLocation = location.state?.background;

  const navigate = useNavigate();

  const handleOpenModal = (ingredient: TIngredient) => {};

  const handleCloseModal = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />

        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>

      {/* Отображаем модальные окна только если есть backgroundLocation */}
      {backgroundLocation && (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={'Детали заказа'} onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={handleCloseModal}>
                  <IngredientDetails />
                </Modal>
              }
            />

            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={'Детали заказа'} onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
