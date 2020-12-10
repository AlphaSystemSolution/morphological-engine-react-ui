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
        this.initilaizeEmptyProject(1);
        this.initializeGlobalConfiguration();
    }

    @action private initializeGlobalConfiguration() {
        const cc = localStorage.getItem(ProjectStore.GLOBAL_CONFIGURATION_KEY);
        if (cc) {
            this.globalConfiguration = ChartConfiguration.of(cc);
            this._hasGlobalConfiguration = true;
        } 
    }

    @action private initilaizeEmptyProject(counter: number) {
        const project = ProjectStore.createNewProject(counter);
        this.projects = this.projects.push(project);
        this.activeProjectIndex = this.projects.size - 1;
        this.transientProjects += 1;
    }

    @action addProject = () => {
        this.transientProjects += 1;
        this.initilaizeEmptyProject(this.transientProjects);
    }

    @action importProject = (file: any) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
            const content = JSON.parse(fileReader.result as string);
            const data = content.data.map((src: any) => InputData.of(src));
            const project = new Project(content.projectName, false, ChartConfiguration.of(content.configuration), List(data));
            this.projects = this.projects.push(project);
            this.activeProjectIndex = this.projects.size - 1;
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
