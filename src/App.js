import React, { Component } from 'react';
import Links from './Links'
import BioCanvas from './BioCanvas'
import BioSvg from './BioSVG'
import Projects from './Projects'
let ChosenBio;
if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i) ){
    ChosenBio = BioCanvas
} else {
    ChosenBio = BioSvg
}
class App extends Component {

    componentDidMount() {
        window.addEventListener('beforeunload', () => window.scrollTo && window.scrollTo(0,0))
        if(window.history && window.history.scrollRestoration) window.history.scrollRestoration = "manual";
    }

    render() {
        return (
            <div className="App">
                <Links/>
                <ChosenBio/>
                <Projects/>
            </div>
        )
    }
}

export default App;
