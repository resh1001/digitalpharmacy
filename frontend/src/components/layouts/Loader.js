/*export default function Loader() {
    return (
        <div className="fa fa-spinner fa-pulse fa-3x fa-fw"></div>
    )
} */
import React from 'react';
import './loader.css'; // Import the CSS file containing loader styles

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="loader-spinner">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
        </div>
    );
}
