
require('dotenv').config()

const { env } = process

module.exports = {
	name: env.APP_NAME,
	baseUrl: env.APP_BASE_URL,
	port: env.PORT

}
