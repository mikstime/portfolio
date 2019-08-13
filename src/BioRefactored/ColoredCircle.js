import React, { Component } from 'react'
import { Layer, Circle } from 'react-paper-bindings'
import { RED } from '../CONSTANTS'

import PropTypes from 'prop-types'

const TWO_NUMBERS = (props, propName) => {
    if (Array.isArray(props[propName]) &&
        props[propName].length === 2 &&
        props[propName].every(Number.isFinite)) {
        return null
    }

    return new Error(`${propName} needs to be an array of two numbers`)
}

class ColoredCircle extends Component {

    static propTypes = {
        radius : PropTypes.number.isRequired,
        center : TWO_NUMBERS,
        color : PropTypes.string,
        onClick : PropTypes.func
    }

    render() {
        const { center, radius, color = RED } = this.props
        const circleStyle = this.props.circleStyle || {
            radius, center,
            fillColor : color,
        }

        return(
            <Layer>
                <Circle onClick={this.props.onClick}{...circleStyle}/>
                {this.props.children}
            </Layer>
        )
    }
}

export default ColoredCircle