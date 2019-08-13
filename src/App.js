import React, { Component } from 'react';
import Links from './Links'
import Bio from './Bio'
import Projects from './Projects'
class App extends Component {

    componentDidMount() {
        window.addEventListener('beforeunload', () => window.scrollTo && window.scrollTo(0,0))
        if(window.history && window.history.scrollRestoration) window.history.scrollRestoration = "manual";
    }

    render() {
        return (
            <div className="App">
                <Links/>
                <Bio/>
                <Projects/>
            </div>
        )
    }
}

export default App;
