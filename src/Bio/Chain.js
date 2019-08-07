import React, {Component} from 'react'
import { Layer } from 'react-paper-bindings'
import uuid from 'uuid/v4'
import Fact from './Fact'

import testData from './BioTemplate.json'
class Chain extends Component {

    render() {
        return(
            <Layer>
                {
                    testData
                        .map((descr, id) =>(
                            <Fact key={uuid()} radius={500 + 300 * (testData.length - 1) - (id) * 200} {...descr}/>
                        )
                    )
                }
            </Layer>
        )
    }
}

export default Chain