import React from 'react';
import "./index.scss";

interface VerticalCardProps {
    src?: string
    alt?: string
    text?: string
}

const placeholder = "/images/vertical-placeholder.png"

export default ({ src = placeholder, alt = "placeholder", text = "Card Text" }: VerticalCardProps) => <div>
    <div className="cardWrapper">
        <div style={{ position: 'absolute' }}>
            <div className="cardText">
                {text}
            </div>
        </div>
        <div className="cardFrame">
            <div className="cardPic">
                <img style={{ width: '100%', height: '100%' } }src={src} alt={alt} />
            </div>
        </div>
    </div>
</div>