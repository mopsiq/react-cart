import React, { useEffect, useContext } from 'react';
import { Store } from '../../Store';
import { CartList } from '../../Components/CartList/CartList.js';

function Cart() {
	const [store, dispatch] = useContext(Store);
	const finalCost = store.currentItemsList
		.map((item) => item.cost)
		.reduce((acc, val) => (acc += val), 0);

	useEffect(() => {
		localStorage.setItem(
			'userCart',
			JSON.stringify(store.currentItemsList)
		);
	}, [store]);
	return (
		<div className='cart'>
			<div className='cart__header'>
				<h1 className='cart__title'>Ваша корзина</h1>
				<h3 className='cart__subtitle'>
					Ваш итоговый список на общую сумму:
					<span className='cart__cost'>{finalCost}$</span>
				</h3>
			</div>
			<div className='cart__body'>
				<CartList />
			</div>
		</div>
	);
}

export { Cart };
