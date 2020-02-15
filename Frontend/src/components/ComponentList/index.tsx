import React from 'react';
import { Button, VerticalCard, TaskCard } from '..';
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

export default () => <div className="row center">
    <div className="row">
        <h1>Matcher's Style Guideline</h1>
    </div>
    <h3>Color</h3>
    <div className="row center">
        <div className="col-2"><ColorDot color="#00577F" alt="color-primary" /></div>
        <div className="col-2"><ColorDot color="#F67280" alt="color-secondary" /></div>
        <div className="col-2"><ColorDot color="#F8B195" alt="color-ternary" /></div>
        <div className="col-2"><ColorDot color="#C06C84" alt="color-rose" /></div>
        <div className="col-2"><ColorDot color="#F6F6F6" alt="color-white" /></div>
        <div className="col-2"><ColorDot color="#555555" alt="color-dark" /></div>
    </div>
    <h3>Button</h3>
    <div className="row center">
        <div className="col-4">
            <Button>Button Filled</Button>
            <br /><br />
            <code>{'<Button />'}</code>
        </div>
        <div className="col-4">
            <Button type="outlined">Button Outlined</Button>
            <br /><br />
            <code>{'<Button type="outlined" />'}</code>
        </div>
        <div className="col-4">
            <Button>Button Icon <Chevron style={{ strokeWidth: 1 }} /></Button>
            <br /><br />
            <code>{'<Button type="filled" />'}</code>
        </div>
    </div>
    <h3>Link</h3>
    <div className="row center">
        <div style={{ width: '60%', margin: 'auto' }}>
            <div className="row center">
                <div className="col-4">
                    <a href="/#">Link Normal</a>
                </div>
                <div className="col-4">
                    <a href="/#" className="linkHover">Link Hover</a>
                </div>
                <div className="col-4">
                    <a href="/#" className="linkClick">Link Active</a>
                </div>
            </div>
        </div>

    </div>
    <h3>Card</h3>
    <h4>Vertical Card</h4>
    <div className="row center">
        <div className="col-4">
            <VerticalCard />
            <br /><br />
            <code>{'<VerticalCard />'}</code>
        </div>
        <div className="col-4">
            <VerticalCard src="https://i.picsum.photos/id/696/280/330.jpg" text="Random Image" />
            <br /><br />
            <code>{'<VerticalCard text="Random Image" />'}</code>
        </div>
        <div className="col-4">
            <VerticalCard src="/images/type-product.png" alt="product" text="Product" />
            <br /><br />
            <code>{'<VerticalCard'}<br />{'src="/images/type-product.png" />'}</code>
        </div>
    </div>
    <h4>Task Card</h4>
    <div className="row center">
        <div className="col-4">
            <TaskCard />
            <br /><br />
            <code>{'<TaskCard />'}</code>
        </div>
        <div className="col-4">
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" />
            <br /><br />
            <code>{'<TaskCard name="John Doe" location="Siam Paragon" />'}</code>
        </div>
        <div className="col-4">
            <TaskCard thumbnail="https://picsum.photos/200/300" price={300} />
            <br /><br />
            <code>{'<TaskCard thumbnail="..." price={300} />'}</code>
        </div>
    </div>
    <h3>Typography</h3>
    <div className="row center">
        <h1>H1 Content 48px</h1>
        <h2>H2 Content 42px</h2>
        <h3>H3 Content 36px</h3>
        <h4>H4 Content 32px</h4>
        <h5>H5 Content 24px</h5>
        <h6>H6 Content 20px</h6>
        <p>p paragraph 18px</p>
    </div>
</div>
