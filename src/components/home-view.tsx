import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TabView, TabPanel } from 'primereact/tabview';
import ProjectView from './project-view';
import { ProjectContext } from '../store/project-store';
import Emitter from '../services/event-emitter';
import { EmitterConstants } from './emitter-constants';

const HomeView = () => {
    const [refreshTab, setRefreshTab] = useState(false);
    const context = useContext(ProjectContext);
    const { projects, activeProjectIndex, setActiveProjectIndex, closeProject } = context;

    useEffect(() => {
        // after save tab title doesn't get refreshed automatically,
        // this is just to refresh tab title
        Emitter.on(EmitterConstants.PROJECT_SAVED, () => setRefreshTab(!refreshTab));
        Emitter.on(EmitterConstants.CLOSE_PROJECT, (projectId: string) => closeProject(projectId))
        return () => {
            Emitter.off(EmitterConstants.PROJECT_SAVED);
            Emitter.off(EmitterConstants.CLOSE_PROJECT);
        }
    }, [refreshTab, closeProject]);

    return (
        <TabView activeIndex={activeProjectIndex} onTabChange={(e) => setActiveProjectIndex(e.index)}>
            {
              projects.map((project) => {
                return (
                    <TabPanel header={project.projectName} key={project.id}>
                        <ProjectView project={project} />
                    </TabPanel>
                );
            })  
            }
        </TabView>
    );
};

export default observer(HomeView);
