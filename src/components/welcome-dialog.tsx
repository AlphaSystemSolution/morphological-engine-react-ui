import { FC, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ArabicConstants } from './model/models';
import { InputText } from 'primereact/inputtext';

interface Props {
    arabicFontName: string,
    visible: boolean,
    onHide(fontName?: string): void
}

const WelcomeDialog: FC<Props> = ({ arabicFontName, visible, onHide }) => {
    const [currentFontName, setCurrentFontName] = useState(arabicFontName);

    const handleShowDialog = () => {
        setCurrentFontName(arabicFontName);
    }

    const handleCancelDialog = () => {
        onHide();
    }

    const handleSubmitDialog = () => {
        onHide(currentFontName);
    }

    const updateFontFamily = (e: any) => {
        const elem: HTMLInputElement = e.target;
        const value: string = elem.value;
        const nonEmpty = value && value.trim().length >= 0;
        setCurrentFontName(nonEmpty ? value : arabicFontName);
    }

    const dialogContent = (
        <div style={{ textAlign: 'left', width: '50vw' }}>
            <p>The <i>Morphological Engine</i> is fully working <span className="arabicNormal">{ArabicConstants.CONJUGATION_LABEL.label}</span> generator.</p>
            <p>
                Following are the few highlights of the <i>Morphological Engine</i>.
                <ul>
                    <li>Covers all families (except for families for four letter words).</li>
                    <li>Project based &mdash; create, save, and load projects.</li>
                    <li>View conjugation(s).</li>
                    <li>Export conjugation(s) to Microsoft Word&reg;.</li>
                    <li>Integration with <a href="http://ejtaal.net/aa/" target="_dictionary">Arabic Almanac Dictionary</a>.</li>
                </ul>
            </p>
            <div style={{ textAlign: 'justify' }} className="p-m-0">
                Please set Arabic font family to be used to create <i>Word</i> document. The <i>Morphological Engine</i> uses&nbsp;
                    <span className="code">KFGQPC Uthman Taha Naskh</span> to display Arabic font and we recommend to use it in <i>Word</i> as well. if
                    you don't <span className="code">KFGQPC Uthman Taha Naskh</span> font installed locally then you can download its&nbsp;
                    <a href="https://arabicfonts.net/fonts/kfgqpc-uthman-taha-naskh-regular" target="_regular">Regular</a> and&nbsp;
                    <a href="https://arabicfonts.net/fonts/kfgqpc-uthman-taha-naskh-bold" target="_bold">Bold</a> fonts.
            </div>
            <div>&nbsp;</div>
            <div className="p-fluid ">
                <div className="p-field p-grid">
                    <label htmlFor="fontName" className="p-col-2 p-md-2" style={{ fontWeight: 'bold' }}>Font name:</label>
                    <div className="p-col-12 p-md-8">
                        <InputText id="fontName" type="text" value={currentFontName} onChange={updateFontFamily} />
                    </div>
                    <div className="p-col-12 p-md-2">
                        <Button type="button" label="Test" className="p-button-secondary" />
                    </div>
                </div>
            </div>
        </div>
    );

    const dialogFooter = (
        <div className="p-grid p-fluid">
            <div className="p-col-6">
                <Button type="button" label="OK" className="p-button-success" onClick={handleSubmitDialog} />
            </div>
        </div>
    );

    return (
        <>
            <Dialog visible={visible} header="Welcome to Morphological Engine" footer={dialogFooter} onShow={handleShowDialog} onHide={handleCancelDialog}>
                {dialogContent}
            </Dialog>
        </>
    );
}

export default WelcomeDialog;
