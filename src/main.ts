import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


library.add(faPlay, faPause )
dom.watch();


// const stroopwafel = icon({ prefix: 'fasyarn add ', iconName: 'stroopwafel' })



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
