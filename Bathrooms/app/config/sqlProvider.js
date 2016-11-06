const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    create: sql('./sql/user/create.sql'),
    delete: sql('./sql/user/delete.sql'),
    find: sql('./sql/user/find.sql'),
  },
  posts: {
    all: sql('./sql/post/all.sql'),
    create: sql('./sql/post/create.sql'),
    delete: sql('./sql/post/delete.sql'),
    find: sql('./sql/post/find.sql'),
  },
};

module.exports = sqlProvider;
