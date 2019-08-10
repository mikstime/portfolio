import React, {Component} from 'react'
import './style.sass'
import PropTypes from 'prop-types'
import testData from './projects'
import AnimationWrapper from '../AnimationWrapper'
import uuid from 'uuid/v4'
import PostParser from './PostParser'
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
            filter : `brightness(${isCurrent ? 0.3 : 0.1})`,
            zIndex,
            backgroundColor : color,//isCurrent ? color : '#121212',
            borderRadius : `0 0 ${ radius * 2 }px ${ radius * 2 }px`
        } }>
        </div>
    )
}
Circle.propTypes = {
    color : PropTypes.string.isRequired,

}
class Circles extends Component {

    static propTypes = {
        parseContent : PropTypes.func.isRequired
    }
    state = {
        currentCircle : 3,
        onClickAnimationReversed : {
            type : "linear",
            startState : {
                x : 100,
                y : 50,
                radius : 220,
                circleWidth : 100
            },
            endState : {
                x : 100,
                y : 50,
                radius : 200,
                circleWidth : 100
            },
            numberOfSteps : 10
        },
        onClickAnimation : {
            type : "linear",
            startState : {
                x : 100,
                y : 50,
                radius : 200,
                circleWidth : 100
            },
            endState : {
                x : 100,
                y : 50,
                radius : 220,
                circleWidth: 100
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
        const {x, circleWidth, y, radius} = this.props
        const {currentCircle, currentAnimation} = this.state
        const full = testData[0].full
        const media = testData[0].mediaFull
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
                                color={currentAnimation === 0 ? testData[(currentCircle - 1) / 2 - 1].color : item.color}
                                zIndex={ (id + 1) * 2 + 1}
                                radius={radius +  circleWidth * (testData.length - 1) - (id) * circleWidth}/>
                        )
                    )
                }
                <div className='project-body' style={{
                    background : currentAnimation === 0 ? testData[(currentCircle - 1) / 2 - 1].color : '',
                    filter : `brightness(${currentAnimation === 1 ? 1 : 0.3})`,
                    zIndex: currentAnimation === 1 ? -1 : 2//currentCircle - 1
                }}>
                    {/*{this.props.parseContent(full, media)}*/}
                </div>
            </div>
        )
    }
}

export default PostParser(Circles)
export const AnimatedCircles = PostParser(AnimationWrapper(Circles))