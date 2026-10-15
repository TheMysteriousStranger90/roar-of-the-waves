import { bootstrapApplication } from '@angular/platform-browser';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

injectSpeedInsights();

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
  console.error('[bootstrap] failed', error);
});
