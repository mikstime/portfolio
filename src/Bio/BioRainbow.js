import React, { Component, Fragment } from 'react'
import { Layer, Tool } from 'react-paper-bindings'
import uuid from 'uuid/v4'
import Fact from './Fact'

import AnimationWrapper from './AnimationWrapper'
import testData from './BioTemplate.json'

import {AnimatedAboutMe} from './AboutMeButton'
//@TODO Fix animations
//@TODO Fix letters om low res screens

const AboutMe = ({x, y, radius}) => (
    <Layer>
            <Fact
                onClick ={(e) => {
                    this.togglePulse()
                    this.toggleAbout()
                }}
                color='#DE59FF'
                title={'About Me'}
                radius={radius}
                center={[x, y]}
            />
    </Layer>
)
class Chain extends Component {

    state = {
        mounted : false
    }

    componentWillMount() {
        this.props.setupAnimation({
            type : "linear-looped",
            startState : {
                x : 400, y : 400,
                pulsarRadius : 100
            },
            numberOfSteps : 30,
            endState : {
                x : 100, y : 100,
                pulsarRadius : 600
            }
        })
    }

    componentDidMount() {
        this.props.startAnimation()
        this.setState({mounted : true})
    }
    componentWillUnmount() {
        this.setState(
            {mounted : false}
        )
    }

    render() {
        const {x, y, pulsarRadius} = this.props
        return(
            <Fragment>
                <AnimatedAboutMe/>
            </Fragment>
        )
    }
}

export default AnimationWrapper(Chain)