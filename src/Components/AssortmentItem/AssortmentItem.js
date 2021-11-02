import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Store } from '../../Store';

const AssortmentItem = ({ productItem, index }) => {
	const [store, dispatch] = useContext(Store);
	const [blocked, setBlocked] = useState(false);

	useEffect(() => {
		if (
			store.currentItemsList.find(
				(elem) => elem.id + 1 === productItem.id
			)
		) {
			setBlocked(true);
		}
	}, []);
	const formattedString =
		productItem.name[0].toUpperCase() + productItem.name.slice(1);

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
				productItem.discount
					? 'assortments__item discount '
					: 'assortments__item'
			}
		>
			<div className='assortments__card'>
				<h3 className='assortments__title'>
					Название: {formattedString}
				</h3>
				<div className='assortments__description'></div>
				<p className='assortments__price'>
					Стоимость: {productItem.price}$
				</p>
				<button
					disabled={blocked && true}
					onClick={() =>
						addItemToCart(productItem.name, productItem.price)
					}
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

export { AssortmentItem };
