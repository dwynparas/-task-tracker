const { Builder, By } = require('selenium-webdriver');

test('Task Tracker homepage is displayed', async () => {
    const driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(
            process.env.SELENIUM_URL ||
            'http://selenium:4444/wd/hub'
        )
        .build();

    try {
        await driver.get(
            process.env.APP_URL ||
            'http://jenkins:4000'
        );

        const heading = await driver.findElement(By.css('h1'));
        const text = await heading.getText();

        expect(text).toBe('Task Tracker');
    } finally {
        await driver.quit();
    }
}, 30000);