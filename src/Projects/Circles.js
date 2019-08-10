import React, {Component} from 'react'
import './style.sass'
import PropTypes from 'prop-types'
import testData from '../Bio/BioTemplate'
import AnimationWrapper from '../AnimationWrapper'
import Fact from '../Bio/Fact'
import uuid from 'uuid/v4'
const Circle = (props) => {
    const {zIndex, center, radius, color, onClick, isCurrent} = props
    const x = center[0], y = center[1]
    return(
        <div
            onClick={() =>onClick(zIndex)}
            className='circle' style={ {
            width : `${ radius * 2 }px`,
            height : `${ radius * 2 }px`,
            top : `${ -y - radius }px`,
            left : `${ x - radius }px`,
            filter : `brightness(${isCurrent ? 1 : 0.8})`,
            zIndex,
            backgroundColor : color,
            borderRadius : `0 0 ${ radius * 2 }px ${ radius * 2 }px`
        } }>
        </div>
    )
}
Circle.propTypes = {
    color : PropTypes.string.isRequired,

}
class Circles extends Component {

    state = {
        onClickAnimationReversed : {
            type : "linear",
            startState : {
                x : 100,
                y : 50,
                radius : 220,
            },
            endState : {
                x : 100,
                y : 50,
                radius : 200
            },
            numberOfSteps : 10
        },
        onClickAnimation : {
            type : "linear",
            startState : {
                x : 100,
                y : 50,
                radius : 200
            },
            endState : {
                x : 100,
                y : 50,
                radius : 220,
            },
            numberOfSteps : 10
        },
        animationList : [
            "onClickAnimation",
            "onClickAnimationReversed"
        ],
        currentAnimation : 1
    }
    startAnimation = () => {
        const {animationList, currentAnimation} = this.state
        this.props.setupAnimation(
            {
                ...this.state[ animationList[ currentAnimation ] ],
                onAnimationEnd : this.onAnimationEnd
            }
        )
        this.props.startAnimation()
    }
    componentDidMount() {
        this.startAnimation()
    }
    swapAnimation = (zIndex) => {
        this.setState(state => ({
            currentCircle : zIndex,
            currentAnimation : (state.currentAnimation + 1) % (state.animationList.length),
        }), this.startAnimation)
    }
    render() {
        const {x, y, radius} = this.props
        const {currentCircle, currentAnimation} = this.state
        return (
            // this element is affected by src/Bio/AboutMe.js
            <div id='circles' className='circles'>
                {
                    this.props.descriptor.map(
                        (item, id) => (
                            <Circle
                                key={uuid()}
                                onClick={ this.swapAnimation }
                                center={[x, y]}
                                isCurrent={currentCircle === (id + 1) * 2 + 1|| currentAnimation === 1}
                                {...item}
                                zIndex={ (id + 1) * 2 + 1}
                                radius={radius +  100 * (testData.length) - (id) * 100}/>
                        )
                    )
                }
                <div className='project-body' style={{
                    zIndex: currentAnimation === 1 ? -1 : 2//currentCircle - 1
                }}/>
            </div>
        )
    }
}

export default Circles
export const AnimatedCircles = AnimationWrapper(Circles)