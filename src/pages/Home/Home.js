import React, { useContext } from 'react';
import { AssortmentItem } from '../../Components/AssortmentItem/AssortmentItem.js';
import { Store } from '../../Store.js';

const AssortmentGoods = () => {
	const [store, dispatch] = useContext(Store);
	return (
		<>
			<div className='assortments'>
				<div className='assortments__inner'>
					{store.productsList.map((item, index) => (
						<AssortmentItem
							key={item.id}
							productItem={item}
							index={index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

function Home() {
	return (
		<div className='home'>
			<h1 className='home__title'>Доступные товары</h1>
			<AssortmentGoods />
		</div>
	);
}

export { Home };
