import Header from './Components/Header';
import { Route } from "react-router-dom";
import AsideShadow from './Components/AsideShadow';
import React from 'react';
import axios from 'axios';
import Card from './Components/Card'
import Favorites from './Components/pages/Favorites';
import AppContext from './Components/pages/context';



function App() {
	const [items, setItems] = React.useState([]); 
	const [cartItems, setCartItems] = React.useState([]); /* Добавляем товар в корзину */ 
	const [favorite, setFavorite] = React.useState([]);  /* Добавляем в избраное */ 
	const [searchValue, setSearchValue] = React.useState('');  /* Поиск по title*/
	const [cartOpened, setCartOpened] = React.useState(false);  /* Открываем и закрываем Корзину */

	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get('https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart');    // res - сразу хранит в себе массив без перевода в json(axios)
			const favoritesResponse = await axios.get('https://62abab0dbd0e5d29af13d0c5.mockapi.io/favorites');
			const itemsResponse = await axios.get('https://62abab0dbd0e5d29af13d0c5.mockapi.io/items');
		

			setCartItems(cartResponse.data);
			setFavorite(favoritesResponse.data);
			setItems(itemsResponse.data);
		}
		fetchData();
	}, []);  /* Берем массив из бекенда */

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};
	
	const onAddToCart = (obj) => {
		if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
			setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
		} else {
			axios.post('https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart', obj);
			setCartItems([...cartItems, obj])
		}
		
	};

	const onAddToFavorite =  (obj) => {    // почему-то не удаляются запросы с бекенда -_-
		if (favorite.find(fobj => fobj.id === obj.id)) {
			axios.delete(`https://62abab0dbd0e5d29af13d0c5.mockapi.io/favorites/${obj.id}`);
			setFavorite((prev) => prev.filter((item) => item.id !== obj.id));
		} else {
			axios.post('https://62abab0dbd0e5d29af13d0c5.mockapi.io/favorites', obj);
			setFavorite((prev) => [...prev, obj]);
		}
	 };

	const onRemoveItem = (id) => {
		axios.delete(`https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart/${id}`); //удаляем товар по ID
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	return ( 
		<AppContext.Provider value={{items, cartItems}}>
				<div className="wrapper">
		{cartOpened && <AsideShadow items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
			
		<Header onClickCart={() => setCartOpened(true)} />
			
		<Route path="/" exact>
			<div className="container">
			<div className="container-row">
				<h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
				<div className="search-block">
					<img onClick={() => setSearchValue('')} width={20} height={20} src="https://img.icons8.com/ios/344/search--v1.png" alt="search" />
					<input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/>
				</div>
			</div>
			<div className="card-flex">
				{items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (  /*Поиск по Названию */
					<Card
						key={index}
						id={item.id}
						title={item.title}
						added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
						price={item.price}
						imageUrl={item.imageUrl}
						onFavorite={(obj) => onAddToFavorite(obj)}
						onPlus={(obj) => onAddToCart(obj)}
					/> 
				))}
			</div>
			</div>
		</Route>
			
		<Route path="/Favorites">
			<Favorites items={favorite} onAddToFavorite={onAddToFavorite} />
		</Route>
	</div>
		</AppContext.Provider>
	);
}
 

export default App;



