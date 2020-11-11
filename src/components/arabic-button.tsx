import * as React from 'react';
import { ArabicLabel } from './model/models';
import { Button } from 'primereact/button';

interface ArabicButtonProps {
    letter: ArabicLabel
}

export default class ArabicButton extends React.Component<ArabicButtonProps, any> {

    render() {
        return (
            <Button label={this.props.letter.label} className="arabicButton ui-button p-button-raised"/>
        );
    }
}