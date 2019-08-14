import React, { Component, Fragment } from 'react'
import './style.sass'
import PropTypes from 'prop-types'
import testData from './projects'
import AnimationWrapper from '../AnimationWrapper'
import uuid from 'uuid/v4'
import PostParser from './PostParser'
import ProjectHolder from './ProjectHolder'

testData.forEach( item => item.id = uuid())
//@TODO add image to project
//@TODO add link to project
//@TODO make title for each project
//@TODO optimize
//@TODO fix layout
const Circle = (props) => {
    const {id, title, center, fillInner = false, className='',radius, color, onClick, isCurrent} = props
    const x = center[0], y = center[1]
    const classes = (isCurrent ? 'circle-is-chosen' : 'circle') +' ' + className
    return(
        <div
            onClick={() =>onClick(id)}
            className={classes} style={ {
            width : `${ (radius - 100)* 2 }px`,
            height : `${ (radius - 100) * 2 }px`,
            borderColor : color,
            backgroundColor : fillInner ? color : '',
            top : `${ -y - radius }px`,
            left : `${ x - radius }px`,
        } }>
            {title &&<p>{title}</p>}
            {props.children}
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
    swapAnimation = (id) => {
        this.setState(state => ({
            currentCircle : id,
            currentAnimation : (state.currentAnimation + 1) % (state.animationList.length),
        }), this.startAnimation)
    }
    render() {
        const { x, circleWidth, y, radius, descriptor } = this.props
        const {currentCircle, currentAnimation} = this.state
        console.log(currentAnimation)
        return (
             <div id='circles'>
                {
                    descriptor.map(
                        (item, id) => (
                            <Circle
                                key={item.id}
                                onClick={ this.swapAnimation }
                                center={[x, y]}
                                fillInner={id === descriptor.length - 1 || (currentAnimation === 0 && id !== currentCircle)}
                                title={currentAnimation === 0 && item.header}
                                isCurrent={currentCircle === id || currentAnimation === 1}
                                {...item}
                                color={currentAnimation === 0 ? descriptor[currentCircle].color : item.color}
                                id={ id }
                                radius={radius +  circleWidth * (descriptor.length - 1) - (id) * circleWidth + 1 }/>
                        )
                    )
                }
                <div className={'project-body' + (currentAnimation === 0 ? '' : ' project-body-show')} style={{
                    background : currentAnimation === 0 ? descriptor[currentCircle].color : '',
                    }}>
                </div>
                {currentAnimation === 0 && <ProjectHolder onImageClick={this.swapAnimation} {...descriptor[currentCircle]}/>}
                 {currentAnimation === 1 &&
                 <div className='click-on-rainbow'>
                     <h1>Click on Rainbow to Checkout my Projects</h1>
                 </div>}
            </div>
        )
    }
}

export default PostParser(Circles)
export const AnimatedCircles = PostParser(AnimationWrapper(Circles))