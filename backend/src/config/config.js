// check env.
const env = process.env.NODE_ENV || 'development';

if (env == 'development') {
    process.env["PORT"] = process.env.PORT || 8080;
    process.env["MONGODB_URI"] = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://sasproject:3MRwQc3azxDJfOZ1cAOg7lqE9ffx0fmb2YQcJTuRcxiG3PdYS3s2qgzWMNrb8ajC7UVA1ibIKUlo9WueBbiNMg==@sasproject.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sasproject@';
    process.env["JWT_SECRET"] = 'SECRET#123';
    process.env["JWT_EXP"] = '60m';
} else {
    process.env["PORT"] = process.env.PORT || 8080;
    process.env["MONGODB_URI"] = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://sasproject:3MRwQc3azxDJfOZ1cAOg7lqE9ffx0fmb2YQcJTuRcxiG3PdYS3s2qgzWMNrb8ajC7UVA1ibIKUlo9WueBbiNMg==@sasproject.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sasproject@';
    process.env["JWT_SECRET"] = 'SECRET#123';
    process.env["JWT_EXP"] = '2m';
}