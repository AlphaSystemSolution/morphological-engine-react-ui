export enum PageOrientation {
    PORTRAIT = 'PORTRAIT',
    LANDSCAPE = 'LANDSCAPE'
}

export class PageOption {

    constructor(public orientation: string = PageOrientation.PORTRAIT) { }

    public static of(src?: any): PageOption {
        return src ? new PageOption(src.orientation) : new PageOption()
    }
}

export class ChartConfiguration {

    constructor(
        public omitToc = false,
        public omitAbbreviatedConjugation = false,
        public omitDetailedConjugation = false,
        public omitTitle = false,
        public omitHeader = true,
        public omitSarfTermCaption = false,
        public sortDirective = 'NONE',
        public sortDirection = 'ASCENDING',
        public arabicFontFamily = 'KFGQPC Uthman Taha Naskh',
        public translationFontFamily = 'Candara',
        public arabicFontSize = 14,
        public translationFontSize = 12,
        public headingFontSize = 30,
        public pageOption: PageOption = new PageOption()) { }

    public static of(src?: any): ChartConfiguration {
        if (src) {
            return new ChartConfiguration(
                src.omitToc,
                src.omitAbbreviatedConjugation,
                src.omitDetailedConjugation,
                src.omitTitle,
                src.omitHeader,
                src.omitSarfTermCaption,
                src.sortDirective,
                src.sortDirection,
                src.arabicFontFamily,
                src.translationFontFamily,
                src.arabicFontSize,
                src.translationFontSize,
                src.headingFontSize,
                PageOption.of(src.pageOption)
            );
        }
        return new ChartConfiguration();
    }
}
