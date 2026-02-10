import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo, Modal } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { getUser } from '../../services/user/actions';
import { useDispatch, useSelector } from '../../services/store';
import { Protected } from '../ProtectedRoute/ProtectedRoute';
import { setIsAuthChecked } from '../../services/user/actions';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());

    const token = localStorage.getItem('refreshToken');
    if (token) {
      dispatch(getUser());
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {loading ? (
        <Preloader />
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />

            <Route
              path='/login'
              element={<Protected onlyUnAuth component={<Login />} />}
            />
            <Route
              path='/register'
              element={<Protected onlyUnAuth component={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={<Protected onlyUnAuth component={<ForgotPassword />} />}
            />
            <Route
              path='/reset-password'
              element={<Protected onlyUnAuth component={<ResetPassword />} />}
            />

            <Route
              path='/profile'
              element={<Protected component={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<Protected component={<ProfileOrders />} />}
            />
            <Route
              path='/profile/orders/:number'
              element={<Protected component={<OrderInfo />} />}
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleBack}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:number'
                element={
                  <Modal title='' onClose={handleBack}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Protected
                    component={
                      <Modal title='' onClose={handleBack}>
                        <OrderInfo />
                      </Modal>
                    }
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
