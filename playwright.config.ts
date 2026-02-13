import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { off } from 'process';


const config = ({
  testDir: './tests',
  timeout: 200 * 1000,
  //fullyParallel: true,
  workers: 1, 
  retries: 0,
  reporter:[['html',{open:'always',outputFolder:'html-report'}]], //it will create a folder having name'html-report' and will store the reports there
  
  expect: {
    timeout: 5000
  },
  

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   fullyParallel: true,
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   fullyParallel: true,
    // }

  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'on',

  },

});
module.exports = config