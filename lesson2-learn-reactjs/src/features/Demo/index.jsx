import React from 'react';
import PropTypes from 'prop-types';

DemoJSX.propTypes = {

};

function DemoJSX(props) {
    const name = 'Ken';
    const age = 22;
    const isMale = true;
    const student = {
        name: 'Ken'
    }
    const colorList = ['red', 'green', 'blue']
    return (
        <div>
            <p>Xin chao {name} - {age} - {isMale ? 'Male' : 'Female'}</p>

            {isMale ? <p>Male</p> : <p>Female</p>}

            {isMale && <p>Male</p>}
            {!isMale && <p>Female</p>}

            {isMale && (
                <div>
                    <p>Male 1</p>
                    <p>Male 2</p>
                </div>
            )}

            {isMale && (
                <React.Fragment>
                    <p>Male 3</p>
                    <p>Male 4</p>
                </React.Fragment>
            )}

            {isMale && (
                <>
                    <p>Male 5</p>
                    <p>Male 6</p>
                </>
            )}

            <p>{student.name}</p>

            <ul>
                {colorList.map((color, index) => (
                    <li key={index} style={{ color }}>{color}</li>
                ))}
            </ul>
        </div>
    );
}

export default DemoJSX;