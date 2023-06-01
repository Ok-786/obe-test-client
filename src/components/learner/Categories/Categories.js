import React, { useEffect, useState } from 'react'
import Carousel from './Carousel/Carousel.js'
import './Categories.css';
import Logo from '../../../utils/assets/cat.png';
import Laptop from '../../../utils/assets/cat.png';
import Cars from '../../../utils/assets/cat.png';
import Bike from '../../../utils/assets/cat.png';
import Shirt from '../../../utils/assets/cat.png';
import Xbox from '../../../utils/assets/cat.png';
import Pet from '../../../utils/assets/cat.png';
import Decoration from '../../../utils/assets/cat.png';

export default function Categories({ setCategory }) {
    const [items, setItems] = useState(['All', 'Programming', 'Web', 'Software', 'Mobile', 'AI', 'Game', 'Design',])
    const images = [Decoration, Logo, Laptop, Cars, Bike, Shirt, Xbox, Pet]
    const colors = ['#f3851e', '#f3851e', '#f3851e', '#f3851e', '#f3851e', '#f3851e', '#f3851e', '#f3851e', '#f3851e']

    // useEffect(() => {
    //     setItems(items.sort())
    // }, [])

    const setting = {
        dragSpeed: 1.25,
    }

    return (
        <>
            <div className={'pattern1'}></div>
            <div className={'pattern2'}></div>
            <div className='container'>
                <br />
                <br />
                <h1>Categories</h1>
                <br />
                <Carousel _data={items} {...setting}>
                    {
                        items.map((i, index) => (
                            <div className={'card-container'} onClick={() => setCategory(i)}>
                                <div
                                    key={index}
                                    className={'card'}
                                    style={{ background: colors[index] }}
                                >
                                    <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '-1vh' }}>
                                        <img src={images[index]} width='100vh' height="100vh" alt={i} />
                                    </div>
                                </div>
                                <p>{i}</p>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </>
    )
}
