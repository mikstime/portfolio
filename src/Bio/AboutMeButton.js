import React, { Component, Fragment } from 'react'
import { Layer } from 'react-paper-bindings'
import Fact from './Fact'
import PropTypes from 'prop-types'
import AnimationWrapper from './AnimationWrapper'

class AboutMe extends Component {

    static propTypes = {
        setupAnimation : PropTypes.func.isRequired,
        startAnimation : PropTypes.func.isRequired,
        endAnimation : PropTypes.func.isRequired,
        x : PropTypes.number,
        y : PropTypes.number,
        radius : PropTypes.number
    }

    state = {
        pulsingAnimation : {
            type :"linear-looped",
            startState : {
                x : 500,
                y : 500,
                radius : 300
            },
            endState : {
                x : 500,
                y : 500,
                radius : 315
            },
            numberOfSteps : 13
        },
        onclickAnimation : {
            startState : {
                x : 500,
                y : 500,
                radius : 300
            },
            endState : {
                x : -100,
                y : 600,
                radius : 500
            },
            numberOfSteps : 30
        },
        currentAnimation : 'onclickAnimation'
    }
    componentWillMount() {
        this.props.setupAnimation(
            this.state[this.state.currentAnimation]
        )
        this.props.startAnimation()
    }

    render() {
        const {x, y, radius} = this.props

        return(
            <Layer>
                {radius &&
                    <Fact
                        color='#DE59FF'
                        title={ 'About Me' }
                        radius={ radius }
                        center={ [ x, y ] }
                    />
                }
            </Layer>
        )
    }
}

export default AboutMe
export const AnimatedAboutMe = AnimationWrapper(AboutMe)