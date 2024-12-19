import React, { FC, useEffect, useRef } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const refConstructor = useRef<HTMLDivElement | null>(null);
  const refOrders = useRef<HTMLDivElement | null>(null);
  const refProfile = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (refConstructor.current) {
      refConstructor.current.className =
        styles.link +
        (location.pathname === '/' ? ` ${styles.link_active}` : '');
    }
    if (refOrders.current) {
      refOrders.current.className =
        styles.link +
        (location.pathname === '/feed' ? ` ${styles.link_active}` : '');
    }
    if (refProfile.current) {
      refProfile.current.className =
        styles.link +
        (location.pathname === '/profile' ? ` ${styles.link_active}` : '');
    }
  }, [location]);

  const handleNavigateProfile = () => {
    navigate('/profile', { replace: true });
  };

  const handleNavigateConstructor = () => {
    navigate('/', { replace: true });
  };

  const handleNavigateOrders = () => {
    navigate('/feed', { replace: true });
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.menu} p-4`}>
          <div className={styles.menu_part_left}>
            <>
              <div ref={refConstructor} className={`${styles.link}`}>
                <BurgerIcon type={'primary'} />
                <p
                  className={`text text_type_main-default ml-2 mr-10 `}
                  onClick={handleNavigateConstructor}
                >
                  Конструктор
                </p>
              </div>
            </>
            <>
              <div ref={refOrders} className={`${styles.link}`}>
                <ListIcon type={'primary'} />
                <p
                  className={`text text_type_main-default ml-2`}
                  onClick={handleNavigateOrders}
                >
                  Лента заказов
                </p>
              </div>
            </>
          </div>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
          <div
            ref={refProfile}
            className={`${styles.link_position_last} ${styles.link}`}
            onClick={handleNavigateProfile}
          >
            <ProfileIcon type={'primary'} />
            <p className={`text text_type_main-default ml-2`}>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        </nav>
      </header>
    </>
  );
};
