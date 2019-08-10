import React, {Component} from 'react'
import './style.sass'
import {AnimatedCircles} from './Circles'

import testData from './projects.json'
class Projects extends Component {


    render() {
        return (
                <AnimatedCircles descriptor={testData}/>
        )
    }
}

export default Projects