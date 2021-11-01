import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Cart } from '../../assets/icons/cart.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { Store } from '../../Store';
import '../../index.scss';

function Header() {
	const [store, dispatch] = useContext(Store);
	const counterProductsInCart = store.currentItemsList.length;
	return (
		<>
			<header className='header'>
				<nav className='nav'>
					<div className='nav__item'>
						<Link to='/main' className='nav__link'>
							<HomeIcon className='icon icon__home' />
						</Link>
					</div>
					<div className='nav__item nav__item--right'>
						<Link to='/cart' className='nav__link'>
							<Cart className='icon icon__cart' />
						</Link>
						<span className='nav__counter'>
							{counterProductsInCart}
						</span>
					</div>
				</nav>
			</header>
		</>
	);
}

export { Header };
