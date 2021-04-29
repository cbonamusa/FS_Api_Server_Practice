/* PARTE DE BASE DE DATOS */
const { Pool } = require('pg')

const config = require('./config')
const pool = new Pool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
});

const getForumsSQL = `
    SELECT * FROM forums;
`;

const getForums = async () => {
    const result = await pool.query(getForumsSQL);
    return result.rows;
}

/* INSERTAR EN FORO */
const newForumSQL =  ` 
 INSERT INTO forums (name) VALUES ($1) 
    RETURNING *;
`;

const newForum = async (name) => {
    const result = await pool.query(newForumSQL, [name]);
    return result.rows[0];
}

/* PARA APP.PUT */
const updateForumSQL =  `
    UPDATE forums SET name = $2 WHERE forum_id = $1
        RETURNING *;
`;

const updateForum = async (forum_id, name) => {
    try {
        const result = await pool.query(updateForumSQL, [forum_id, name]);
        if (result.rowCount < 1) {
            return { ok: true, found: false };
        }
        return {ok: true, found: true, data: result.rows[0] };
    } catch (e) {
        return { ok: false, data: e.toString() };
    }
}


/* PARA APP.DELETE */
const deleteForumSQL = ` 
DELETE FROM forums WHERE forum_id = $1
    RETURNING * ;
`
const deleteForum = async (forum_id) => {
    try {
        const result = await pool.query(deleteForumSQL, [forum_id]);
        if (result.rowCount < 1) {
            return { ok: true, found: false };
        }
        return {ok: true, found: true, data: result.rows[0] };
    } catch (e) {
        return { ok: false, data: e.toString() };
    }

}



module.exports = {
    getForums,
    newForum,
    updateForum,
    deleteForum,
};