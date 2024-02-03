import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe("Get requests", () => {
  let client;
  let carId;

  test.beforeAll(async () => {
    client = await APIClient.authenticate(
      USERS.TRUS.email,
      USERS.TRUS.password
    );
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.Q7.id,
      mileage: 11,
    });

    carId = createCarResponse.data.data.id;
  });

  test("Get requests", async () => {
    // так мені подобається більше, нижче буде розбивка по кожному окремому запиту
    const getAllBrands = await client.carController.getBrands();
    const getAllModels = await client.carController.getModels();
    const getAllCars = await client.carController.getUserCars();
    const getSingleCar = await client.carController.getUserCarById(carId);
    const getCarBrand = await client.carController.getBrandByBrandId(carId);
    const getCarModel = await client.carController.getModelsByModelId(carId);
    expect(getAllBrands.status).toBe(200);
    expect(getAllModels.status).toBe(200);
    expect(getAllCars.status).toBe(200);
    expect(getSingleCar.status).toBe(200);
    expect(getCarBrand.status).toBe(200);
    expect(getCarModel.status).toBe(200);
  });

  /*
  test("Get all cars", async ()=> {
    const getAllCars = await client.carController.getUserCars();
    expect(getAllCars.status).toBe(200);
  })

  test("Get all brands", async ()=> {
    const getAllBrands = await client.carController.getBrands();
    expect(getAllBrands.status).toBe(200);
  })

  test("Get all models", async ()=> {
    const getAllModels = await client.carController.getModels();
    expect(getAllModels.status).toBe(200);
  })

  test("Get single car", async ()=> {
    const getSingleCar = await client.carController.getUserCarById(carId);
    expect(getSingleCar.status).toBe(200);
  })

  test("Get car brand", async ()=> {
    const getCarBrand = await client.carController.getBrandByBrandId(carId);
    expect(getCarBrand.status).toBe(200);
  })

  test("Get car model", async ()=> {
    const getCarModel = await client.carController.getModelsByModelId(carId);
    expect(getCarModel.status).toBe(200);
    
  })
  */
});
