import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/components/app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
