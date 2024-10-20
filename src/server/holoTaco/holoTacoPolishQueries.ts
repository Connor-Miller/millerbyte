import PostgresService from "../postgresService";
import { TacoPolish } from "../../utils/holoTacoTypes";

/**
 * Get all polishes
 * @returns The result of the query
 */
export function getAllPolishes() {
    const sqlString = `SELECT * FROM polishes`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, []);
}

/**
 * Get a polish by name
 * @param polishName - The name of the polish to get
 * @returns The result of the query
 */
export function getPolishByName(polishName: string) {
    const sqlString = `SELECT * FROM polishes WHERE polishName = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polishName]);
}

/**
 * Add a new polish to the database
 * @param polish - The polish to add
 * @returns The result of the query
 */
export function addNewPolish(polish: TacoPolish) {
    const sqlString = `INSERT INTO polishes (polishName, formulaName, retired, limitedEdition, releaseDate, collectionName)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polish.polishName, polish.formulaName, polish.retired, polish.limitedEdition, polish.releaseDate, polish.collectionName]);
}

/**
 * Update a polish
 * @param polish - The polish to update
 * @returns The result of the query
 */
export function updatePolish(polish: TacoPolish) {
    const sqlString = `UPDATE polishes SET formulaName = $1, retired = $2, limitedEdition = $3, releaseDate = $4, collectionName = $5 WHERE polishName = $6`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polish.formulaName, polish.retired, polish.limitedEdition, polish.releaseDate, polish.collectionName, polish.polishName]);
}

/**
 * Delete a polish
 * @param polishName - The name of the polish to delete
 * @returns The result of the query
 */
export function deletePolish(polishName: string) {
    const sqlString = `DELETE FROM polishes WHERE polishName = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polishName]);
}

