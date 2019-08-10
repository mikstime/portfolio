import React, { Component } from 'react'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

export default function (WrappedComponent) {

    return class extends Component {

        static propTyps = {
            VITRINES : PropTypes.objectOf(React.Component)
        }

        parsePost = (post, media) => {

            media = media instanceof Array ? media : []
            const splitedPost = post.split("<media>")

            const ParsedText = []

            if ( splitedPost.length  === media.length + 1 ) {
                let ind = 0
                for ( let part of splitedPost ) {
                    if ( part.length > 0 ) {
                        ParsedText.push(
                            React.createElement(
                                "span", {
                                    key : uuid(),
                                    dangerouslySetInnerHTML : {
                                        __html : part
                                    }
                                }
                            )
                        )
                    }
                    if ( ind < media.length ) {
                        ParsedText.push(
                            React.createElement(
                                this.props.VITRINES(media[ind].type), {...media[ ind++ ], key : uuid()}
                            )
                        )
                    }
                }
                return ParsedText
            }
            return <p>Ошибка при обработке записи</p>
        }

        render() {

            return(
                <WrappedComponent
                    {...this.props}
                    parseContent={this.parsePost}
                />
            )
        }
    }

}