import React, {Component} from 'react'
import { Layer } from 'react-paper-bindings'
import Fact from './Fact'

class Chain extends Component {

    render() {
        return(
            <Layer>
                <Fact
                    point={[80, 100]}
                    content={[
                    ["h3", "Lucy 1580"],
                    ["p", "in 2018"]
                ]}/>
            </Layer>
        )
    }
}

export default Chain