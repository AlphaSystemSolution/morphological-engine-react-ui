import React, { useContext, useRef, useEffect, useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import Emitter from '../services/event-emitter';
import { EmitterConstants } from './emitter-constants';
import { ProjectContext } from '../store/project-store';
import ChartConfigurationSettingView from './chart-configuration-setting-view';
import { ChartConfiguration } from './model/chart-configuration';
import WelcomeDialog from './welcome-dialog';

const AppToolbar = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
    let fileUploaderRef: any = useRef(null);
    const context = useContext(ProjectContext);
    const { addProject, importProject } = context;
    let initialValue = new ChartConfiguration();

    const uploadHandler = (event: any) => {
        if (event.files) {
            importProject(event.files[0]);
        }
    }

    const handleNewProject = () => addProject();

    useEffect(() => {
        const showWelcomeMessage = () => {
            const globalConfiguration = localStorage.getItem('morphological-engine.global-configuration');
            if (!globalConfiguration) {
                setShowWelcomeDialog(true);
            }
        }

        showWelcomeMessage();
        Emitter.on(EmitterConstants.PROJECT_IMPORTED, (_) => fileUploaderRef.clear());

        return () => {
            Emitter.off(EmitterConstants.PROJECT_IMPORTED);
        }
    }, [fileUploaderRef]);

    const showSettingsDialog = () => {
        setShowSettings(true);
    }

    const onHideSettingsDialog = (chartConfiguration?: ChartConfiguration) => {
        setShowSettings(false);
        console.log(JSON.stringify(chartConfiguration));
        if (chartConfiguration) {
            initialValue = chartConfiguration;
        }
    };

    const leftContents: any = (
        <Fragment>
            <Button label="New" icon="pi pi-plus" className="p-mr-2" onClick={handleNewProject} />
            <span>&nbsp;</span>
            <FileUpload ref={(el) => fileUploaderRef = el} name="import" accept="application/json" mode="basic" chooseLabel="Import" customUpload
                uploadHandler={(event) => uploadHandler(event)} auto />
            <span>&nbsp;</span>
            <i className="pi pi-bars p-toolbar-separator p-mr-2" />
            <Button label="Settings" icon="pi pi-cog" className="p-mr-2" onClick={showSettingsDialog} />
        </Fragment>
    );

    const handleDialogSubmit = (fontName?: string) => {
        console.log(`>>>> ${fontName}`);
    }

    return (
        <Fragment>
            <WelcomeDialog arabicFontName={initialValue.arabicFontFamily} visible={showWelcomeDialog} onHide={handleDialogSubmit}/>
            <ChartConfigurationSettingView chartConfiguration={initialValue} visibile={showSettings} onHide={onHideSettingsDialog} />
            <div className="content-section implementation">
                <Toolbar left={leftContents} />
            </div>
        </Fragment>
    );
}

export default observer(AppToolbar);
