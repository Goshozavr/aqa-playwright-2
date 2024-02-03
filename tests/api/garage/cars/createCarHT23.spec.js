import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe("Create car", () => {
  let client;

  let brands;
  test("Create car", async () => {
    client = await APIClient.authenticate(USERS.POP.email, USERS.POP.password);
    const response = await client.carController.getBrands();
    brands = response.data.data;
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.A6.id,
      mileage: Math.floor(Math.random() * 100),
    });
    expect(createCarResponse.status).toBe(201);
    //carId = createCarResponse.data.data.id;
  });
  /*test("Get car by id", async (id)=> {
        const response = await client.carController.getUserCarById(id)
        expect(response.status).toBe(200)
      })*/
  /*test.afterAll(async () => {
          const userCars = await client.carController.getUserCars();
          await Promise.all(
            userCars.data.data.map((car) =>
              client.carController.deleteCarById(car.id)
            )
          );
        });*/
});
