export interface BaseMapper<E, D, O = never> {
    toDto(entity: E, options?: O): D;
    fromDto?(dto: D): E;
}
