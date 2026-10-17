import { bootstrapApplication } from '@angular/platform-browser';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

injectAnalytics({ framework: 'angular' });
injectSpeedInsights();

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
  console.error('[bootstrap] failed', error);
});
