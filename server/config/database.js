import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  database: "sequalize_example",
  password: "",
  username: "root",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Database connected successfully.");
} catch (error) {
  console.log("Hubo un error", error);
}

export default sequelize;
