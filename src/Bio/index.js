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
    getPanEventData(e) {
        const { point, event: { touches, pageX, pageY }, tool: { view } } = e
        return {
            point: view.projectToView(point),
            x: (touches) ? touches[0].pageX : pageX,
            y: (touches) ? touches[0].pageY : pageY,
        }
    }
    getPanEventState(e, prev, next) {
        const { x, y } = this.state
        const { point, tool: { view } } = e
        const t = point.subtract(view.viewToProject(prev.point))
        return {
            tx: t.x,
            ty: t.y,
            x: x + t.x,
            y: y + t.y,
        }
    }
    render() {
        const { mounted } = this.state
        const ref = this._ref && this._ref.getBoundingClientRect()
        return(
            <div ref={ref => this._ref = ref} className={'bio-holder'}>
                { mounted &&
                <View width={ ref.width } height={ ref.height } ref={ref => this._view = ref}>
                    <Chain  onDrag={this.onDrag}  onUp={this.mouseUp}/>
                </View>
                }
            </div>
        )
    }
}

export default Bio