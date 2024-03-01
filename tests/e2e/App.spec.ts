import { expect, test } from "@playwright/test";

/**
 * Setting up before each test runs
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * Check to see there is a login button upon page loading.
 */
test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(
    page.getByText("You are not logged in. Log in below.")
  ).toBeVisible();
});
/**
 * Check to see they can't see the command input box until after they are logged in. - User story 5
 */
test("on page load, i dont see the input box until login", async ({ page }) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();

  //security - if they cant see the command input box then they cant input commands
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Login")).toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();

  await expect(page.getByText("You are logged in")).toBeVisible();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});
/**
 * Check a submit button is visible after logging in
 */
test("on page login, i see a submit button", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Submit")).toBeVisible();
});
/**
 * Can sign in and sign out multiple times
 */
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
/**
 * Check functionality of "mode" command and ensure both brief and verbose modes display appropriate output.
 */
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

  //should be two instances of mode switched in the history
  await expect(page.getByText("mode switched").nth(0)).toBeVisible();
  await expect(page.getByText("mode switched").nth(1)).toBeVisible();
});
/**
 * Checks output when you click submit with no command input
 */
test("I click submit with no command", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Unable to execute the command")
  ).toBeVisible();
});
/**
 * Checks outut when you click submit with an unknown input
 */
test("I click submit with an unknown command", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("silly command");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Unable to execute the command")
  ).toBeVisible();
});
/**
 * Check successful loading of a file
 */
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
/**
 * Check "load_file" command with not enough arguments
 */
test("load_file not enough arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("unsuccessful load")).toBeVisible();
});
/**
 * Check "load_file" command with too many arguments
 */
test("load_file too many arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file x y");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("unsuccessful load")).toBeVisible();
});
/**
 * Check output when you load a file not found
 */
test("load_file not found in dict", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file sillyFile");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("file path not found")).toBeVisible();
});
/**
 * Check output when loading a malformed CSV
 */
test("load malformed csv", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file malformed");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Your CSV is malformed. Unsuccessful.")
  ).toBeVisible();
});
/**
 * Check output when loading an empty CSV
 */
test("load empty csv", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Your CSV is empty. Unsuccessful.")
  ).toBeVisible();
});
/**
 * Check successful "view"
 */
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
/**
 * Check view in both modes
 */
test("load view both modes", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file fruits");
  await page.getByLabel("Submit").click();
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

  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  //check in verbose mode
  await expect(page.getByText("You are in: Verbose Mode")).toBeVisible();
  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: mode switched")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  //two tables in history should now have "command: view" and "output:"" with the table
  await expect(page.getByText("Command: view").nth(0)).toBeVisible(); //1st occurance now visible
  await expect(page.getByText("Command: view").nth(1)).toBeVisible(); //2nd occurance

  await expect(page.getByText("Output:").nth(0)).toBeVisible(); //1st occurance now visible
  await expect(page.getByText("Output:").nth(1)).toBeVisible(); //2nd occurance

  const allRows_table2 = await page.locator("#view-table tbody tr").all();

  const row2 = allRows_table2[2];
  const row2_cols = await row2.locator("td").all();
  const row2_text = await Promise.all(
    row2_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row2_text[0]).toBe("apple");
  expect(row2_text[1]).toBe("red");
});
/**
 * Check output when trying to view an unloaded csv
 */
test("view unloaded csv", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("please load a file first")).toBeVisible();
});
/**
 * Check "view" command with incorrect arguments
 */
test("view incorrect arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file fruits");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view xyz");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("incorrect number of arguments")).toBeVisible();
});
/**
 * Check search command with one row output
 */
test("search returns one row", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file exampleCSV1");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  //number col identifier
  await page.getByLabel("Command input").fill("search 0 sophia");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  await expect(rowCount).toBe(1);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("sophia");
  expect(row0_text[1]).toBe("sagittarius");
  expect(row0_text[2]).toBe("blue");
});
/**
 * Check search command with multiple row outputs
 */
