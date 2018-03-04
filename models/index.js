const Sequelize = require('sequelize')
const c = require('chalk')
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: true,
  // SQLite only
  storage: 'dbku.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

global.db = {
  con: null, // koneksi global
  // model
  Device: null,
  Pelanggan: null
}
export const Pelanggan = (global.db.Pelanggan = sequelize.define('pelanggan', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  namaLengkap: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  },
  alamat: Sequelize.STRING,
  noTelp: Sequelize.STRING,
  idTele: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  }
}))
export const Device = (global.db.Device = sequelize.define('device', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uniqueToken: Sequelize.STRING,
  pelangganId: Sequelize.STRING
}))
export const Petugas = (global.db.Petugas = sequelize.define('petugas', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  namaLengkap: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: Sequelize.STRING,
  alamat: Sequelize.STRING,
  noTelp: Sequelize.STRING
}))
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log(c.red('model created'))
  })
  .catch(console.log(c.red))
// set ping setiap 10 detik
setInterval(() => {
  sequelize
    .authenticate()
    .then(() => {
      // console.log(c.green('Connection has been established successfully.'))
    })
    .catch(err => {
      console.log(c.red('Unable to connect to the database:', err))
    })
}, 20000)
Petugas.create({
  username: 'budi',
  namaLengkap: 'tes123',
  email: 'budi@gmail.com',
  password: 'password',
  alamat: 'tes123',
  noTelp: '123'
})
console.log(chalk.red('INIT DB .......!!!!!!!!!!'))
export const con = (global.db.con = sequelize)
