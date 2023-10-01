import React from 'react';

export default class AdComponent extends React.Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-8291066617415830"
                 data-ad-slot="1047632051"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        );
    }
}