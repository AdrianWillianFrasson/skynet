import { db, Sensor } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Sensor).values({ name: "Sensor 1" });

  // const queries = [];

  // for (let i = 0; i < 1000000; i++) {
  //   queries.push(db.insert(SensorData).values({ sensorId: 1, value: i }));
  // }

  // await db.batch(queries);
}
