import React, { Component, Fragment } from 'react'

import {AnimatedAboutMe} from './AboutMe'

//@TODO add pan
class BioRainbow extends Component {

    render() {
        return(
            <Fragment>
                <AnimatedAboutMe height={this.props.height} width={this.props.width}/>
            </Fragment>
        )
    }
}

export default BioRainbow