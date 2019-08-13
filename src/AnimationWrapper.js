import React, { Component } from 'react'

export default function AnimationWrapper(WrappedComponent) {

    return class extends Component {

        onAnimationEnd = () => {} // callback can be set on setupAnimation
        state = {
            currentState : { },
            endState : { },
            startState : { },
            computedSteps : { },
            numberOfSteps : this.props.numberOfSteps,
            behavior : {

            },
            _needToComputeSteps : true,
            inProgress : false
        }

        startAnimation = () => {
            this.setState(
                (state) => ({
                    currentState : state.startState,
                    inProgress : true,
                    _needToComputeSteps : true
                })
            )

        }

        endAnimation = () => {
            this.setState(
                state => ({
                    currentState : state.endState,
                    behavior : {},
                    inProgress : false,
                }), this.onAnimationEnd
            )
        }

        pauseAnimation = () => {
            this.setState({ inProgress : false })
        }
        continueAnimation = () => {
            this.setState({ inProgress : true })
        }

        computeLinearSteps = () => {
            const computeLinearStep = (begin, end, numberOfSteps) => {
                return(
                    (end - begin) / numberOfSteps
                )
            }
            const { numberOfSteps, computedSteps, startState, endState } = this.state

            for(let key of Object.keys(startState)) {
                computedSteps[key] = computeLinearStep(startState[key], endState[key], numberOfSteps)
            }
            return computedSteps
        }
        computeSteps = () => {
            let computedSteps
            switch ( this.state.type ) {
                default :
                case 'linear' :
                case 'linear-looped' : computedSteps = this.computeLinearSteps()
            }
            this.setState({
                computedSteps,
                _needToComputeSteps : false
            })
        }

        animate = () => {
            if(this.state.inProgress) {
                if ( this.state._needToComputeSteps ) {
                    this.computeSteps()
                } else {
                    switch ( this.state.type ) {
                        case "linear" :this.linearBehavior(); break;
                        case "linear-looped" : this.linearLoopedBehavior(); break;
                    }
                }
            }
            this._needUpdate && requestAnimationFrame(this.animate)
        }
        linearBehavior = () => {
            const { behavior : {currentStep = 1},
                numberOfSteps, computedSteps, currentState } = this.state
            if (  currentStep <= numberOfSteps ) {
                const newState = {}
                for ( let key of Object.keys(computedSteps) ) {
                    newState[ key ] = currentState[ key ] + computedSteps[ key ]
                }
                this.setState({
                    currentState : newState,
                    behavior : {
                        currentStep : currentStep + 1,
                    },
                })

            } else {
                this.endAnimation()
            }
        }
        linearLoopedBehavior = () => {
            const { behavior : { direction },
                startState, endState,
                computedSteps, currentState } = this.state
            if(direction) {
                const newState = {}
                for ( let key of Object.keys(computedSteps) ) {
                    newState[ key ] = currentState[ key ] + computedSteps[ key ] * direction
                }

                let newDirection = direction

                const inRange = (start, end, value) => {
                    return (start <= end) ?
                        start <= value && value <= end : inRange(end, start, value)
                }
                for ( let key of Object.keys(newState) ) {
                    if ( computedSteps[ key ] && // If step is 0 property is constant and direction would change rapidly
                        !inRange(startState[ key ], endState[ key ], newState[ key ]) ) {
                        newDirection *= -1
                        break // Avoid changing direction several times per frame.
                    }
                }
                this.setState({
                    currentState : newState,
                    behavior : {
                        direction : newDirection
                    }
                })
            } else {
                this.endAnimation()
            }
        }

        componentDidMount = () => {
            this._needUpdate = true
            this.animate()
            window.addEventListener('resize', this.updateStates)
        }
        componentWillUnmount = () => {
            this._needUpdate = false
            window.removeEventListener('resize', this.updateStates)
        }

        setupAnimation = ({numberOfSteps, startState, endState, type, onAnimationEnd}) => {
            this.onAnimationEnd = onAnimationEnd
            const start = typeof startState === 'function' ? startState() : startState
            const end = typeof endState === 'function' ? endState() : endState
            const newState= {
                type : type || 'linear',
                numberOfSteps, startState : start, endState : end,
                currentState : start,
                behavior : type !== 'linear' ? { direction : -1 } : { currentStep : 1},
                onResize : {
                    startState : typeof startState === 'function' ? startState : null,
                    endState : typeof endState === 'function' ? endState : null,
                }
            }
            this.setState(newState)
        }

        updateStates = () =>  {
            const {onResize : {startState, endState}} = this.state

            let newStartState, newEndState
            if(typeof startState === 'function')
                newStartState = startState()

            if(typeof endState === 'function')
                newEndState = endState()

            if(newStartState || newEndState) {
                this.setState((state)  =>  ({
                    startState : newStartState || state.startState,
                    endState : newEndState || state.endState,
                    currentState : newEndState || state.endState,
                    _needToComputeSteps : true
                }))
            }
        }

        animationInProgress = () => this.state.inProgress

        render() {
            return(
                <WrappedComponent
                    {...this.state.currentState}
                    {...this.props}
                    animationInProgress={this.animationInProgress}
                    setupAnimation={this.setupAnimation}
                    startAnimation={this.startAnimation}
                    endAnimation={this.endAnimation}
                    pauseAnimation={this.pauseAnimation}
                />
            )
        }
    }
}