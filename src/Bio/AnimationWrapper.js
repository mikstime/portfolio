import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default function AnimationWrapper(WrappedComponent) {

    return class extends Component {

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
                }), this.animate
            )

        }

        endAnimation = () => {
            this.setState(
                state => ({
                    currentState : state.endState,
                    inProgress : false,
                })
            )
        }

        pauseAnimation = () => {
            this.setState(
                state => ({
                    inProgress : false,
                })
            )
        }
        continueAnimation = () => {
            this.setState(
                state => ({
                    inProgress : true,
                }),
                this.animate
            )
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
            }, () => requestAnimationFrame(this.animate))
        }

        animate = () => {
            if(this.state.inProgress) {
                if ( this.state._needToComputeSteps ) {
                    this.computeSteps()
                } else {
                    switch ( this.state.type ) {
                        case "linear" :
                            this.linearBehavior(); break;
                        case "linear-looped" : this.linearLoopedBehavior(); break;
                    }
                }
            }
        }
        linearBehavior = () => {

            const { behavior : {_currentStep = 1},
                numberOfSteps, computedSteps, currentState } = this.state

            if ( _currentStep <= numberOfSteps ) {

                const newState = {}
                for ( let key of Object.keys(computedSteps) ) {
                    newState[ key ] = currentState[ key ] + computedSteps[ key ]
                }
                this.setState({
                    currentState : newState,
                    behavior : {
                        _currentStep : _currentStep + 1,
                    }
                }, () => requestAnimationFrame(this.animate))

            }
        }
        linearLoopedBehavior = () => {

            const { behavior : {_direction = 1 },
                startState, endState,
                computedSteps, currentState } = this.state

                const newState = {}
                for ( let key of Object.keys(computedSteps) ) {
                    newState[ key ] = currentState[ key ] + computedSteps[ key ] * _direction
                }
                let testProp = Object.keys(newState)[0]

            let newDirection = _direction

            const inRange = (start, end, value) => {
                    return ( start <= end ) ?
                        start <= value && value <= end : inRange(end, start, value)
            }
            for(let key of Object.keys(newState)) {
                if(computedSteps[key] && !inRange(startState[key], endState[key], newState[key])) {
                    newDirection *= -1
                    break
                }
            }
            this.setState({
                currentState : newState,
                behavior : {
                    _direction : newDirection
                } }, () => requestAnimationFrame(this.animate))

        }
        setupAnimation = ({numberOfSteps, startState, endState, type}) => {
            this.setState(
                {
                    type : type || 'linear',
                    numberOfSteps, startState, endState,
                }
            )
        }

        render() {
            return(
                <WrappedComponent
                    {...this.props}
                    {...this.state.currentState}
                    setupAnimation={this.setupAnimation}
                    startAnimation={this.startAnimation}
                    endAnimation={this.endAnimation}
                    pauseAnimation={this.pauseAnimation}
                />
            )
        }
    }
}