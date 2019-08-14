import React, { Component } from 'react'
import './style.sass'
import {
    View
} from 'react-paper-bindings'
import {Point} from 'paper'
import Rainbow from './BioRainbow'
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
        if(this._view && this._view.scope) {
            const {width, height} = this._ref.getBoundingClientRect()
            this._view.scope.view.center = new Point(width / 2, height / 2)
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
        return(
            <div ref={ref => this._ref = ref} className={'bio-holder'}>
                { mounted &&
                <View width={ ref.width } height={ ref.height } ref={ref => this._view = ref}>
                    <Rainbow width={ ref.width } height={ 700 }/>
                </View>
                }
            </div>
        )
    }
}

export default Bio