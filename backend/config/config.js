// check env.
const env = process.env.NODE_ENV || 'development';

if (env == 'development') {
    process.env["PORT"] = process.env.PORT || 8080;
    process.env["MONGODB_URI"] = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://saas-construction-db:t6E8S7Tz7qIND930OlEbbFeNDf9MSEVrEh5hKn08orNUZ2dIibRRKLSQsPKVvOeUvsLqa2trf70y1aJi0NUIuw==@saas-construction-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@saas-construction-db@';
    process.env["JWT_SECRET"] = 'SECRET#123';
    process.env["JWT_EXP"] = '60m';
} else {
    process.env["PORT"] = process.env.PORT || 8080;
    process.env["MONGODB_URI"] = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://saas-construction-db:t6E8S7Tz7qIND930OlEbbFeNDf9MSEVrEh5hKn08orNUZ2dIibRRKLSQsPKVvOeUvsLqa2trf70y1aJi0NUIuw==@saas-construction-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@saas-construction-db@';
    process.env["JWT_SECRET"] = 'SECRET#123';
    process.env["JWT_EXP"] = '2m';
}