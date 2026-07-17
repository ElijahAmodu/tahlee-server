import type { QueryResultRow } from "pg";
export declare function query<T extends QueryResultRow>(text: string, params?: unknown[]): Promise<T[]>;
//# sourceMappingURL=query.d.ts.map