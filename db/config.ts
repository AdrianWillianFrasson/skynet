import { defineDb, defineTable, column, sql, NOW } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`uuid()` }),
    name: column.text({ default: "" }),
    age: column.number({ default: 0 }),
  },
});

const Sensor = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ default: "" }),
  },
});

const SensorData = defineTable({
  columns: {
    sensorId: column.number({ references: () => Sensor.columns.id }),
    timestamp: column.date({ default: NOW }),
    value: column.number({ default: 0 }),
  },
  indexes: [{ on: "sensorId" }],
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Sensor,
    SensorData,
  },
});
