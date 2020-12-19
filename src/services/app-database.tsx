import Dexie from 'dexie';
import { List } from 'immutable';
import { ChartConfiguration } from '../components/model/chart-configuration';
import { InputData } from '../components/model/input-data';
import { NamedTemplate } from '../components/model/named-template';
import { RootLetters } from '../components/model/root-letters';
import { VerbalNoun } from '../components/model/verbal-noun';
import Project from '../store/project';

export class AppDatabase extends Dexie {

    public projects: Dexie.Table<ProjectInfo, string>
    public inputCharts: Dexie.Table<InputChart, string>;

    constructor() {
        super("MorphologicalEngine");

        this.version(1).stores({
            projects: '&id, projectName',
            inputCharts: '&id, projectId'
        });

        this.projects = this.table('projects')
        this.inputCharts = this.table('inputCharts');
    }

    public async saveProject(project: Project) {
        const inputCharts = project.data.map((inputData) => this.toInputChart(project.id, inputData)).toArray();
        return Promise.all([
            this.projects.put({
                id: project.id,
                projectName: project.projectName,
                chartConfiguration: project.chartConfiguration
            }),
            this.inputCharts.bulkPut(inputCharts)
        ]).then((values) => values[0]);
    }

    public async findProject(id: string) {
        const projectInfo = await this.projects.where("id").equals(id).first()
        if (projectInfo) {
            return Promise.all([
                this.findInputChartsByProjectId(id)
            ]).then((values) => {
                const datas = List(values[0].map(src => InputData.of(src)));
                const project = new Project(projectInfo.projectName, false, projectInfo.chartConfiguration, datas);
                project.id = id;
                return project;
            });
        }
        return Promise.resolve(undefined);
    }

    private async findInputChartsByProjectId(projectId: string) {
        return this.inputCharts.where("projectId").equals(projectId).toArray();
    }

    public async addInputChart(projectId: string, inputData: InputData) {
        return this.inputCharts.put(this.toInputChart(projectId, inputData));
    }

    private toInputChart(projectId: string, inputData: InputData) {
        return {
            id: inputData.id,
            projectId: projectId,
            rootLetters: inputData.rootLetters,
            family: inputData.family,
            translation: inputData.translation,
            removePassiveLine: inputData.removePassiveLine,
            skipRuleProcessing: inputData.skipRuleProcessing,
            verbalNouns: inputData.verbalNouns
        };
    }
}

interface ProjectInfo {
    id: string
    projectName: string
    chartConfiguration: ChartConfiguration
}

interface InputChart {
    id: string
    projectId: string
    rootLetters: RootLetters
    family: NamedTemplate
    translation: string
    removePassiveLine: boolean,
    skipRuleProcessing: boolean,
    verbalNouns: VerbalNoun[]
}

export const db = new AppDatabase();
