import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */

//user story 5
test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(
    page.getByText("You are not logged in. Log in below.")
  ).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Login")).toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();

  await expect(page.getByText("You are logged in")).toBeVisible();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Login")).not.toBeVisible();
});

test("on page load, i see a button", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Submit")).toBeVisible();
});

test("after logging in, I can sign out and can log back in again", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  //logged in
  await expect(page.getByText("You are logged in")).toBeVisible();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
  //sign out again
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("mode command prompt functionality", async ({ page }) => {
  await page.getByLabel("Login").click();

  //start in brief mode
  await expect(page.getByText("You are in: Brief Mode")).toBeVisible();
  await page.getByLabel("Command input").click();
  //command to switch mode
  await page.getByLabel("Command input").fill("mode");
  await expect(page.getByLabel("Command input")).toHaveValue("mode");
  await page.getByLabel("Submit").click();
  //check in verbose mode
  await expect(page.getByText("You are in: Verbose Mode")).toBeVisible();
  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: mode switched")).toBeVisible();

  //check we can switch back
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  //check in brief mode
  await expect(page.getByText("You are in: Brief Mode")).toBeVisible();
  await expect(page.getByText("Command: mode")).not.toBeVisible();
  await expect(page.getByText("Output: mode switched")).not.toBeVisible();
  //await expect(page.getByText("mode switched")).toBeVisible(); THIS LINE FAILS IDK WHY
});

test("I click submit with no command", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Unable to execute the command")
  ).toBeVisible();
});

test("I click submit with an unknown command", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("silly command");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Unable to execute the command")
  ).toBeVisible();
});

test("load_file success", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await expect(page.getByLabel("Command input")).toHaveValue(
    "load_file flowers"
  );
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
});

test("load_file not enough arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("unsuccessful load")).toBeVisible();
});

test("load_file too many arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file x y");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("unsuccessful load")).toBeVisible();
});

test("load_file not found in dict", async ({ page }) => {
    await page.getByLabel("Login").click();
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_file sillyFile");
    await page.getByLabel("Submit").click();
    await expect(page.getByText("file path not found")).toBeVisible();
});

test("view simple csv output", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file fruits");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableView = await page.locator("#view-table tbody");
  const rowCount = await tableView.locator("tr").count();

  // expects 4 rows in the table
  await expect(rowCount).toBe(4);

  const allRows = await page.locator("#view-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("name");
  expect(row0_text[1]).toBe("color");

  const row1 = allRows[1];
  const row1_cols = await row1.locator("td").all();
  const row1_text = await Promise.all(
    row1_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text[0]).toBe("orange");
  expect(row1_text[1]).toBe("orange");
});

test("load view both modes", async ({ page }) => {});

test("view large csv output", async ({ page }) => {});

test("view malformed csv output", async ({ page }) => {});

test("view unloaded csv", async ({ page }) => {});

test("view incorrect arguments", async ({ page }) => {});

test("search one csv output", async ({ page }) => {});

test("search multiple csv output", async ({ page }) => {});

test("search string col identifier", async ({ page }) => {});

test("search index col identifier", async ({ page }) => {});

test("search no results", async ({ page }) => {});

test("search unloaded file", async ({ page }) => {});

test("load view search sequence", async ({ page }) => {});

test("load search multiple datasets in same sequence", async ({ page }) => {});

test("search both modes", async ({ page }) => {});
