import { expect, request } from "@playwright/test";
import { test } from "../../src/fixtures/myFixtures.js";
import { STORAGE_STATE_USER_PATH } from "../../src/data/constants/storageStates.js";

test.describe("User", () => {
  /*test("should be able to create a car", async ({ userGaragePage, page }) => {
    const welcomePage = new WelcomePage(page); - це все виносимо у фікстури
    await welcomePage.visit();
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup();
    const garagePage = await signInPopup.loginWithCredentials(
      USERS.JOE_DOU.email,
      USERS.JOE_DOU.password
    );

    const popup = await userGaragePage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);

    await expect(page.locator("p", { hasText: "BMW X6" })).toBeVisible();
  });
  */

  test("should be able to create a car", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);
    const { page } = userGaragePageWithStorage;

    await expect(
      page.locator("p", { hasText: "BMW X6" }).first()
    ).toBeVisible();
  });
  // - перехоплення реквестів:
  test("should be able to create a car (event listener)", async ({
    userGaragePageWithStorage,
  }) => {
    const { page } = userGaragePageWithStorage;
    page.on("request", (request) => {
      console.log(request.url());
    }); //першою йде назва івенту, другою - лісенер

    page.on("response", async (response) => {
      console.log((await response.body()).toString());
    });
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);

    await expect(
      page.locator("p", { hasText: "BMW X6" }).first()
    ).toBeVisible();
  });

  test("should be able to create a car (intercept request)", async ({
    userGaragePageWithStorage,
  }) => {
    const { page } = userGaragePageWithStorage;
    /*await page.route("/api/cars/brands", (route) => {
      route.abort();
    }); // - надає можливості редагувати реквести та респонси*/

    await page.route("/api/cars/*", async (route) => {
      if (route.request().url().includes("brands")) {
        const headers = route.request().headers();
        headers["Accept-Encoding"] = "Identity";

        const response = await route.fetch();
        console.log(await response.json());

        await route.continue({ headers });
        return;
      }
      await route.continue();
    });

    page.on("response", (response) =>
      console.log(response.request().url(), response.request().headers())
    );

    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);

    await expect(
      page.locator("p", { hasText: "BMW X6" }).first()
    ).toBeVisible();
  });

  test("should be able to create a car (modify response)", async ({
    userGaragePageWithStorage,
  }) => {
    const { page } = userGaragePageWithStorage;
    const body = {
      status: "ok",
      data: [
        {
          id: 1,
          title: "Audi Audi Audi Audi Audi Audi",
          logoFilename: "audi.png",
        },
        {
          id: 2,
          title: "Renault",
          logoFilename: "bmw.png",
        },
      ],
    };
    await page.pause();
    await page.route("**/brands", async (route) => {
      await route.fulfill({
        // - передає те, що має повернутися на фронт, тобто тут як раз відбувається перехоплення та підміна коду
        body: JSON.stringify(body),
      });
    });

    /*page.on('console', (data)=> {
      console.log('Console event has happend', data.text())
      if (data.type() === "error"){
        throw new Error("I have broken your FE")
      }
    })*/
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);

    await expect(
      page.locator("p", { hasText: "BMW X6" }).first()
    ).toBeVisible();
    await page.pause();
  });
});

test.describe("User", () => {
  test.afterAll(async () => {
    const client = await request.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });

    const userCars = await client.get("/api/cars");
    const body = await userCars.json();

    /*for (const car of body.data){ - такий варіант теж окей, але буде довше відпрацьовувати, бо машини видалятимуться по черзі
      const response = await client.delete(`/api/cars/${car.id}`)
      console.log(response.status())
      console.log*=(response.text())
    }*/
    //console.log("User cars:", body);
    await Promise.all(
      body.data.map((car) => client.delete(`/api/cars/${car.id}`))
    );
  });

  test("API should return valid brands", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("BMW", "X6", 12);
    const { page } = userGaragePageWithStorage;

    const brandsResponse = await page.request.get("/api/cars/brands");
    const body = await brandsResponse.json();
    expect(body).toEqual({
      status: "ok",
      data: [
        {
          id: 1,
          title: "Audi",
          logoFilename: "audi.png",
        },
        {
          id: 2,
          title: "BMW",
          logoFilename: "bmw.png",
        },
        {
          id: 3,
          title: "Ford",
          logoFilename: "ford.png",
        },
        {
          id: 4,
          title: "Porsche",
          logoFilename: "porsche.png",
        },
        {
          id: 5,
          title: "Fiat",
          logoFilename: "fiat.png",
        },
      ],
    });
  });

  test("API should return user`s cars", async ({
    userGaragePageWithStorage,
  }) => {
    const { page } = userGaragePageWithStorage;

    const userCars = await page.request.get("/api/cars");
    const body = await userCars.json();
    expect(body.status).toBe("ok");
  });

  test("API should return user`s cars (fixture)", async ({ apiClient }) => {
    const brandsResponse = await apiClient.get("/api/cars");
    const body = await brandsResponse.json();
    expect(body.status).toBe("ok");
  });

  test("API should not return user`s cars", async () => {
    //const popup = await userGaragePageWithStorage.openAddCarPopup();
    //await popup.fillAndSubmit("BMW", "X6", 12);

    const client = await request.newContext();
    const brandsResponse = await client.get("/api/cars");
    const body = await brandsResponse.json();
    expect(body.status).toBe("error");
  });
});
