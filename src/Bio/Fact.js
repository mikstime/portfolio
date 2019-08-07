import React, { Component, Fragment } from 'react'
import uuid from 'uuid/v4'
import { Layer, Group, Line, Circle, Rectangle, PointText } from 'react-paper-bindings'
import {RED, BLACK, WHITE} from '../CONSTANTS'


const TextBlock = (props) => {

    const {radius, message, style} = props

    let angle = -Math.acos(1 - 1 / 2 * (200 / radius) ** 2) * 180 / Math.PI
    return message.split('').map(
        (letter) => {

            const radAngle = angle / 180 * Math.PI
            const delta = Math.acos( 1 - 1 / 2 * (style.fontSize / 1.3 / radius) ** 2)

            const posX = -200 +radius * Math.cos(radAngle)
            const posY =  250 + radius * Math.sin(radAngle)
            const prevAngle = angle
            angle += delta * 180 / Math.PI
            return(
                <PointText key={uuid()} {...style} justification='center' point={[posX, posY]} content={letter} rotation={90 + angle}/>
            )
        }
    )
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
        bodyStyle.point = [radius - 50, 100 + headerStyle.fontSize / 2]
        headerStyle.point = [radius - 50, 100 - bodyStyle.fontSize / 2]
        return(
            <Fragment>
                <Circle {...circleStyle}/>
                <Group>
                    {body && <TextBlock radius={radius - 100} message={body} style={bodyStyle}/>}
                </Group>
                <Group>
                    {header && <TextBlock align={'top'} radius={radius - 80} message={header} style={headerStyle}/>}
                </Group>
                <Group>
                    {title && <PointText justification='center'  style={titleStyle} point={[200, 350]}content={title}/>}
                </Group>

            </Fragment>
        )
    }
}

export default Fact