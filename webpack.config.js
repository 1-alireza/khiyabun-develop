const { getDefaultConfig } = require('expo/webpack-config');

module.exports = async (env, argv) => {
    const config = await getDefaultConfig(env, argv);

    return config;
};