export {};

declare global {
    export type Uuid = string & { _uuidBrand: undefined };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-redundant-type-constituents
    export type Todo = any & { _todoBrand: undefined };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    // interface Array<T> {
    //     toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];

    //     getByLanguage(this: CreateTranslationDto[], languageCode: LanguageCode): string;

    //     toPageDto<Dto extends AbstractDto>(
    //         this: T[],
    //         pageMetaDto: PageMetaDto,
    //         // FIXME make option type visible from entity
    //         options?: unknown
    //     ): PageDto<Dto>;
    // }
}
