import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Store } from '../../Store.js';

const ItemCard = ({
	productName,
	productCount,
	productPrice,
	productDiscount,
	index,
}) => {
	const [store, dispatch] = useContext(Store);
	const [blocked, setBlocked] = useState(false);

	useEffect(() => {
		if (store.currentItemsList.find((elem) => elem.name === productName)) {
			setBlocked(true);
		}
	}, []);
	const formattedString = productName[0].toUpperCase() + productName.slice(1);

	const addItemToCart = useCallback((item, cost) => {
		setBlocked(true);
		dispatch({
			type: 'SET_DATA',
			payload: { name: item, cost: cost, id: index, count: 1 },
		});
	}, []);

	return (
		<div
			className={
				productDiscount
					? 'assortments__item discount '
					: 'assortments__item'
			}
		>
			<div className='assortments__card'>
				<h3 className='assortments__title'>
					Название: {formattedString}
				</h3>
				<div className='assortments__description'></div>
				<p className='assortments__price'>Стоимость: {productPrice}$</p>
				<button
					disabled={blocked && true}
					onClick={() => addItemToCart(productName, productPrice)}
					className={
						blocked
							? 'assortments__button blocked'
							: 'assortments__button'
					}
				>
					Купить
				</button>
			</div>
		</div>
	);
};

const AssortmentGoods = () => {
	const [store, dispatch] = useContext(Store);
	return (
		<>
			<div className='assortments'>
				<div className='assortments__inner'>
					{store.productsList.map((item, index) => (
						<ItemCard
							key={item.id}
							productName={item.name}
							productCount={item.count}
							productPrice={item.price}
							productDiscount={item.discount}
							index={index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

const MainPage = () => {
	return (
		<>
			<h1 className='home__title'>Доступные товары</h1>
			<AssortmentGoods />
		</>
	);
};

function Home() {
	return (
		<div className='home'>
			<MainPage />
		</div>
	);
}

export { Home };
