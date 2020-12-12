import { List } from 'immutable';
import { action, computed, makeAutoObservable, observable } from "mobx";
import { createContext } from 'react';
import { EmitterConstants } from '../components/emitter-constants';
import { ChartConfiguration } from '../components/model/chart-configuration';
import { InputData } from '../components/model/models';
import Emitter from '../services/event-emitter';
import Project from './project';

export class ProjectStore {

    private static GLOBAL_CONFIGURATION_KEY = 'morphological-engine.global-configuration';

    private static createNewProject(counter: number): Project {
        return new Project(`Untitled${counter}`);
    }

    @observable.shallow projects: List<Project> = List([]);
    @observable activeProjectIndex: number = 0;
    @observable globalConfiguration: ChartConfiguration = new ChartConfiguration();
    private _hasGlobalConfiguration = false;
    private transientProjects = 0;

    constructor() {
        makeAutoObservable(this);
        this.initializeGlobalConfiguration();
    }

    @action private initializeGlobalConfiguration() {
        const cc = localStorage.getItem(ProjectStore.GLOBAL_CONFIGURATION_KEY);
        if (cc) {
            this.globalConfiguration = ChartConfiguration.of(cc);
            this._hasGlobalConfiguration = true;
        }
    }

    @action private initilaizeEmptyProject = () => {
        this.transientProjects += 1;
        const project = ProjectStore.createNewProject(this.transientProjects);
        project.chartConfiguration = ChartConfiguration.of(this.globalConfiguration)
        this.projects = this.projects.push(project);
        this.activeProjectIndex = this.projects.size - 1;
    }

    @action addProject = () => {
        this.initilaizeEmptyProject();
    }

    @action importProject = (file: any) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
            const content = JSON.parse(fileReader.result as string);
            const data = content.data.map((src: any) => InputData.of(src));
            const chartConfiguration = ChartConfiguration.of(content.configuration);
            const project = new Project(content.projectName, false, chartConfiguration, List(data));
            this.projects = this.projects.push(project);
            this.activeProjectIndex = this.size - 1;
            Emitter.emit(EmitterConstants.PROJECT_IMPORTED, this.size - 1);
        }
        fileReader.onerror = () => {
            console.error(`Error reading file: ${file.name}`)
            throw new Error("Unable to read file");
        }
    }

    @action setActiveProjectIndex = (index: number) => {
        this.activeProjectIndex = index;
    }

    @action updateGlobalConfiguration = (src: ChartConfiguration) => {
        this.globalConfiguration = src;
        this._hasGlobalConfiguration = true;
        localStorage.setItem(ProjectStore.GLOBAL_CONFIGURATION_KEY, JSON.stringify(this.globalConfiguration))
    }

    @action closeProject = (projectId: string) => {
        this.projects = this.projects.filterNot((project) => project.id === projectId);
        if (this.size > 0) {
            this.activeProjectIndex = this.size - 1;
        }
    }

    @computed getProject(id: string): Project {
        return this.projects.filter((project) => id === project.id).get(0)!;
    }

    @computed get addedProject(): Project {
        return this.projects.last();
    }

    @computed get size(): number {
        return this.projects.size;
    }

    @computed get hasGlobalConfiguration(): boolean {
        return this._hasGlobalConfiguration;
    }
}

export const ProjectContext = createContext({} as ProjectStore);
