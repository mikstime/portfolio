import React from 'react';
import Links from './Links'
import Bio from './Bio'
import Projects from './Projects'
function App() {
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0)
    })
    return (
        <div className="App">
          <Links/>
          <Bio/>
          <Projects/>
        </div>
    );
}

export default App;