test("search returns multiple rows", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  //string col identifier
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //4 results
  await expect(rowCount).toBe(4);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("lily");
  expect(row0_text[1]).toBe("blue");

  const row1 = allRows[1];
  const row1_cols = await row1.locator("td").all();
  const row1_text = await Promise.all(
    row1_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text[0]).toBe("lily");
  expect(row1_text[1]).toBe("green");

  const row2 = allRows[2];
  const row2_cols = await row2.locator("td").all();
  const row2_text = await Promise.all(
    row2_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row2_text[0]).toBe("lily");
  expect(row2_text[1]).toBe("pink");

  const row3 = allRows[3];
  const row3_cols = await row3.locator("td").all();
  const row3_text = await Promise.all(
    row3_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row3_text[0]).toBe("lily");
  expect(row3_text[1]).toBe("green");
});
/**
 * Check search using a string as the column identifier
 */
test("search string col identifier", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //two results
  await expect(rowCount).toBe(4);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("lily");
  expect(row0_text[1]).toBe("blue");
});
/**
 * Check search using an index column identifier
 */
test("search index col identifier", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 blue");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //two results
  await expect(rowCount).toBe(2);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("lily");
  expect(row0_text[1]).toBe("blue");
});
/**
 * Check search when no results are found
 */
test("search no results", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search flower sillyflower");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("query not found")).toBeVisible();
});
/**
 * Check trying to search an unloaded file
 */
test("search unloaded file", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("please load a file first")).toBeVisible();
});
/**
 * Check searching two different queries on the same csv
 */
test("search two different queries, same csv", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  await expect(rowCount).toBe(4);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row1 = allRows[1];
  const row1_cols = await row1.locator("td").all();
  const row1_text = await Promise.all(
    row1_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text[0]).toBe("lily");
  expect(row1_text[1]).toBe("green");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 blue");
  await page.getByLabel("Submit").click();

  const tableSearch2 = await page.locator("#search-table tbody").nth(1);
  const rowCount2 = await tableSearch2.locator("tr").count();

  //two results
  await expect(rowCount2).toBe(2);

  const allRows2 = await page.locator("#search-table tbody tr").all();

  const row0 = allRows2[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("lily");
  expect(row0_text[1]).toBe("blue");
});
/**
 * Check viewing and searching on a csv with one column
 */
test("view search one column data", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  //load
  await page.getByLabel("Command input").fill("load_file oneCol");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  //view
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  const tableView = await page.locator("#view-table tbody");
  const rowCountView = await tableView.locator("tr").count();

  //check full table
  await expect(rowCountView).toBe(3);

  const allRowsView = await page.locator("#view-table tbody tr").all();

  const row0_view = allRowsView[0];
  const row0_cols_view = await row0_view.locator("td").all();
  const row0_text_view = await Promise.all(
    row0_cols_view.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text_view[0]).toBe("insect");
  expect(row0_text_view.length).toBe(1);

  //search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 reptile");
  await page.getByLabel("Submit").click();

  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //check only search result row shows
  await expect(rowCount).toBe(1);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  //expected search out put
  expect(row0_text[0]).toBe("reptile");
  expect(row0_text.length).toBe(1);
});
/**
 * Check loading, viewing, and searching all together
 */
