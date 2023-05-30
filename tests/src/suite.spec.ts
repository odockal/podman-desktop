import { describe } from 'vitest';
import { dashboardTest, telemetryTest } from './dashboard';

describe.skip('E2E testing suites', async () => {

    describe('Grouping 2', async () => {
        dashboardTest();
        await telemetryTest();
    });
});