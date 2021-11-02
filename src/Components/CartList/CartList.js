import React, { useContext, useCallback } from 'react';
import { Store } from '../../Store';
import { CartItem } from '../CartItem/CartItem';

const CartList = () => {
	const [store, dispatch] = useContext(Store);
	const copiedStoreItems = store.currentItemsList;

	const findsIndexex = store.currentItemsList.reduce(
		(acc, val, index) => ({
			...acc,
			[val.name]: index,
		}),
		{}
	);
	const pricesList = store.productsList.reduce(
		(acc, val) => ({
			...acc,
			[val.name]: [val.price, val.discount],
		}),
		{}
	);
	const deleteItem = useCallback((id) => {
		copiedStoreItems.splice(id, 1);
		dispatch({ type: 'NEW_DATA', payload: copiedStoreItems });
	}, []);

	const addCountToItem = useCallback((id, price, discount) => {
		copiedStoreItems[id].count += 1;
		copiedStoreItems[id].count % 3 === 0 && discount
			? (copiedStoreItems[id].cost += discount)
			: (copiedStoreItems[id].cost += price);
		dispatch({ type: 'NEW_DATA', payload: copiedStoreItems });
	}, []);

	const deleteCountToItem = useCallback((id, price, discount) => {
		if (copiedStoreItems[id].count - 1 === 0) {
			copiedStoreItems.splice(id, 1);
			dispatch({ type: 'NEW_DATA', payload: copiedStoreItems });
			return false;
		}
		copiedStoreItems[id].count -= 1;
		(copiedStoreItems[id].count + 1) % 3 === 0 && discount
			? (copiedStoreItems[id].cost -= discount)
			: (copiedStoreItems[id].cost -= price);
		dispatch({ type: 'NEW_DATA', payload: copiedStoreItems });
	}, []);

	return (
		<>
			{store.currentItemsList.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					id={findsIndexex[item.name]}
					price={pricesList[item.name][0]}
					discount={pricesList[item.name][1]}
					deleteFunc={deleteItem}
					addFunc={addCountToItem}
					updateCounterFunc={deleteCountToItem}
				/>
			))}
		</>
	);
};

export { CartList };
