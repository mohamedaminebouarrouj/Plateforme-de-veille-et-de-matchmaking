//CONFIG DE L'URL DES API
export var apiConfig = {
    baseUrl: 'http://localhost:5000',

};

if (process.env.NODE_ENV === 'production') {
    apiConfig.baseUrl='http://20.56.88.85/api'
}


