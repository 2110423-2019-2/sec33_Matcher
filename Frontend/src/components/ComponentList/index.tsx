import React, { Fragment } from 'react';
import { Button } from '..';
import './index.scss';
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';

const ColorDot = ({ color = "#EEE", alt }: any) => <div className="row">
    <div
        className="circle"
        style={{ backgroundColor: color }}
    />
    <div className="row center">
        <p>{color}</p>
    </div>
    <div className="row center">
        <code>${alt}</code>
    </div>
</div>

export default () => <div className="container">
    <div className="row">
        <h1>Matcher's Style Guideline</h1>
    </div>
    <div className="row">
        <h2>Color</h2>
        <div className="col-2"><ColorDot color="#00577F" alt="color-primary" /></div>
        <div className="col-2"><ColorDot color="#F67280" alt="color-secondary" /></div>
        <div className="col-2"><ColorDot color="#F8B195" alt="color-ternary" /></div>
        <div className="col-2"><ColorDot color="#C06C84" alt="color-rose" /></div>
        <div className="col-2"><ColorDot color="#F6F6F6" alt="color-white" /></div>
        <div className="col-2"><ColorDot color="#555555" alt="color-dark" /></div>
    </div>
    <div>
        <h2>Button</h2>
        <Button>Button Filled</Button>
        <Button type="outlined">Button Outlined</Button>
        <Button>Button Icon <Chevron style={{ strokeWidth: 1 }} /></Button>
    </div>
</div>
