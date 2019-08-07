import React, { Component, Fragment } from 'react'
import uuid from 'uuid/v4'
import { Layer, Line, Circle, Rectangle, PointText } from 'react-paper-bindings'


const Connection = (props) => {

    const angle = props.angle || 0
    const radius = props.radius || 60
    const length = props.length || 30
    const borderWidth = props.border || 1.5
    const posX = (props.point && props.point[0]) || 0
    const posY = (props.point && props.point[1]) || 0

    const coefX = Math.cos(angle)
    const coefY = Math.sin(angle)

    const startX = posX + (radius + borderWidth) * coefX
    const startY = posY + (radius + borderWidth) * coefY

    const endX = startX + length * coefX
    const endY = startY + length * coefY

    const width = props.width || 12
    return(
        <Fragment>
            <Line
                from={[startX, startY]}
                strokeColor='red'
                strokeWidth={width}
                to={[endX, endY]}/>
            <Line
                from={[startX, startY]}
                strokeWidth={width - 4}
                strokeColor='white'
                to={[endX, endY]}/>
        </Fragment>
    )
}
class Fact extends Component {

    computeTextStyle = (type) => {
        const baseStyle = {
            fillColor : 'black',
            justification : 'center',
        }
        switch ( type ) {
            case 'h3' : return {
                ...baseStyle,
                fontSize : 20,
                fontFamily : 'Arial',
                fontWeight : 'bold',
            }
            case 'p' : return {
                ...baseStyle,
                fontSize: 16,
                fontFamily : 'Arial',
                fontWeight : 'normal',
            }
        }
    }
    render() {

        const posX = this.props.point[0] || 0
        const posY = this.props.point[1] || 0
        const radius = this.props.radius || 60
        const conWidth = this.props.conWidth || 10
        let offset = 0

        return(
            <Fragment>
                <Circle
                    radius={radius}
                    strokeColor='red'
                    strokeWidth={radius / 20}
                    fillColor='white'
                    center={[posX, posY + radius / 2]}
                />
                {
                    this.props.content && this.props.content.map(
                        (content) => {
                            const style = this.computeTextStyle(content[0])
                            offset += style.fontSize + 8 // 8px between text lines
                            style.point = [posX, posY + offset]

                            return(<PointText
                                key={uuid()}
                                {...style}
                                content={content[1]}
                            />)
                        }
                    )
                }
                {/*normalize position*/}
                <Connection borderWidth={radius / 20 / 2} angle={0} radius={radius} width={conWidth} point={[posX, posY + radius / 2]}/>
            </Fragment>

        )
    }
}

export default Fact