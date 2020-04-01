import React from 'react';
import './index.scss';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export default ({ title, children }: SectionProps) => {
    return (
        <div className="section">
            <p className="sectionTitle">{title}</p>
            <hr className="sectionLine" />
            <div className="row sectionContent">
                {children ? (
                    React.Children.map(children, child => <div className="col-4">{child}</div>)
                ) : (
                    <h5 className="sectionNoTaskContent">No task to show yet</h5>
                )}
            </div>
        </div>
    );
};