test("load view search sequence", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();

  //load
  await page.getByLabel("Command input").fill("load_file exampleCSV1");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  //view
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  const tableView = await page.locator("#view-table tbody");
  const rowCountView = await tableView.locator("tr").count();

  //check full table
  await expect(rowCountView).toBe(3);

  const allRowsView = await page.locator("#view-table tbody tr").all();

  const row0_view = allRowsView[0];
  const row0_cols_view = await row0_view.locator("td").all();
  const row0_text_view = await Promise.all(
    row0_cols_view.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text_view[0]).toBe("sophia");
  expect(row0_text_view[1]).toBe("sagittarius");
  expect(row0_text_view[2]).toBe("blue");

  const row1_view = allRowsView[1];
  const row1_cols_view = await row1_view.locator("td").all();
  const row1_text_view = await Promise.all(
    row1_cols_view.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text_view[0]).toBe("melanie");
  expect(row1_text_view[1]).toBe("aries");
  expect(row1_text_view[2]).toBe("purple");

  //search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 sophia");
  await page.getByLabel("Submit").click();

  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //check only search result row shows
  await expect(rowCount).toBe(1);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row0 = allRows[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  //expected search out put
  expect(row0_text[0]).toBe("sophia");
  expect(row0_text[1]).toBe("sagittarius");
  expect(row0_text[2]).toBe("blue");
});
/**
 * Check loading and viewing multiple different datasets in the same sequence
 */
test("load view multiple datasets in same sequence", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();

  //load
  await page.getByLabel("Command input").fill("load_file exampleCSV1");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  //view
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  const tableView = await page.locator("#view-table tbody");
  const rowCountView = await tableView.locator("tr").count();

  //check full table
  await expect(rowCountView).toBe(3);

  const allRowsView = await page.locator("#view-table tbody tr").all();

  const row0_view = allRowsView[0];
  const row0_cols_view = await row0_view.locator("td").all();
  const row0_text_view = await Promise.all(
    row0_cols_view.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text_view[0]).toBe("sophia");
  expect(row0_text_view[1]).toBe("sagittarius");
  expect(row0_text_view[2]).toBe("blue");

  const row1_view = allRowsView[1];
  const row1_cols_view = await row1_view.locator("td").all();
  const row1_text_view = await Promise.all(
    row1_cols_view.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text_view[0]).toBe("melanie");
  expect(row1_text_view[1]).toBe("aries");
  expect(row1_text_view[2]).toBe("purple");

  //load 2nd
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  //second successful load
  await expect(page.getByText("loaded successfully").nth(1)).toBeVisible();
  await page.getByLabel("Command input").click();
  //view 2nd
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  //check first is still there
  expect(page.locator("#view-table tbody").nth(0)).toBeVisible();

  //check second table appears
  expect(page.locator("#view-table tbody").nth(1)).toBeVisible();

  const tableView2 = await page.locator("#view-table tbody").nth(1);
  const rowCountView2 = await tableView2.locator("tr").count();

  //check full table
  await expect(rowCountView2).toBe(9);

  const allRowsView2 = await tableView2.locator("tr").all();

  const row0_view2 = allRowsView2[0];
  const row0_cols_view2 = await row0_view2.locator("td").all();
  const row0_text_view2 = await Promise.all(
    row0_cols_view2.map(async (column) => {
      return await column.textContent();
    })
  );

  //first row of second table
  expect(row0_text_view2[0]).toBe("flower");
  expect(row0_text_view2[1]).toBe("color");
});
/**
 * Check loading and searching multiple different datasets in the same sequence
 */
test("load search multiple datasets in same sequence", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").click();
  //string col identifier
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //4 results
  await expect(rowCount).toBe(4);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row1 = allRows[1];
  const row1_cols = await row1.locator("td").all();
  const row1_text = await Promise.all(
    row1_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text[0]).toBe("lily");
  expect(row1_text[1]).toBe("green");

  //second file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file exampleCSV1");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 sophia");
  await page.getByLabel("Submit").click();

  //check firat table still on page
  expect(page.locator("#search-table tbody").nth(0)).toBeVisible();

  //check second table appears
  expect(page.locator("#search-table tbody").nth(1)).toBeVisible();

  const tableSearch2 = await page.locator("#search-table tbody").nth(1);
  const rowCount2 = await tableSearch2.locator("tr").count();

  await expect(rowCount2).toBe(1);

  const allRows2 = await tableSearch2.locator("tr").all();

  const row0 = allRows2[0];
  const row0_cols = await row0.locator("td").all();
  const row0_text = await Promise.all(
    row0_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text[0]).toBe("sophia");
  expect(row0_text[1]).toBe("sagittarius");
  expect(row0_text[2]).toBe("blue");
});
/**
 * Check view command in both modes
 */
