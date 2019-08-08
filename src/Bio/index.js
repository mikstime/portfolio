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
        console.log(this._ref.getBoundingClientRect())
    }
    componentWillUnmount() {
        this.setState({ mounted: false })
        if (this._request) {
            cancelAnimationFrame(this._request)
            this._request = null
        }
        window.removeEventListener('resize', this.resizeWindow)
    }


    onDrag = (e) => {

        const { event: { touches }, tool: { view } } = e
        if (touches && touches.length === 2) {
            // pinch zoom
            if (!this._pinch) {
                this._pinch = this.getPinchEventData(e)
                return
            }
            const prev = this._pinch
            const next = this.getPinchEventData(e)
            //this.setState(this.getPinchEventState(e, prev, next))
            const {tx, ty} = this.getPinchEventState(e, prev, next)
            view.translate(tx, ty)
            this._pinch = next
        } else {
            // pan
            if (!this._pan) {
                this._pan = this.getPanEventData(e)
                return
            }
            const prev = this._pan
            const next = this.getPanEventData(e)
            //this.setState(this.getPanEventState(e, prev, next))
            // transform view manually
            const { tx, ty } = this.getPanEventState(e, prev, next)
            view.translate(tx, ty)
            this._pan = next
        }
    }
    mouseUp = (e) => {
        this._pan = null
        this._pinch = null
    }
    render() {
        const { mounted } = this.state
        const ref = this._ref && this._ref.getBoundingClientRect()
        return(
            <div ref={ref => this._ref = ref} className={'bio-holder'}>
                { mounted &&
                <View width={ ref.width } height={ ref.height } ref={ref => this._view = ref}>s
                    <Rainbow width={ ref.width } height={ 700 } onDrag={this.onDrag}  onUp={this.mouseUp}/>/>
                </View>
                }
            </div>
        )
    }
}

export default Bio