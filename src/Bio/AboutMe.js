import React, { Component, Fragment } from 'react'
import { Layer } from 'react-paper-bindings'
import Fact from './Fact'
import PropTypes from 'prop-types'
import AnimationWrapper from '../AnimationWrapper'
import testData from './BioTemplate'
import uuid from 'uuid/v4'

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
            type : "linear-looped",
            startState : () => ({
                x : this.props.width / 2,
                y : this.props.height / 2,
                radius : 200,
                infoRadius : 0
            }),
            endState : () => ({
                x : this.props.width / 2,
                y : this.props.height / 2,
                radius : 215,
                infoRadius : 0
            }),
            numberOfSteps : 13
        },
        onClickAnimationReversed : {
            type : "linear",
            startState : {
                x : 100,
                y : 650,
                radius : 300,
                infoRadius : 100
            },
            endState : () => ({
                x : this.props.width / 2,
                y : this.props.height / 2,
                radius : 200,
                infoRadius : 0
            }),
            numberOfSteps : 30
        },
        onClickAnimation : {
            type : "linear",
            startState : () => ({
                x : this.props.width / 2,
                y : this.props.height / 2,
                radius : 200,
                infoRadius : 0
            }),
            endState : {
                x : 100,
                y : 650,
                radius : 300,
                infoRadius : 100
            },
            numberOfSteps : 30
        },
        animationList : [
            "pulsingAnimation",
            "onClickAnimation",
            "onClickAnimationReversed"
        ],
        currentAnimation : 0
    }
    startAnimation = () => {
        const {animationList, currentAnimation} = this.state
        this.props.setupAnimation(
            {
                ...this.state[ animationList[ currentAnimation ] ],
                onAnimationEnd : this.onAnimationEnd
            }
            )
        const el = document.getElementById('circles')
        if(el)
            el.classList.add('circles-hidden')
        this.props.startAnimation()
    }
    onAnimationEnd = () => {
        const {animationList, currentAnimation} = this.state
        if( animationList[currentAnimation] === "onClickAnimationReversed") {
            this.swapAnimation()
        }
        if( animationList[currentAnimation] === "onClickAnimation") {
            const el = document.getElementById('circles')
            if(el)
                el.classList.remove('circles-hidden')
        }
    }
    swapAnimation = () => {
        this.setState(state => ({
            currentAnimation : (state.currentAnimation + 1) % (state.animationList.length),
        }), this.startAnimation)
    }
    componentDidMount() {
        this.startAnimation()
    }

    render() {
        const {x, y, radius, infoRadius} = this.props
        return(
            <Fragment>
            <Layer>
                {infoRadius && testData.map((descr, id) => (
                    <Fact key={ uuid() }
                          center={ [ x, y ] }
                          showRadius={ 300 + 100 * (testData.length - 1) - (id) * 100 - 100 }
                          onClick={ this.swapAnimation }
                          radius={ radius + infoRadius * (testData.length - 1) - (id) * infoRadius }
                          { ...descr }
                    />))
                }
            </Layer>
                <Layer>
                {radius &&
                <Fact
                    onClick={this.swapAnimation}
                    color='#DE59FF'
                    title={ 'About Me' }
                    radius={ radius - infoRadius }
                    center={ [ x, y ] }
                />
                }
            </Layer>
            </Fragment>
        )
    }
}

export default AboutMe
export const AnimatedAboutMe = AnimationWrapper(AboutMe)