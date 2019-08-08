import React, { Component } from 'react'
import uuid from 'uuid/v4'
import { Layer, Group, Circle, PointText } from 'react-paper-bindings'
import {RED, BLACK} from '../CONSTANTS'
import PropTypes from 'prop-types'


const TWO_NUMBERS = (props, propName) => {
    if (Array.isArray(props[propName]) &&
        props[propName].length === 2 &&
        props[propName].every(Number.isFinite)) {
        return null
    }

    return new Error(`${propName} needs to be an array of two numbers`)
}

const STYLES = {
    body : {
        fillColor : BLACK,
        rotation : 80,
        fontSize: 16,
        fontFamily : 'Blinker',
        fontWeight : 'normal',
    },
    header : {
        fillColor : BLACK,
        fontSize : 20,
        rotation : 90,
        fontFamily : 'Blinker',
        fontWeight : 'bold',
    },
    title : {
        fillColor : BLACK,
        rotation : 80,
        fontSize: 48,
        fontFamily : 'Blinker',
        fontWeight : 'normal',
    }
}
class TextBlock extends Component {

    letterRefs = []

    static propTypes = {
        radius : PropTypes.number.isRequired,
        showRadius : PropTypes.number.isRequired,
        center : TWO_NUMBERS,
    }
    componentDidMount() {
        const { showRadius, radius, center } = this.props
        let angle = -60
        this.letterRefs.forEach(
            (ref) => {
                // show only if needed
                if ( radius >= showRadius ) {
                    // width of each letter
                    let fontSize = ref.internalBounds.width + 1
                    // angle in rad since Math.acos uses radians
                    const radAngle = angle / 180 * Math.PI
                    // angle delta
                    const delta = Math.acos(1 - 1 / 2 * (fontSize / radius) ** 2)
                    // topRight position of current  letter
                    const posX = center[ 0 ] + radius * Math.cos(radAngle)
                    const posY = center[ 1 ] + radius * Math.sin(radAngle)

                    angle += delta * 180 / Math.PI

                    ref.rotation = 90 + angle
                    ref.bounds.topLeft.set(posX, posY)
                }
            }
        )
    }

    render() {
        // @IMPORTANT SET POSITION USING REFS onComponentDidMount
        const { message, style } = this.props

        return(
            message
                .split('')
                .map(
                    (letter) => (
                        <PointText ref={ (r) => (this.letterRefs.push(r)) }
                                   key={ uuid() }
                                   { ...style }
                                   justification='center'
                                   content={ letter }
                        />
                    )
                )
        )
    }
}
class Fact extends Component {

    static propTypes = {
        radius : PropTypes.number.isRequired,
        showRadius : PropTypes.number,
        center : TWO_NUMBERS,
        color : PropTypes.string,
        body : PropTypes.string,
        title : PropTypes.string
    }

    render() {
        const {showRadius = 0, center, radius,
            color = RED, header = '', body = '', title =''} = this.props
        const circleStyle = this.props.circleStyle || {
            radius : radius,
            fillColor : color,
            center : center
        }

        const headerStyle = this.props.headerStyle || STYLES['header']
        const bodyStyle   = this.props.bodyStyle   || STYLES['body']
        const titleStyle  = this.props.headerStyle || STYLES['title']

        return(
            <Layer>
                <Circle onClick={this.props.onClick}{...circleStyle}/>

                    <Group>
                        {body &&
                        <TextBlock
                            radius={ radius - 70 }
                            center={ center }
                            message={ body }
                            showRadius={showRadius - 70}
                            style={ bodyStyle }
                        />
                        }
                    </Group>

                    <Group>
                        { header &&
                            <TextBlock
                                radius={ radius - 50 }
                                center={ center }
                                showRadius={showRadius - 50}
                                message={ header }
                                style={ headerStyle }
                            />
                        }
                    </Group>
                    <Group>
                        { title &&
                            <PointText
                                onClick={this.props.onClick}
                                justification='center'
                                style={ titleStyle }
                                point={ center }
                                content={ title }
                            />
                        }
                    </Group>

            </Layer>
        )
    }
}

export default Fact