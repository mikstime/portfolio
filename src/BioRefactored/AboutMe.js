import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Layer, View } from 'react-paper-bindings'

import AnimationWrapper from '../AnimationWrapper'
import ColoredCircle from './ColoredCircle'

import scroll from 'scroll'
import doc from 'scroll-doc'

const page = doc() // look at onAnimationEnd method

class AboutMe extends Component {

    static propTypes = {
        descriptor : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
        setupAnimation : PropTypes.func.isRequired,
        startAnimation : PropTypes.func.isRequired,
        endAnimation : PropTypes.func.isRequired,
        // x : PropTypes.number.isRequired,
        // y : PropTypes.number.isRequired,
        // radius : PropTypes.number.isRequired,
        // infoRadius : PropTypes.number.isRequired
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
            document.body.classList.add('unscrollable')
            this.swapAnimation()
            const options = { duration: 500 }
            if(this.cancel1) {
                this.cancel1()
                this.cancel1 = false
            }
            this.cancel = scroll.top(page, 0, options)
            const remove = () => {
                this.cancel()
                page.removeEventListener('wheel', remove)
            }
        }

        if( animationList[currentAnimation] === "onClickAnimation") {
            document.body.classList.remove('unscrollable')
            const el = document.getElementById('circles')
            if(el)
                el.classList.remove('circles-hidden')
            if(this.cancel) {
                this.cancel()
                this.cancel = false
            }
            setTimeout(
                () => {
                    const options = { duration: 1000 }
                    this.cancel1 = scroll.top(page, 700, options)
                }, 1000
            )
        }
    }
    swapAnimation = () => {

        this.setState(state => ({
            currentAnimation : (state.currentAnimation + 1) % (state.animationList.length),
        }), this.startAnimation)

    }
    componentDidMount() {
        document.body.classList.add('unscrollable')
        this.startAnimation()
    }

    render() {
        const {x, y, radius, infoRadius, descriptor} = this.props
        console.log(x && y && radius && infoRadius )
        return(
            <Fragment>
                <View onClick={this.swapAnimation} width={this.props.widthC} height={this.props.heightC}>
                    <Layer>
                        {radius && descriptor.map((item, id) => (
                            <ColoredCircle key={ item.id }
                                  center={ [ x, y ] }
                                  onClick={ this.swapAnimation }
                                  radius={ radius + infoRadius * (descriptor.length - 1) - (id) * infoRadius }
                                  color={item.color}
                            />))
                        }
                    </Layer>
                </View>
                {this.props.children}
                <View onClick={this.swapAnimation} width={this.props.widthC} height={this.props.heightC}>
                    <Layer>
                        {radius &&
                        <ColoredCircle
                            color='#DE59FF'
                            radius={ radius - infoRadius }
                            center={ [ x, y ] }
                        />
                        }
                    </Layer>
                </View>
            </Fragment>
        )
    }
}

export default AboutMe
export const AnimatedAboutMe = AnimationWrapper(AboutMe)