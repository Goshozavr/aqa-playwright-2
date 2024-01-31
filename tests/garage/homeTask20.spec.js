import { test } from "../src/fixtures/myFixture";
import { expect } from "@playwright/test";
import { STORAGE_STATE_USER_PATH } from "../src/data/constants/storageStates";

test.describe("Profile", () => {
  /*test.only("should be able to create a car (event listener)", async ({
    userProfilePageWithStorage,
  }) => {
    const { page } = userProfilePageWithStorage;
    page.on("request", (request) => {
      console.log(request.url());
    }); //першою йде назва івенту, другою - лісенер

    page.on("response", async (response) => {
      console.log((await response.body()).toString());
    });
    await page.pause();
    /*const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);

    await expect(
      page.locator("p", { hasText: "BMW X6" }).first()
    ).toBeVisible();
  });*/

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

    await page.route("**/profile", async (route) => {
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
    //await popup.fillAndSubmit("BMW", "X6", 12);
    const { page } = userGaragePageWithStorage;

    const createRequest = await page.request.post("/api/cars");
    //const brandsResponse = await page.request.post("/api/cars");
    const body = await createRequest.json([
      {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    ]);
    expect(createRequest.status).toBe(201);
    expect(body.data).toBeTruthy(/*{
      status: "ok",
      data: [
        {
          id: Number(), //94,
          carBrandId: Number(),
          carModelId: Number(),
          initialMileage: Number(),
          updatedMileageAt: Date(), //"2021-05-17T15:26:36.000Z",
          mileage: Number(),
          brand: String(),
          model: String(),
          logo: String(),
        },
      ],
    }*/);
    console.log(body);
    await page.pause();
  });
});
