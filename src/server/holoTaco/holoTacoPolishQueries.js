import PostgresService from "../postgresService.js";

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
export function getPolishByName(polishName) {
    const sqlString = `SELECT * FROM polishes WHERE polishname = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polishName]);
}

/**
 * Add a new polish to the database
 * @param polish - The polish to add
 * @returns The result of the query
 */
export function addNewPolish(polish) {
    const sqlString = `INSERT INTO polishes (polishname, formulaname, retired, limitededition, releaseDate, collectionName)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polish.polishname, polish.formulaname, polish.retired, polish.limitededition, polish.releaseDate, polish.collectionName]);
}

/**
 * Update a polish
 * @param polish - The polish to update
 * @returns The result of the query
 */
export function updatePolish(polish) {
    const sqlString = `UPDATE polishes SET formulaname = $1, retired = $2, limitededition = $3, releaseDate = $4, collectionName = $5 WHERE polishname = $6`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polish.formulaname, polish.retired, polish.limitededition, polish.releaseDate, polish.collectionName, polish.polishname]);
}

/**
 * Delete a polish
 * @param polishName - The name of the polish to delete
 * @returns The result of the query
 */
export function deletePolish(polishName) {
    const sqlString = `DELETE FROM polishes WHERE polishname = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [polishName]);
}

