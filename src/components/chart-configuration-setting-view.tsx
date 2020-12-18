import { FC, useRef, useState } from 'react';
import { ChartConfiguration, PageOption, PageOrientation } from './model/chart-configuration';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ArabicConstants } from './model/models';
import { InputData } from './model/input-data';
import { ApplicationController } from '../services/application-controller';
import { VerbalNoun } from './model/verbal-noun';
import { ConjugationTemplate } from './model/conjugation-template';

interface Props {
    chartConfiguration: ChartConfiguration;
    visibile: boolean;
    showWelcomeMessage: boolean;
    showOptionalFields: boolean;
    onHide(chartConfiguration?: ChartConfiguration): void;
}

const ChartConfigurationSettingView: FC<Props> = ({ chartConfiguration, visibile, showWelcomeMessage, showOptionalFields, onHide }) => {
    const [arabicFontFamily, setArabicFontFamily] = useState(chartConfiguration.arabicFontFamily);
    const [translationFontFamily, setTranslationFontFamily] = useState(chartConfiguration.translationFontFamily);
    const [arabicFontSize, setArabicFontSize] = useState(chartConfiguration.arabicFontSize);
    const [headingFontSize, setHeadingFontSize] = useState(chartConfiguration.headingFontSize);
    const [translationFontSize, setTranslationFontSize] = useState(chartConfiguration.translationFontSize);
    const [omitToc, setOmitToc] = useState(chartConfiguration.omitToc);
    const [omitTitle, setOmitTitle] = useState(chartConfiguration.omitTitle);
    const [omitHeader, setOmitHeader] = useState(chartConfiguration.omitHeader);
    const [omitSarfTermCaption, setOmitSarfTermCaption] = useState(chartConfiguration.omitSarfTermCaption);
    const [sortDirective, setSortDirective] = useState(chartConfiguration.sortDirective);
    const [sortDirection, setSortDirection] = useState(chartConfiguration.sortDirection);
    const [pageOrientation, setPageOrientation] = useState(chartConfiguration.pageOption.orientation);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const defaultChartConfiguration = new ChartConfiguration();
    const applicationController = new ApplicationController();
    let toastRef: any = useRef(null);

    const handleOnShow = () => {
        setArabicFontFamily(chartConfiguration.arabicFontFamily);
        setTranslationFontFamily(chartConfiguration.translationFontFamily);
        setArabicFontSize(chartConfiguration.arabicFontSize);
        setHeadingFontSize(chartConfiguration.headingFontSize);
        setTranslationFontSize(chartConfiguration.translationFontSize);
        setOmitToc(chartConfiguration.omitToc);
        setOmitTitle(chartConfiguration.omitTitle);
        setOmitHeader(chartConfiguration.omitHeader);
        setOmitSarfTermCaption(chartConfiguration.omitSarfTermCaption);
        setSortDirective(chartConfiguration.sortDirective);
        setSortDirection(chartConfiguration.sortDirection);
        setPageOrientation(chartConfiguration.pageOption.orientation);
        setFormSubmitted(false);
    }

    const welcomeContent = () => {
        if (showWelcomeMessage) {
            return (
                <div style={{ textAlign: 'left' }}>
                    <p>The <i>Morphological Engine</i> is fully working <span className="arabicNormal">{ArabicConstants.CONJUGATION_LABEL.label}</span> generator.</p>
                    <div>
                        Following are the few highlights of the <i>Morphological Engine</i>.
                        <ul>
                            <li>Covers all families (except for families for four letter words).</li>
                            <li>Project based &mdash; create, save, and load projects.</li>
                            <li>View conjugation(s).</li>
                            <li>Export conjugation(s) to Microsoft Word&reg;.</li>
                            <li>Integration with <a href="http://ejtaal.net/aa/" target="_dictionary">Arabic Almanac Dictionary</a>.</li>
                        </ul>
                    </div>
                    <div style={{ textAlign: 'justify' }} className="p-m-0">
                        <p>Please set Arabic font family to be used to create <i>Word</i> document. The <i>Morphological Engine</i> uses&nbsp;
                            <span className="code" style={{ fontStyle: 'italic' }}>KFGQPC Uthman Taha Naskh</span> to display Arabic font and we recommend to use it in <i>Word</i> as
                            well. if you don't have <span className="code" style={{ fontStyle: 'italic' }}>KFGQPC Uthman Taha Naskh</span> font installed locally then you can download
                            its <a href="https://arabicfonts.net/fonts/kfgqpc-uthman-taha-naskh-regular" target="_regular">Regular</a> and&nbsp;
                            <a href="https://arabicfonts.net/fonts/kfgqpc-uthman-taha-naskh-bold" target="_bold">Bold</a> fonts.</p>
                        <p>You can <button type="button" className="link-button" onClick={testFont}>Test</button> your font by generating <i>Word</i> file.</p>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    const mainForm = () => {
        const updateFontFamily = (e: any) => {
            const elem: HTMLInputElement = e.target;
            const id = elem.id;
            let value: string = elem.value;
            switch (id) {
                case 'arabicFontFamily':
                    setArabicFontFamily(value);
                    break;
                case 'translationFontFamily':
                    setTranslationFontFamily(value);
                    break;
                default:
                    break;
            }
        }

        const updateFontSize = (e: any) => {
            const elem: HTMLInputElement = e.target;
            const id = elem.id;
            const value = parseInt(elem.value);
            switch (id) {
                case 'arabicFontSize':
                    setArabicFontSize(value);
                    break;
                case 'headingFontSize':
                    setHeadingFontSize(value);
                    break;
                case 'translationFontSize':
                    setTranslationFontSize(value);
                    break;
                default:
                    break;
            }
        }
        return (
            <>
                <div className="p-field p-grid">
                    <label htmlFor="arabicFontFamily" className="p-col-12 p-md-12" style={{ fontWeight: 'bold' }}>
                        <small>Arabic Font Family:</small>
                    </label>
                    <div className="p-col-12 p-md-12">
                        <InputText id="arabicFontFamily" type="text" value={arabicFontFamily}
                            onChange={updateFontFamily} />
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="translationFontFamily" className="p-col-12 p-md-12" style={{ fontWeight: 'bold' }}>
                        <small>Transalation Font Family:</small>
                    </label>
                    <div className="p-col-12 p-md-12">
                        <InputText id="translationFontFamily" type="text" value={translationFontFamily}
                            onChange={updateFontFamily} />
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="arabicFontSize" className="p-col-12 p-md-12" style={{ fontWeight: 'bold' }}>
                        <small>Arabic Normal Font Size:</small>
                    </label>
                    <div className="p-col-12 p-md-12">
                        <InputNumber id="arabicFontSize" value={arabicFontSize} onValueChange={updateFontSize}
                            mode="decimal" min={10} max={30} useGrouping={false} showButtons />
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="headingFontSize" className="p-col-12 p-md-12" style={{ fontWeight: 'bold' }}>
                        <small>Arabic Heading Font Size:</small>
                    </label>
                    <div className="p-col-12 p-md-12">
                        <InputNumber id="headingFontSize" value={headingFontSize} onValueChange={updateFontSize}
                            mode="decimal" min={16} max={40} useGrouping={false} showButtons />
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="translationFontSize" className="p-col-12 p-md-12" style={{ fontWeight: 'bold' }}>
                        <small>Translation Font Size:</small>
                    </label>
                    <div className="p-col-12 p-md-12">
                        <InputNumber id="translationFontSize" type="text" value={translationFontSize} onValueChange={updateFontSize}
                            mode="decimal" min={10} max={30} useGrouping={false} showButtons />
                    </div>
                </div>
                <div>&nbsp;</div>
            </>
        );
    }

    const optionalForm = () => {
        const updateBooleanOption = (e: any) => {
            const elem: HTMLInputElement = e.target;
            switch (elem.id) {
                case 'omitToc':
                    setOmitToc(e.value);
                    break;
                case 'omitTitle':
                    setOmitTitle(e.value);
                    break;
                case 'omitHeader':
                    setOmitHeader(e.value);
                    break;
                case 'omitSarfTermCaption':
                    setOmitSarfTermCaption(e.value);
                    break;
                default:
                    break;
            }
        }

        const updateDropdownOption = (e: any) => {
            const elem: HTMLInputElement = e.target;
            switch (elem.id) {
                case 'sortDirective':
                    setSortDirective(e.value);
                    break;
                case 'sortDirection':
                    setSortDirection(e.value);
                    break;
                case 'pageOrientation':
                    setPageOrientation(e.value);
                    break;
                default:
                    break;
            }
        }

        const sortDirectiveOptions = ['NONE', 'TYPE', 'ALPHABATICAL'];
        const sortDirectionOptions = ['ASCENDING', 'DESCENDING'];
        const pageOrientationOptions = [PageOrientation.PORTRAIT, PageOrientation.LANDSCAPE];
        return (
            <>
                <div className="p-formgroup-inline">
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="omitToc" style={{ fontWeight: 'bold' }}>
                            <small>Omit Table of Content</small>
                        </label>
                        <InputSwitch id="omitToc" checked={omitToc} onChange={updateBooleanOption} />
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="omitTitle" style={{ fontWeight: 'bold' }}>
                            <small>Omit Title</small>
                        </label>
                        <InputSwitch id="omitTitle" checked={omitTitle} onChange={updateBooleanOption} />
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="omitHeader" style={{ fontWeight: 'bold' }}>
                            <small>Omit Header</small>
                        </label>
                        <InputSwitch id="omitHeader" checked={omitHeader} onChange={updateBooleanOption} />
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="omitSarfTermCaption" style={{ fontWeight: 'bold' }}>
                            <small>Omit Sarf Caption</small>
                        </label>
                        <InputSwitch id="omitSarfTermCaption" checked={omitSarfTermCaption} onChange={updateBooleanOption} />
                    </div>
                </div>
                <div>&nbsp;</div>
                <div className="p-formgroup-inline">
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="sortDirective" style={{ fontWeight: 'bold' }}>
                            <small>Sort Directive:</small>
                        </label>
                        <div className="p-col-12 p-md-12">
                            <Dropdown id="sortDirective" value={sortDirective} options={sortDirectiveOptions} onChange={updateDropdownOption} />
                        </div>
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="sortDirection" style={{ fontWeight: 'bold' }}>
                            <small>Sort Direction:</small>
                        </label>
                        <div className="p-col-12 p-md-12">
                            <Dropdown id="sortDirection" value={sortDirection} options={sortDirectionOptions} onChange={updateDropdownOption} />
                        </div>
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="pageOrientation" style={{ fontWeight: 'bold' }}>
                            <small>Page Orientation:</small>
                        </label>
                        <div className="p-col-12 p-md-12">
                            <Dropdown id="pageOrientation" value={pageOrientation} options={pageOrientationOptions} onChange={updateDropdownOption} />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const inputForm = () => {
        return (
            <div className="p-fluid">
                {mainForm()}
                {showOptionalFields ? optionalForm() : null}
            </div>
        );
    };

    const onClose = () => {
        if (!formSubmitted) {
            onHide();
        }
    }

    const resetForm = () => {
        if (arabicFontFamily.length <= 0) {
            setArabicFontFamily(defaultChartConfiguration.arabicFontFamily);
            toastRef.show({ severity: 'error', summary: 'Error Message', detail: `'arabicFontFamily' cannot be empty, reverting to default font.`, life: 3000 });
        }
        if (translationFontFamily.length <= 0) {
            setTranslationFontFamily(defaultChartConfiguration.translationFontFamily);
            toastRef.show({ severity: 'error', summary: 'Error Message', detail: `'translationFontFamily' cannot be empty, reverting to default font.`, life: 3000 });
        }
    }

    const onCancel = () => {
        resetForm();
        setFormSubmitted(true);
        onHide();
    }

    const onSubmit = () => {
        resetForm();
        setFormSubmitted(true);
        onHide(createChartConfiguration());
    }

    const createChartConfiguration = () => {
        const aff = arabicFontFamily.length <= 0 ? defaultChartConfiguration.arabicFontFamily : arabicFontFamily;
        const tff = translationFontFamily.length <= 0 ? defaultChartConfiguration.translationFontFamily : translationFontFamily;
        return new ChartConfiguration(
            omitToc,
            false,
            false,
            omitTitle,
            omitHeader,
            omitSarfTermCaption,
            sortDirective,
            sortDirection,
            aff,
            tff,
            arabicFontSize,
            translationFontSize,
            headingFontSize,
            new PageOption(pageOrientation)
        )
    }

    const testData = () => {
        const inputData = new InputData();
        inputData.verbalNouns = [VerbalNoun.VERBAL_NOUN_V1];
        const chartConfiguration = ChartConfiguration.of(createChartConfiguration());
        chartConfiguration.omitToc = true;
        return new ConjugationTemplate([inputData.toConjugationData()], chartConfiguration);
    }

    const testFont = () => {
        applicationController.exportToWord(testData());
    }

    const footer = (
        <div>
            <Button label="Cancel" onClick={onCancel} className="p-button-text" />
            <Button label="Save" onClick={onSubmit} autoFocus />
        </div>
    );


    return (
        <>
            <Toast ref={(el) => toastRef = el} />
            <Dialog header="Chart configuration for Word export" visible={visibile || showWelcomeMessage} onHide={onClose} onShow={handleOnShow}
                footer={footer} maximizable={true}>
                {welcomeContent()}
                {inputForm()}
            </Dialog>
        </>
    );
};

export default ChartConfigurationSettingView;
