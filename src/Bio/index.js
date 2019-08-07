import React, { Component } from 'react'
import './style.sass'
import {
    View
} from 'react-paper-bindings'

import Chain from './Chain'
import Fact from './Fact'

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
        this.forceUpdate()
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
                <View width={ ref.width } height={ ref.height }>

                </View>
                }
            </div>
        )
    }
}

export default Bio