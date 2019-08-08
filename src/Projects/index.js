import React, {Component} from 'react'
import './style.sass'

const Project = ({header, children}) => (
    <div className='project-body'>
        <h>{header}</h>
        {children}
    </div>
)
class Projects extends Component {

    render() {
        return (
            <div className='projects-holder'>
                <Project header={"Sample project"}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Project>
            </div>
        )
    }
}

export default Projects