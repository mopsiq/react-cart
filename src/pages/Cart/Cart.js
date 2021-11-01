import React, { useCallback, useEffect, useContext, useState } from 'react';
import { Store } from '../../Store';

const CartItem = ({ item, id, deleteFunc, addFunc, updateCounterFunc }) => {
	const [store, dispatch] = useContext(Store);
	const findPrice = store.productsList.find(
		(elem) => elem.name === item.name
	);
	const formattedString = item.name[0].toUpperCase() + item.name.slice(1);

	return (
		<>
			<div className='cart__item'>
				<h3 className='cart__name'>Название:{formattedString}</h3>
				<span>Итоговая стоимость: {item.cost}$</span>
				<div className='cart__info'>
					<button
						className='cart__btn'
						onClick={(e) => updateCounterFunc(id, findPrice)}
					>
						-
					</button>
					<span>{item.count}</span>
					<button
						className='cart__btn'
						onClick={(e) => addFunc(id, findPrice)}
					>
						+
					</button>
					<button
						className='cart__closed'
						onClick={() => deleteFunc(id)}
					>
						X
					</button>
				</div>
			</div>
		</>
	);
};

const CartList = () => {
	const [store, dispatch] = useContext(Store);
	const copied = store.currentItemsList;

	const findsIndexex = store.currentItemsList.reduce(
		(acc, val, index) => ({ ...acc, [val.name]: index }),
		{}
	);

	const deleteItem = useCallback((id) => {
		copied.splice(id, 1);
		dispatch({ type: 'NEW_DATA', payload: copied });
	}, []);

	const addCountToItem = useCallback((id, priceId) => {
		const discountCondition = priceId.discount
			? (copied[id].count + 1) % 3 === 0
			: false;
		if (discountCondition) {
			copied[id].cost += priceId.discount;
		} else {
			copied[id].cost += priceId.price;
		}
		copied[id].count += 1;
		dispatch({ type: 'NEW_DATA', payload: copied });
	}, []);

	const deleteCountToItem = useCallback((id, priceId) => {
		const discountCondition = priceId.discount
			? ((copied[id].count - 1) % 3 || (copied[id].count + 1) % 3) &&
			  (copied[id].count % 3 || copied[id].count % 3) === 0
			: false;
		if (discountCondition) {
			copied[id].cost -= priceId.discount;
		} else {
			copied[id].cost -= priceId.price;
		}
		if (copied[id].count - 1 === 0) {
			copied.splice(id, 1);
		} else {
			copied[id].count -= 1;
		}
		dispatch({ type: 'NEW_DATA', payload: copied });
	}, []);

	return (
		<>
			{store.currentItemsList.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					id={findsIndexex[item.name]}
					deleteFunc={deleteItem}
					addFunc={addCountToItem}
					updateCounterFunc={deleteCountToItem}
				/>
			))}
		</>
	);
};

const CartBlock = () => {
	const [store, dispatch] = useContext(Store);
	const finalCost = store.currentItemsList
		.map((item) => item.cost)
		.reduce((acc, val) => (acc += val), 0);

	useEffect(() => {
		localStorage.setItem(
			'userCart',
			JSON.stringify(store.currentItemsList)
		);
		console.log('render');
	}, [store]);
	return (
		<div>
			<div className='cart__subtitle'>
				<p>
					Ваш итоговый список на общую сумму:{' '}
					<span>{finalCost}$</span>
				</p>
			</div>
			<div className='cart__body'>
				<CartList />
			</div>
		</div>
	);
};

function Cart() {
	return (
		<div className='cart'>
			<h1 className='cart__title'>Ваша корзина</h1>
			<CartBlock />
		</div>
	);
}

export { Cart };
