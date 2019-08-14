import React, { Component, Fragment } from 'react'
import './style.sass'

import RoundText from './RoundText'
import AnimationWrapper from '../AnimationWrapper'
import AnimationExecutor from './AnimationExecutor'

import uuid from 'uuid/v4'
import testData from './BioTemplate'
testData.forEach(item => item.id = uuid())


const AnimatedSvg = AnimationExecutor(
    ({x ,y, radius, infoRadius, onClick, descriptor}, ...rest) => {
        return (
            <Fragment>
                { radius &&
                <svg
                    textRendering='optimizeSpeed'
                    xmlns="http://www.w3.org/2000/svg">
                    <style>
                        {`.body {
                            fill : #121212;
                            font-size: 16px;
                            font-family: 'Comfortaa';
                            font-weight : normal;
                        }
                        .header {
                            fill : #121212;
                            font-size : 20px;
                            font-family : 'Play';
                            font-weight : bold;
                        }
                        .title {
                            fill : #121212;
                            font-size: 48px;
                            font-family : 'Blinker', sans-serif;
                            font-weight : normal;
                        }`}
                    </style>
                    <g onClick={ onClick }>
                        {
                            descriptor.map(
                                (item, id) => {

                                    const newRadius = radius + infoRadius * (descriptor.length - 2) - (id) * infoRadius
                                    return (
                                        <Fragment key={item.id + 4}>
                                            <path

                                                fill={ item.color }
                                                id={ "circle_" + item.id }
                                                key={ item.id }
                                                transform={ `rotate( -60 ${ x } ${ y })` }
                                                d={ `M ${ x + newRadius }, 
                                            ${ y } a ${ newRadius },${ newRadius } 1 0,
                                            1 ${ -2 * newRadius },1 a ${ newRadius },
                                            ${ newRadius } 1 1,1 ${ 2 * newRadius },0 ` }
                                            >
                                            </path>
                                            { (item.title || infoRadius) &&
                                            <Fragment key={ item.id + 1 }>
                                                <RoundText className={ 'header' } dy={ 50 } text={ item.header }
                                                           path={ '#circle_' + item.id }
                                                           key={ item.id + 2 }/>
                                                <RoundText className={ 'body' } x={ x } y={ y } dy={ 70 }
                                                           text={ item.body }{ ...item } path={ '#circle_' + item.id }
                                                           key={ item.id + 3 }/>
                                            </Fragment>
                                            }
                                        </Fragment>
                                    )
                                }
                            )
                        }
                    </g>
                </svg>
                }
            </Fragment>
        )
    }
)

class Bio extends Component {

    constructor(props) {
        super(props)
        this._request = null
        this._ref = null
    }

    state = {
        mounted : false,
    }

    onWindowResize = () => {
        if(!this._request)
            this._request = requestAnimationFrame(this.resizeView)
    }
    resizeView = () => {
        if(this._view) {
            const {width, height} = this._ref.getBoundingClientRect()
            this.setState(this.state)
        }
        this._request = null
    }
    componentDidMount() {
        this.setState({ mounted: true })
        window.addEventListener('resize', this.onWindowResize)
    }
    componentWillUnmount() {
        this.setState({ mounted: false })
        if (this._request) {
            cancelAnimationFrame(this._request)
            this._request = null
        }
        window.removeEventListener('resize', this.resizeWindow)
    }

    render() {
        const { mounted } = this.state
        const ref = this._ref && this._ref.getBoundingClientRect()
        const { x, y, radius, infoRadius } = this.props
        return(
            <div ref={ref => this._ref = ref} className={'bio-holder'}>
                { mounted &&
                <AnimatedSvg
                        width={ ref.width } height={ 700 }
                        animationInProgress={this.props.animationInProgress}
                        setupAnimation={ this.props.setupAnimation }
                        startAnimation={ this.props.startAnimation }
                        endAnimation={ this.props.endAnimation }
                        x={ x } y={ y } radius={ radius } infoRadius={ infoRadius }
                        descriptor={ testData }/>
                }
            </div>
        )
    }
}

export default AnimationWrapper(Bio)