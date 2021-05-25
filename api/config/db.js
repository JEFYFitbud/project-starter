const fs = require('fs');
const path = require('path');
const config = require('./config.json');
exports.config = () => {
    if (process.env.NODE_ENV !== 'production') return;
    const host = process.env.MYSQL_SERVICE_HOST;
    const pwd = process.env.MYSQL_PROD_PASSWORD;
    if (!host) throw new Error('MySQL Service Not Found');
    if (!pwd) throw new Error('MySQL Password Not Found');
    if (config.production.host === host && config.production.password) return;
    config.production.host = host;
    config.production.password = pwd;
    fs.writeFileSync(
        path.join(__dirname, 'config.json'),
        JSON.stringify(config)
    );
};