test("view both modes", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();

  //load
  await page.getByLabel("Command input").fill("load_file exampleCSV1");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("loaded successfully")).toBeVisible();
  await page.getByLabel("Command input").click();
  //view
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  const tableView = await page.locator("#view-table tbody");
  const rowCountView = await tableView.locator("tr").count();

  //check full table
  await expect(rowCountView).toBe(3);

  const allRowsView = await page.locator("#view-table tbody tr").all();

  const row0_view = allRowsView[0];
  const row0_cols_view = await row0_view.locator("td").all();
  const row0_text_view = await Promise.all(
    row0_cols_view.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text_view[0]).toBe("sophia");
  expect(row0_text_view[1]).toBe("sagittarius");
  expect(row0_text_view[2]).toBe("blue");

  //started in brief mode
  await expect(page.getByText("You are in: Brief Mode")).toBeVisible();
  await expect(page.getByText("Command: view")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  //command to switch mode
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  //check in verbose mode
  await expect(page.getByText("You are in: Verbose Mode")).toBeVisible();
  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: mode switched")).toBeVisible();

  //view
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("Command: view").nth(1)).toBeVisible();
  await expect(page.getByText("Output:").nth(1)).toBeVisible();

  const tableView2 = await page.locator("#view-table tbody").nth(1);
  const rowCountView2 = await tableView2.locator("tr").count();

  //check full table. should still be same output
  await expect(rowCountView2).toBe(3);

  const allRowsView2 = await page.locator("#view-table tbody tr").all();

  const row0_view2 = allRowsView2[0];
  const row0_cols_view2 = await row0_view2.locator("td").all();
  const row0_text_view2 = await Promise.all(
    row0_cols_view2.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row0_text_view2[0]).toBe("sophia");
  expect(row0_text_view2[1]).toBe("sagittarius");
  expect(row0_text_view2[2]).toBe("blue");
});
/**
 * Check search command in both modes
 */
test("search both modes", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file flowers");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").click();
  //string col identifier
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();

  //locator use cited in readme
  const tableSearch = await page.locator("#search-table tbody");
  const rowCount = await tableSearch.locator("tr").count();

  //4 results
  await expect(rowCount).toBe(4);

  const allRows = await page.locator("#search-table tbody tr").all();

  const row1 = allRows[1];
  const row1_cols = await row1.locator("td").all();
  const row1_text = await Promise.all(
    row1_cols.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text[0]).toBe("lily");
  expect(row1_text[1]).toBe("green");

  //started in brief mode
  await expect(page.getByText("You are in: Brief Mode")).toBeVisible();
  await expect(page.getByText("Command: search flower lily")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  //command to switch mode
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  //check in verbose mode
  await expect(page.getByText("You are in: Verbose Mode")).toBeVisible();
  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: mode switched")).toBeVisible();

  //search again
  await page.getByLabel("Command input").fill("search flower lily");
  await page.getByLabel("Submit").click();

  await expect(
    page.getByText("Command: search flower lily").nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:").nth(1)).toBeVisible();

  //locator use cited in readme
  const tableSearch2 = await page.locator("#search-table tbody").nth(1);
  const rowCount2 = await tableSearch2.locator("tr").count();

  //4 results
  await expect(rowCount2).toBe(4);

  const allRows2 = await page.locator("#search-table tbody tr").all();

  const row1_2 = allRows2[1];
  const row1_cols_2 = await row1_2.locator("td").all();
  const row1_text_2 = await Promise.all(
    row1_cols_2.map(async (column) => {
      return await column.textContent();
    })
  );

  expect(row1_text_2[0]).toBe("lily");
  expect(row1_text_2[1]).toBe("green");
});
