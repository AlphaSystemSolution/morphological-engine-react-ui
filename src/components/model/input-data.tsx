import { v4 as uuid } from 'uuid';
import { Utils } from "../../utils/utils";
import { ConjugationData } from "./conjugation-data";
import { ConjugationConfiguration } from "./models";
import { NamedTemplate } from "./named-template";
import { RootLetters } from "./root-letters";
import { VerbalNoun } from "./verbal-noun";

export class InputData {

    public static of(src: any): InputData {
        return new InputData(
            RootLetters.of(src.rootLetters),
            NamedTemplate.getByName(src.family.name),
            src.translation ? src.translation : "",
            src.removePassiveLine,
            src.skipRuleProcessing,
            src.verbalNouns ? src.verbalNouns.map((vn: any) => vn.name).map((name: string) => VerbalNoun.getByName(name)) : [],
            src.id
        );
    }

    constructor(
        public rootLetters: RootLetters = new RootLetters(),
        public family: NamedTemplate = NamedTemplate.FORM_I_CATEGORY_A_GROUP_U_TEMPLATE,
        public translation: string = "",
        public removePassiveLine: boolean = false,
        public skipRuleProcessing: boolean = false,
        public verbalNouns: VerbalNoun[] = [],
        public id: string = uuid()
    ) { }

    public toConjugationData() {
        return new ConjugationData(
            this.rootLetters.toRootLetters(),
            this.family.name,
            new ConjugationConfiguration(this.removePassiveLine, this.skipRuleProcessing),
            this.translation,
            this.verbalNouns.map((vn) => vn.name),
            this.id
        );
    }

    public copy(): InputData {
        return new InputData(
            this.rootLetters.copy(),
            this.family.copy(),
            this.translation,
            this.removePassiveLine,
            this.skipRuleProcessing,
            Utils.copyArray(this.verbalNouns),
            this.id
        );
    }
}