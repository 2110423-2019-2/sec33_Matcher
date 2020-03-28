import React from 'react';
import './index.scss';
import { VerticalCard } from "../../components";
import graduation from '../../assets/vcard/graduation.svg';
import wedding from '../../assets/vcard/wedding.svg';
import event from '../../assets/vcard/event.svg';
import product from '../../assets/vcard/product.svg';
import place from '../../assets/vcard/place.svg';
import cafe from '../../assets/vcard/cafe.svg';

export default () => {
    const categoryCards = [
        {
            src: graduation,
            alt: 'Graduation',
            text: 'Graduation',
        },
        {
            src: wedding,
            alt: 'Wedding',
            text: 'Wedding',
        },
        {
            src: event,
            alt: 'Event',
            text: 'Event',
        },
        {
            src: product,
            alt: 'Product',
            text: 'Product',
        },
        {
            src: place,
            alt: 'Place',
            text: 'Place',
        },
        {
            src: cafe,
            alt: 'Café & Restaurant',
            text: 'Café & Restaurant',
        },
    ];

    return (
        <div className="photoTypes subHeader">
            <h5>Photo types</h5>
            <div className="row center">
                {categoryCards.slice(0, 3).map(({ src, alt, text }, index) => (
                    <div className="col-4" style={{ marginTop: 50 * (2 - index) }}>
                        <VerticalCard src={src} alt={alt} text={text} />
                    </div>
                ))}
            </div>
            <div className="row center">
                {categoryCards.slice(3, 6).map(({ src, alt, text }, index) => (
                    <div className="col-4" style={{ marginTop: 50 * (2 - index) }}>
                        <VerticalCard src={src} alt={alt} text={text} />
                    </div>
                ))}
            </div>
        </div>
    );
};
