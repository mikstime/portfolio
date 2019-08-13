import React, { Component, Fragment } from 'react'

class RoundText extends Component {
    render() {
        const {x, y, path, text, title, style, ...rest} = this.props
        console.log(x, y)
        return(
            <Fragment>
                {text && <text className='body' {...rest} textLength="2000" style={style}>
                    <textPath xlinkHref={path}>{text}</textPath>
                </text>}
                {title &&
                <text className='title' textAnchor="middle" x={x} y={y}>{title}</text>}
            </Fragment>
        )
    }
}
export default RoundText