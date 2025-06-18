import { test, expect } from '@playwright/test';

test('Homepage title contains MovieSearch', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await expect(page).toHaveTitle(/MovieSearch/i);
});

test('Homepage should show input and button element', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await expect(
    page.locator('div').filter({ hasText: 'Search for a movie!' }).nth(2)
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
});

test.describe('Movie Search and Autocomplete ', () => {
  test('should show suggestions and select a movie', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const input = page.getByPlaceholder('Ex. Star Wars');
    await input.fill('Star Wars');

    const suggestionsContainer = page.locator('.suggestions-container');
    await expect(suggestionsContainer).toBeVisible({ timeout: 4000 });

    const suggestionItems = suggestionsContainer.locator('.suggestion-item');
    await expect(suggestionItems.first()).toBeVisible();

    await suggestionItems.first().click();

    const movieCard = page.locator('app-movie-card');
    await expect(movieCard).toBeVisible();

    await expect(movieCard).toContainText('Star Wars');
  });

  test('should not show suggestions when entering only white space', async ({
    page,
  }) => {
    await page.goto('http://localhost:4200');

    const input = page.getByPlaceholder('Ex. Star Wars');
    await input.fill('  ');

    await page.waitForTimeout(700);

    const suggestionsContainer = page.locator('.suggestions-container');
    await expect(suggestionsContainer).toBeHidden();

    const suggestionItems = page.locator('.suggestion-item');
    await expect(suggestionItems).toHaveCount(0);
  });

  test('should close suggestions when clicking the search button', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const input = page.getByPlaceholder('Ex. Star Wars');
    const searchButton = page.getByRole('button', { name: /search/i });
    const suggestionsContainer = page.locator('.suggestions-container');

    await input.fill('Star Wars');

    await expect(suggestionsContainer).toBeVisible();

    await searchButton.click();

    await expect(suggestionsContainer).toBeHidden();
  });

   test('should close suggestions when clicking a suggestion item', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const input = page.getByPlaceholder('Ex. Star Wars');
    const suggestionsContainer = page.locator('.suggestions-container');

    await input.fill('Star Wars');

    await expect(suggestionsContainer).toBeVisible();

    const suggestionItem = suggestionsContainer.locator('.suggestion-item').first();
    await suggestionItem.click();

    await expect(suggestionsContainer).toBeHidden();
  });
});
