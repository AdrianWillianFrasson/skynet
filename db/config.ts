import { column, defineDb, defineTable, NOW, sql } from "astro:db";

const User = defineTable({
  columns: {
    age: column.number({ default: 0 }),
    id: column.text({ default: sql`uuid()`, primaryKey: true }),
    name: column.text({ default: "" }),
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
    Sensor,
    SensorData,
    User,
  },
});
