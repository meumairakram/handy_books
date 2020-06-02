const config = {

    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET:"SUPERSOLIDSECRET",
        DATABASE:"mongodb://localhost:27017/booksShelf"
    }

}


exports.get = function (env) {

    return config[env] || config.default;

}