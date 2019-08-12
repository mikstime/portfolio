import './style.sass'

import React, { Component } from 'react'

import PropTypes from 'prop-types'



class ProjectHolder extends Component {

    static propTypes = {
        text : PropTypes.string.isRequired,
        onImageClick : PropTypes.func
    }
    render() {
        console.log(this.props.image)
        return(
            <div className={'content-holder'}>
                <span className={'content-holder-circle'}/>
                <div onClick={this.props.onImageClick} className='project-image' style={{
                    cursor : this.props.onImageClick ? 'pointer' : '',
                    backgroundImage : this.props.image ?`url("${this.props.image}")` : ''
                }}/>
                <p>{this.props.text_en}</p>
                <a href={this.props.link || './'}>Link</a>

            </div>
        )
    }
}

export default ProjectHolder