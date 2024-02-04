import { test } from "../../src/fixtures/myFixture";
import { expect } from "@playwright/test";
import { STORAGE_STATE_USER_PATH } from "../../src/data/constants/storageStates";

test.describe("Profile", () => {
  test("Mock and modify user data", async ({ userProfilePageWithStorage }) => {
    const { page } = userProfilePageWithStorage;
    const body = {
      status: "ok",
      data: {
        userId: 1,
        photoFilename: "default-user.png",
        name: "Grzegorz",
        lastName: "Brzęczyszczykiewicz",
      },
    };

    await page.route("**/users/profile", async (route) => {
      console.log(route);
      await route.fulfill({
        body: JSON.stringify(body),
      });
    });
    page.reload();
    await page.pause();
  });
});

test.describe("Cars", () => {
  test("Create a new car", async ({ userGaragePageWithStorage }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    const { page } = userGaragePageWithStorage;
    const requestBody = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };
    const createRequest = await page.request.post("/api/cars", requestBody);
    const body = await createRequest.json();
    expect(createRequest.status()).toBe(200);
    expect(body).toEqual(requestBody);
    console.log(body);
  });

  test("Create a new car without brand id", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    const { page } = userGaragePageWithStorage;
    const requestBody = {
      carModelId: 1,
      mileage: 122,
    };
    const createRequest = await page.request.post("/api/cars", requestBody);
    const body = await createRequest.json();
    expect(createRequest.status()).toBe(400);
  });
  test("Create a new car without model id", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    const { page } = userGaragePageWithStorage;
    const requestBody = {
      carBrandId: 1,
      mileage: 122,
    };
    const createRequest = await page.request.post("/api/cars", requestBody);
    const body = await createRequest.json();
    expect(createRequest.status()).toBe(400);
  });
}); //
