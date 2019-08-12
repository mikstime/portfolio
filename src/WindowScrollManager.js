import React, { Component } from 'react'

export default function(WrappedComponent) {
        return class extends Component {

            state = {
                currentPosition : {
                    x : () => document.window.pageXOffset,
                    y : () => document.window.pageYOffset,
                },
                desiredPosition : {
                    x : () => document.window.pageXOffset,
                    y : () => document.window.pageYOffset,
                },
                computedSteps : {
                    x : 0,
                    y : 0
                },
                numberOfSteps : 1,
                currentStep : 1,
                inProgress : false
            }

            scrollTo({x, y}) {
                const window = document.window
                window.scrollTo(x, y)
            }
            scrollBy({dx, dy}) {
                const window = document.window
                window.scrollBy(dx, dy)
            }
            renderLoop = ( ) => {

                const { inProgress, currentStep, numberOfSteps, computedSteps } = this.state

                if(inProgress) {
                    if(currentStep < numberOfSteps)
                       this.scrollBy(computedSteps)

                    requestAnimationFrame(this.renderLoop)
                }

            }
            getEndPosition = () => {
                const {desiredPosition : { x ,y }} = this.state

                return {
                    x : typeof x === 'function' ? x() : x,
                    y : typeof y === 'function' ? y() : y,
                }
            }
            finishAnimation = () => {
                this.setState(state =>(
                        {
                            inProgress : false,
                            currentStep : state.numberOfSteps
                        }
                    )
                    // () => this.scrollTo(...this.getEndPosition())
                )
            }
            startAnimation = () => {
                const {inProgress} = this.state
                if(!inProgress)
                    this.renderLoop()
            }
            computeSteps = (desiredX, desiredY, numberOfSteps) => {
                const currentX = this.state.currentPosition.x()
                const currentY = this.state.currentPosition.y()

                const distanceX = desiredX - currentX
                const distanceY = desiredY - currentY

                return {
                    x : distanceX / numberOfSteps,
                    y : distanceY / numberOfSteps
                }

            }
            setupScrollRequest = ({x, y, numberOfSteps}) => {
                this.setState(
                    {
                        desiredPosition : {
                            x, y
                        },
                        numberOfSteps,
                        computedSteps : this.computeSteps(x, y, numberOfSteps),
                    }
                )
            }
            handleScrollRequest = (params) => {
                const {inProgress} = this.state
                if(inProgress)
                    this.finishAnimation()
                this.scrollTo(params)
            }
            handleSmoothScrollRequest = (params) => {
                const {inProgress} = this.state
                if(inProgress)
                    this.finishAnimation()
                this.setupScrollRequest(params)
                this.startAnimation()
            }
            render() {
                return (
                    <WrappedComponent
                        { ...this.props }
                        scrollTo={this.handleScrollRequest}
                        scrollToSmoothly={this.handleSmoothScrollRequest}
                    />
                )
            }
        }
}