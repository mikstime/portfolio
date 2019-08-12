import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

import gitLogo from './imgs/GitHub-Mark-Light-120px-plus.png'
import twitterLogo from './imgs/twitter-128.png'
import './style.sass'

const Link = (props) => (
    <li key={uuid()} className='link'>
        <a href={props.href}>
            { props.image && <div style={{
                    backgroundSize  : `auto ${props.scale || 75}%`,
                    backgroundImage : `url(${props.image})`
            }}/> }

            { props.text && <p>{props.text}</p> }
        </a>
    </li>
)
Link.propTypes = {
    href : PropTypes.string.isRequired,
    image : PropTypes.string,
    text : PropTypes.string
}

class LinkHolder  extends Component {

    state = {
        needToShow : true
    }

    render() {
        const { needToShow } = this.state
        const className= 'links-holder' + (needToShow ? '' : '-hidden')
        return(
            <ul className={className}>
                <Link scale={50} image={gitLogo} href='https://github.com/mikstime'/>
                <Link text='Michael Balitsky' href='.'/>
                <Link scale={50} image={twitterLogo} href='https://twitter.com/BalitskyMichael'/>
            </ul>
        )
    }
}

export default LinkHolder
export {Link}