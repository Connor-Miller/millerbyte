import PostgresService from "../postgresService";
import { TacoCollector } from "../../utils/holoTacoTypes";

/**
 * Add a new collector to the database
 * @param collector - The collector to add
 * @returns The result of the query
 */
export function addNewCollector(collector: TacoCollector) {
    const sqlString = `INSERT INTO collectors (name, email, lastLoginDate, joinDate)
    VALUES ($1, $2, $3, $4)`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [collector.name, collector.email, collector.lastLoginDate, collector.joinDate]);
}

/**
 * Get a collector by email
 * @param email - The email of the collector to get
 * @returns The result of the query
 */
export function getCollectorByEmail(email: string) {
    const sqlString = `SELECT * FROM collectors WHERE email = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [email]);
}

/**
 * Update a collector
 * @param collector - The collector to update
 * @returns The result of the query
 */
export function updateCollector(collector: TacoCollector) {
    const sqlString = `UPDATE collectors SET name = $1, lastLoginDate = $2 WHERE email = $3`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [collector.name, collector.lastLoginDate, collector.email]);
}

/**
 * Delete a collector
 * @param email - The email of the collector to delete
 * @returns The result of the query
 */
export function deleteCollector(email: string) {
    const sqlString = `DELETE FROM collectors WHERE email = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [email]);
}

