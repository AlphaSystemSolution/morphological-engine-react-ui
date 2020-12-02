import { FC, useState } from 'react';
import { ChartConfiguration, PageOption } from './model/chart-configuration';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';

interface Props {
    chartConfiguration: ChartConfiguration;
    visibile: boolean;
    onHide(chartConfiguration?: ChartConfiguration): void
}

const ChartConfigurationSettingView: FC<Props> = ({ chartConfiguration, visibile, onHide }) => {
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

    const inputForm = () => {
        const updateFontFamily = (e: any) => {
            const elem: HTMLInputElement = e.target;
            const id = elem.id;
            let value: string = elem.value;
            const nonEmpty = value && value.trim().length >= 0;
            switch (id) {
                case 'arabicFontFamily':
                    value = nonEmpty ? value : defaultChartConfiguration.arabicFontFamily;
                    setArabicFontFamily(value);
                    break;
                case 'translationFontFamily':
                    value = nonEmpty ? value : defaultChartConfiguration.translationFontFamily;
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
        const pageOrientationOptions = ['PORTRAIT', 'LANDSCAPE'];

        return (
            <div className="p-fluid">
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
                    {
                        /*
                        <div className="p-field-checkbox p-grid">
                        <Checkbox id="omitAbbreviatedConjugation" value={initialConfiguration.omitAbbreviatedConjugation} />
                        <label htmlFor="omitAbbreviatedConjugation" style={{ fontWeight: 'bold' }}>
                            <small>Omit Abbreviated Conjugation</small>
                        </label>
                    </div>
                    <div className="p-field-checkbox">
                        <div className="p-field-checkbox p-grid">
                            <Checkbox id="omitDetailedConjugation" value={initialConfiguration.omitDetailedConjugation} />
                            <label htmlFor="omitDetailedConjugation" style={{ fontWeight: 'bold' }}>
                                <small>Omit Detailed Conjugation</small>
                            </label>
                        </div>
                    </div>
                        */
                    }
                </div>
                <div>&nbsp;</div>
                <div className="p-formgroup-inline">
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="sortDirective" style={{ fontWeight: 'bold' }}>
                            <small>Sort Directive:</small>
                        </label>
                        <Dropdown id="sortDirective" value={sortDirective} options={sortDirectiveOptions} onChange={updateDropdownOption} />
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="sortDirection" style={{ fontWeight: 'bold' }}>
                            <small>Sort Direction:</small>
                        </label>
                        <Dropdown id="sortDirection" value={sortDirection} options={sortDirectionOptions} onChange={updateDropdownOption} />
                    </div>
                    <div className="p-field-checkbox p-grid">
                        <label htmlFor="pageOrientation" style={{ fontWeight: 'bold' }}>
                            <small>Page Orientation:</small>
                        </label>
                        <Dropdown id="pageOrientation" value={pageOrientation} options={pageOrientationOptions} onChange={updateDropdownOption} />
                    </div>
                </div>
            </div>
        );
    };

    const onClose = () => {
        if (!formSubmitted) {
            onHide();
        }
    }

    const onCancel = () => {
        setFormSubmitted(true);
        onHide();
    }

    const onSubmit = () => {
        setFormSubmitted(true);
        onHide(
            new ChartConfiguration(
                omitToc,
                false,
                false,
                omitTitle,
                omitHeader,
                omitSarfTermCaption,
                sortDirective,
                sortDirection,
                arabicFontFamily,
                translationFontFamily,
                arabicFontSize,
                translationFontSize,
                headingFontSize,
                new PageOption(pageOrientation)
            )
        );
    }

    const footer = (
        <div>
            <Button label="Cancel" onClick={onCancel} className="p-button-text" />
            <Button label="Save" onClick={onSubmit} autoFocus />
        </div>
    );


    return (
        <Dialog header="Chart configuration for Word export" visible={visibile} onHide={onClose} onShow={handleOnShow} footer={footer} maximizable={true}>
            {inputForm()}
        </Dialog>
    );
};

export default ChartConfigurationSettingView;
