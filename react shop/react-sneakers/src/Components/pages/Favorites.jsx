import Card from "../Card";

function Favorites({ items, onAddToFavorite } ) {
	return (
		<div className="container">
			<div className="container-row">
				<h1>Мои закладки</h1>
			</div>
			<div className="card-flex">
			{items.map((item, index) => (  /*Поиск по Названию */
					<Card
						key={index}
						id={items.id}
						title={item.title}
						price={item.price}
						imageUrl={item.imageUrl}
						favorited={true}
						onFavorite={onAddToFavorite}
					/> 
				))}
		</div>
	</div>
	)
}

export default Favorites;