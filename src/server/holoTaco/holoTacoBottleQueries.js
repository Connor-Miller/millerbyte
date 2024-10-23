import PostgresService from "../postgresService.js";

/**
 * Add a new bottle to the database
 * @param bottle - The bottle to add
 * @returns The result of the query
 */
export function addNewBottle(bottle) {
    const sqlString = `INSERT INTO bottles (bottleid, polishname, owneremail, isopened, isswatched, location)
    VALUES ($1, $2, $3, $4, $5, $6)`;

    const postgresService = new PostgresService();

    return postgresService.performQuery(sqlString, [bottle.bottleId, bottle.polishName, bottle.ownerEmail, bottle.opened, bottle.swatched, bottle.location]);

}

/**
 * Get all bottles by email
 * @param email - The email to get bottles for
 * @returns The result of the query
 */
export function getAllBottlesByEmail(email) {
    const sqlString = `
        SELECT 
            b.bottleid,
            p.polishname as polishname,
            p.formulaname as formulaname,
            b.isopened as isopened,
            b.isswatched as isswatched,
            p.retired,
            p.limitededition as limited,
            1 as quantity,
            b.location
        FROM 
            bottles b
        JOIN 
            polishes p ON b.polishname = p.polishname
        WHERE 
            b.owneremail = $1
    `;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [email]);
}

/**
 * Get a bottle by id
 * @param bottleId - The id of the bottle to get
 * @returns The result of the query
 */
export function getBottleById(bottleId) {
    const sqlString = `SELECT * FROM bottles WHERE bottleid = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [bottleId]);
}

/**
 * Update a bottle
 * @param bottle - The bottle to update
 * @returns The result of the query
 */
export function updateBottle(bottle) {
    const sqlString = `UPDATE bottles SET isopened = $1, isswatched = $2, location = $3 WHERE bottleid = $4`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [bottle.isOpened, bottle.isSwatched, bottle.location, bottle.bottleId]);
}

/**
 * Delete a bottle
 * @param bottleId - The id of the bottle to delete
 * @returns The result of the query
 */
export function deleteBottle(bottleId) {
    const sqlString = `DELETE FROM bottles WHERE bottleid = $1`;
    const postgresService = new PostgresService();
    return postgresService.performQuery(sqlString, [bottleId]);
}

