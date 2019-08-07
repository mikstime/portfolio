import React, {Component} from 'react'
import { Layer, Tool } from 'react-paper-bindings'
import uuid from 'uuid/v4'
import Fact from './Fact'

import testData from './BioTemplate.json'
import { View } from 'react-paper-bindings'

//@TODO improve animation on return
class Chain extends Component {

    state = {
        isPulsing : true,
        _expanding : true,
        animStart : {
            x : this.props.width / 2,
            y : this.props.height / 2,
            deltaRadius : 0,
            pulsarRadius : this.props.width > this.props.height ?
                this.props.height / 3 : this.props.width / 3,
        },
        animEnd : {
            x : -this.props.width / 3,
            y : this.props.height / 2,
            pulsarRadius : this.props.width > this.props.height ?
                this.props.height / 2 : this.props.width / 2,
            deltaRadius : this.props.width / 6,
            radius : this.props.width / 2,
        },
        x : this.props.width / 2,
        y : this.props.height / 2,
        radius : this.props.width / 5,
        deltaRadius : 0,
        pulsarRadius : this.props.width > this.props.height ?
            this.props.height / 3 : this.props.width / 3,
        isToggling : true
    }

    componentDidMount() {
        requestAnimationFrame(
            () => {
                this.pulseAnimation()
            }
        )
    }
    computeMinAndMaxSize = () => {
        const {width, height} =  this.props
        if(height > width) {
            return {
                minSize : width / 3,
                maxSize : width / 3 + 7
            }
        } else {
            return {
                minSize : height / 3,
                maxSize : height / 3 + 7
            }
        }
    }
    togglePulse() {
        this.setState(
            old => (
                {isPulsing : !old.isPulsing}), () => requestAnimationFrame(this.pulseAnimation)
            )
    }
    pulseAnimation = () => {

        const {isPulsing} = this.state

        if(isPulsing) {
            this.setState(
                (old) => {
                    const {minSize, maxSize} = this.computeMinAndMaxSize()
                    const {pulsarRadius, _expanding } = old
                    const linearStep = this.getLinearStep(minSize,
                        maxSize, 30)
                    let willExpand = old._expanding
                    if((pulsarRadius < minSize && !_expanding) ||
                        (pulsarRadius > maxSize && _expanding)) {
                        willExpand = !willExpand
                    }
                    const direction = willExpand ? 1 : -1
                    return {
                        pulsarRadius : old.pulsarRadius +
                            direction * linearStep,
                        _expanding : willExpand
                    }

                }, () => {
                    requestAnimationFrame(this.pulseAnimation)
                }
            )
        }
    }
    outOfRange(start, end, value) {
        if(start > end) {
            return this.outOfRange(end, start, value)
        }
        return value < start || value > end
    }
    getLinearStep = (start, end, steps) => {
        return (end - start) / steps
    }
    toggleAbout = () => {
        const start = this.state.animStart
        const end =  this.state.animEnd
        const steps = {}
        for(let key of Object.keys(start)) {
            steps[key] = this.getLinearStep(start[key], end[key], 30)
        }
        this.setState(
            (oldState) => {
                const newState = {...oldState}
                for(let key of Object.keys(steps)) {
                    newState[key] = oldState[key] + steps[key]
                    if(this.outOfRange(start[key],end[key], newState[key])) {
                        newState[key] = end[key]
                    }
                }
                console.log(1)
                return newState
            },
            ()  => {
                for(let key of Object.keys(end)) {
                    if(this.state[key] !== end[key]) {
                        requestAnimationFrame(this.toggleAbout)
                        return
                    }
                }
                this.setState((state) => (
                    {...state, animEnd : state.animStart, animStart : state.animEnd}
                ))
            }
        )
    }
    render() {
        const { x, y, radius, deltaRadius, pulsarRadius, isPulsing } = this.state
        return(
            <Layer>
                <Tool
                    onMouseDrag = {this.props.onDrag}
                    onMouseUp={this.props.onUp}
                />
                {
                    <Fact
                        zIndex={2}
                        onClick ={() => {
                            this.togglePulse()
                            this.setState(
                                (old) => ({
                                    animStart : {
                                        x : old.x,
                                        y : old.y,
                                        pulsarRadius : this.props.width / 3,
                                        deltaRadius : old.deltaRadius,
                                        radius : old.radius,
                                    }
                                })
                            )
                            requestAnimationFrame(this.toggleAbout)
                        }}
                        color='#DE59FF'
                        title={'About Me'}
                        radius={pulsarRadius}
                        center={[x, y]}
                    />
                }
                {
                    !isPulsing && testData
                        .map((descr, id) =>(
                            <Fact key={uuid()}
                                  center={[x, y]}
                                  showText={!this.state.isToggling}
                                  onClick ={() => {
                                      this.togglePulse()
                                      this.setState(
                                          (old) => ({
                                              animStart : {
                                                  x : old.x,
                                                  y : old.y,
                                                  pulsarRadius : this.props.width / 3,
                                                  deltaRadius : old.deltaRadius,
                                                  radius : old.radius,
                                              }
                                          })
                                      )
                                      requestAnimationFrame(this.toggleAbout)
                                  }}
                                  radius={radius + deltaRadius *
                                    (testData.length - 1) - (id) *
                                    deltaRadius / 3 * 2 }
                                  {...descr}
                            />
                        )
                    )
                }
            </Layer>
        )
    }
}

export default Chain