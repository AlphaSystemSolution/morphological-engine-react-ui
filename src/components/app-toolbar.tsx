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

const AppToolbar = () => {
    const [showSettings, setShowSettings] = useState(false);
    let fileUploaderRef: any = useRef(null);
    const context = useContext(ProjectContext);
    const { addProject, importProject, globalConfiguration, hasGlobalConfiguration, updateGlobalConfiguration } = context;

    const uploadHandler = (event: any) => {
        if (event.files) {
            importProject(event.files[0]);
        }
    }

    const handleNewProject = () => addProject();

    useEffect(() => {
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
        if (chartConfiguration) {
            updateGlobalConfiguration(chartConfiguration);
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

    return (
        <Fragment>
            <ChartConfigurationSettingView chartConfiguration={globalConfiguration} visibile={showSettings} showWelcomeMessage={!hasGlobalConfiguration} 
               showOptionalFields={false} onHide={onHideSettingsDialog} />
            <div className="content-section implementation">
                <Toolbar left={leftContents} />
            </div>
        </Fragment>
    );
}

export default observer(AppToolbar);
