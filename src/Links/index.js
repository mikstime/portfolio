import React, { Component, Fragment } from 'react'
import './style.sass'
import gitLogo from './imgs/GitHub-Mark-Light-120px-plus.png'
import twitterLogo from './imgs/twitter-128.png'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'
const Link = (props) => (
    <li key={uuid()} className='link'>
        <a href={props.href}>
            {
                props.image && <div style={{
                    backgroundSize  : `auto ${props.scale || 75}%`,
                    backgroundImage : `url(${props.image})`
                }}/>
            }
            {
                props.text && <p>{props.text}</p>
            }
        </a>
    </li>
)
Link.propTypes = {
    href : PropTypes.string.isRequired,
    image : PropTypes.string,
    text : PropTypes.string
}

class LinkHolder extends Component {

    render() {
        return(
            <ul className='links-holder'>
                <Link scale={50} image={gitLogo} href='https://github.com/mikstime'/>
                <Link text='Home Page' href='.'/>
                <Link scale={50} image={twitterLogo} href='https://twitter.com/BalitskyMichael'/>
            </ul>
        )
    }
}

export default LinkHolder
export {Link}