
/* Usaremos el entorno para tener esta info */
const checkEnvVar = (name) => {
    if (name in process.env) {
        return process.env[name]
    }
    throw new Error(`Missing environtment variable ${name}`)
}
module.exports = {
    DB_HOST: checkEnvVar('DB_HOST'),
    DB_PORT: checkEnvVar('DB_PORT'),
    DB_USER: checkEnvVar('DB_USER'),
    DB_PASSWORD: checkEnvVar('DB_PASSWORD'),
    DB_DATABASE: checkEnvVar('DB_DATABASE'),
    SERVER_PORT: checkEnvVar('SERVER_PORT'),
};
