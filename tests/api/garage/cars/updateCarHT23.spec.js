import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe.only("Delete request", () => {
  let client;
  let carId;
  let carBody;
  let brandId;
  let modelId;
  let initMiliage;
  let updatedMilAt;
  let carCreAt;
  let brandName;
  let modelName;
  let logoName;

  test.beforeAll(async () => {
    client = await APIClient.authenticate(
      USERS.BYVALIJ.email,
      USERS.BYVALIJ.password
    );
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.Q7.id,
      mileage: 11,
    });
    carBody = createCarResponse.data.data;
    carId = createCarResponse.data.data.id;
    brandId = createCarResponse.data.data.carBrandId;
    modelId = createCarResponse.data.data.carModelId;
    initMiliage = createCarResponse.data.data.initMiliage;
    updatedMilAt = Date.now();
    carCreAt = createCarResponse.data.data.carCreatedAt;
    brandName = createCarResponse.data.data.brand;
    modelName = createCarResponse.data.data.model;
    logoName = createCarResponse.data.data.logo;
  });

  test("Edit car", async () => {
    const editCar = await client.carController.editCarById(carId, {
      id: carId,
      carBrandId: brandId,
      carModelId: modelId,
      initialMileage: initMiliage,
      updatedMileageAt: updatedMilAt, //"2024-02-03T17:40:24.000Z",
      carCreatedAt: carCreAt, //"2024-02-03T17:40:24.000Z",
      mileage: 28,
      brand: brandName,
      model: modelName,
      logo: logoName,
    });
    console.log(editCar);
    expect(editCar.status).toBe(200);
  });
});
