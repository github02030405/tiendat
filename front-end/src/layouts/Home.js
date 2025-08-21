import React, { useEffect, useState } from 'react'
import Slider from '../pages/home/Slider'
import Deal from '../pages/home/Deal';
import Apparel from '../pages/home/Apparel';
import Items from '../pages/home/Items';
import { GET_ALL } from '../api/apiService';
import Electronics from '../pages/home/Electronics';
import Subscribe from '../pages/home/Subcribe';

function Home(){
    const [categories, setCategories] = useState([]);
            useEffect(() => {
            GET_ALL(`categories`).then((item) => setCategories(item.data));
            }, []);
            const filteredCategories = categories.filter(
            (category) => category.isHome === 1
            );
    return (
        <div class="container">
            <Slider/>
            <Deal/>
            <Apparel/>
            {/* {filteredCategories.length > 0 &&
                filteredCategories.map((row) => (
                    <Items categoryName={row.name} categoryId={row.id} />
                ))} */}
            <Items  />
            <Electronics />
           <Subscribe/>
        </div>
    );
}
export default Home;