import React, { Component, Fragment } from 'react'
import uuid from 'uuid/v4'
import { Layer, Group, Line, Circle, Rectangle, PointText } from 'react-paper-bindings'
import {RED, BLACK, WHITE} from '../CONSTANTS'


class TextBlock extends Component {

    componentDidMount() {
        const { radius, message, style } = this.props
        let angle = -Math.acos(1 - 1 / 2 * (200 / radius) ** 2) * 180 / Math.PI

        this.letterRefs.forEach(
            (ref) => {

                let  fontSize =  ref.internalBounds.width + 1

                const radAngle = angle / 180 * Math.PI
                const delta = Math.acos(1 - 1 / 2 * (fontSize / radius) ** 2)

                const posX = -200 + radius * Math.cos(radAngle)
                const posY = 250 + radius * Math.sin(radAngle)

                angle += delta * 180 / Math.PI
                ref.rotation = 90 + angle
                ref.bounds.topRight.set(posX, posY)
            }
        )
    }

    letterRefs = []
    render() {
        // generate text.
        // @IMPORTANT SET POSITION USING REFS onComponentDidMount
        const { message, style } = this.props

        return  message.split('').map(
            (letter) => {
                return (
                    <PointText ref={ (r) => (this.letterRefs.push(r)) }
                               key={ uuid() }
                               { ...style }
                               justification='center'
                               content={ letter }
                    />
                )
            })
    }
}
class Fact extends Component {

    render() {

        const {radius = 500, color = RED, header = '', body = '', title =''} = this.props

        const circleStyle = this.props.circleStyle || {
            radius : radius,
            fillColor : color,
            center : [-200, 250]
        }

        const headerStyle = this.props.headerStyle || {
            fillColor : BLACK,
            fontSize : 20,
            rotation : 90,
            fontFamily : 'Blinker',
            fontWeight : 'bold',
        }

        const bodyStyle = this.props.bodyStyle || {
            fillColor : BLACK,
            rotation : 80,
            fontSize: 16,
            fontFamily : 'Blinker',
            fontWeight : 'normal',
        }

        const titleStyle = this.props.headerStyle || {
            fillColor : BLACK,
            rotation : 80,
            fontSize: 48,
            fontFamily : 'Blinker',
            fontWeight : 'normal',
        }
        return(
            <Fragment>
                <Circle {...circleStyle}/>
                <Group>
                    {body && <TextBlock
                        radius={radius - 100}
                        message={body}
                        style={bodyStyle}/>}
                </Group>
                <Group>
                    {header && <TextBlock
                        radius={radius - 80}
                        message={header}
                        style={headerStyle}/>}
                </Group>
                <Group>
                    {title && <PointText
                        justification='center'
                        style={titleStyle}
                        point={[200, 350]}
                        content={title}/>}
                </Group>

            </Fragment>
        )
    }
}

export default Fact